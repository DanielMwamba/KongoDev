import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowLeft, Eye, EyeOff, User, Mail, UserCircle } from "lucide-react";

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

import { RegisterSchema } from "../../validations/auth/register.validation";
import { authActions } from "../../redux/slices/authSlice";
import { userActions } from "../../redux/slices/userSlice";
import * as AuthApi from "../../services/api/auth/api.auth";
import * as api from "../../services/api/api";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterSchema()),
  });

  const onSubmit = async (data) => {
    try {
      const response = await AuthApi.registerUser(data);
      const { token, refreshToken } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch(authActions.login());

      const userData = await api.getUser();
      dispatch(userActions.setUser(userData));

      toast.success("Compte créé avec succès!");
      navigate("/authorpanel/dashboard");
    } catch (error) {
      toast.error(
        error.message || "Une erreur est survenue lors de l'inscription"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background bg-cover bg-center bg-no-repeat px-4">
      <Card className="w-full max-w-md shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Créer un compte
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entrez vos coordonnées pour vous inscrire à ArticleSphère.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nom
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="name"
                  {...register("name")}
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="Votre nom complet"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Nom d'utilisateur
              </Label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="username"
                  {...register("username")}
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="Votre nom d'utilisateur unique"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-destructive mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
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
                  Création en cours...
                </span>
              ) : (
                "Créer un compte"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Vous avez déjà un compte?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline transition-colors duration-300"
            >
              Se Connecter
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
