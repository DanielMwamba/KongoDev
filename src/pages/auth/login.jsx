import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { LoginSchema } from "../../validations/auth/login.validation";
import { authActions } from "../../redux/slices/authSlice";
import { userActions } from "../../redux/slices/userSlice";
import * as AuthApi from "../../services/api/auth/api.auth";
import * as api from "../../services/api/api";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // Formulaire avec validation via yup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema()),
  });

  // Fonction pour gérer la soumission du formulaire
  const onSubmit = async (data) => {
    try {
      // Appel à l'API pour authentifier l'utilisateur
      const { token, refreshToken } = await AuthApi.loginUser(data);

      // Stockage des tokens dans le localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      // Mise à jour des états utilisateur et connexion
      dispatch(authActions.login());
      const userData = await api.getUser();
      dispatch(userActions.setUser(userData));

      toast.success("Connexion réussie !");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.message || "Une erreur est survenue lors de la connexion."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-background px-4">
      <Card className="w-full max-w-md shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Bienvenue</CardTitle>
          <CardDescription className="text-muted-foreground">
            Entrez vos coordonnées pour vous connecter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Adresse e-mail */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Adresse e-mail
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="votre@email.com"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Bouton de soumission */}
            <Button
              type="submit"
              className="w-full transition-all duration-300 hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          {/* <Link
            to="/forgot-password"
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Mot de passe oublié ?
          </Link> */}
          <p className="text-sm text-muted-foreground">
            Vous n'avez pas de compte ?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline transition-colors duration-300"
            >
              Créer un compte
            </Link>
          </p>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Retour à la page d'Accueil
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
