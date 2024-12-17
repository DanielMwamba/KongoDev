import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-hot-toast"
import { ArrowLeft } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { RegisterSchema } from "../../validations/auth/register.validation"
import { authActions } from "../../redux/slices/authSlice"
import { userActions } from "../../redux/slices/userSlice"
import * as AuthApi from "../../services/api/auth/api.auth"
import * as api from "../../services/api/api"

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterSchema()),
  })

  const onSubmit = async (data) => {
    try {
      console.log("Submitting registration data:", data);
      const response = await AuthApi.registerUser(data)
      console.log("Registration response:", response);

      const { token, refreshToken } = response
      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)

      dispatch(authActions.login())

      console.log("Fetching user data...");
      const userData = await api.getUser()
      console.log("User data:", userData);
      dispatch(userActions.setUser(userData))

      toast.success("Compte créé avec succès!")
      navigate("/authorpanel/dashboard")
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Une erreur est survenue lors de l'inscription")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/cover.png)' }}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>Entrez vos coordonnées pour vous inscrire.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input id="username" {...register("username")} />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Création en cours..." : "Créer un compte"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Vous avez déjà un compte?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Se Connecter
            </Link>
          </p>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la page d'Accueil
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}