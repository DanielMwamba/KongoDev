'use client'

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

import { LoginSchema } from "../../validations/auth/login.validation"
import { authActions } from "../../redux/slices/authSlice"
import { userActions } from "../../redux/slices/userSlice"
import * as AuthApi from "../../services/api/auth/api.auth"
import * as api from "../../services/api/api"

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema()),
  })

  const onSubmit = async (data) => {
    try {
      const response = await AuthApi.loginUser(data)
      const { token, refreshToken } = response
      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)

      dispatch(authActions.login())

      const userData = await api.getUser()
      dispatch(userActions.setUser(userData))

      toast.success("Connexion réussie!")
      navigate("/authorpanel/dashboard")
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue lors de la connexion")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/cover.png)' }}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Bienvenue</CardTitle>
          <CardDescription>Entrez vos coordonnées pour vous connecter.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                {...register("email")} 
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                id="password" 
                type="password" 
                {...register("password")} 
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Vous n'avez pas de compte?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Créer un compte
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