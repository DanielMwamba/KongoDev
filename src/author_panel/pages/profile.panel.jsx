import React, { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "react-hot-toast"
import { Camera } from 'lucide-react'
import PanelWrapper from "../partials/panelWrapper.panel"

import convertImageToBase64 from "../../helpers/convertImage.helper"
import compressImage from "../../helpers/compressedImage.helper"
import cloudinaryUrlToBase64 from "../../helpers/cloudinaryUrlToBase64.helper"

import { Button } from "@/components/ui/button"
import Loader from "../../components/loader"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import * as api from "../../services/api/api"

const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est obligatoire")
    .max(50, "Le nom ne doit pas dépasser 50 caractères")
    .regex(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      "Le nom ne doit contenir que des lettres, espaces, apostrophes et tirets"
    ),
  userName: z
    .string()
    .min(1, "Le nom d'utilisateur est obligatoire")
    .max(30, "Le nom d'utilisateur ne doit pas dépasser 30 caractères")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Le nom d'utilisateur ne doit contenir que des lettres, chiffres, tirets bas et tirets"
    ),
  email: z.string().email("Adresse e-mail invalide"),
  bio: z
    .string()
    .max(500, "La biographie ne doit pas dépasser 500 caractères")
    .optional(),
  location: z
    .string()
    .max(100, "La localisation ne doit pas dépasser 100 caractères")
    .optional(),
  website: z.string().url("URL invalide").or(z.literal("")).optional(),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
    newPassword: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
    confirmNewPassword: z
      .string()
      .min(1, "Veuillez confirmer le nouveau mot de passe"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmNewPassword"],
  })

export default function ProfileManagement() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const fileInputRef = useRef(null)

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      bio: "",
      location: "",
      website: "",
    },
  })

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await api.getUser()
        setUser(userData)
        profileForm.reset({
          name: userData.name,
          userName: userData.userName,
          email: userData.email,
          bio: userData.bio || "",
          location: userData.location || "",
          website: userData.website || "",
        })
        if (userData.profileImageURL) {
          const base64Image = await cloudinaryUrlToBase64(
            userData.profileImageURL
          )
          setProfileImage(base64Image)
        }
      } catch (error) {
        toast.error("Échec du chargement des données utilisateur")
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])

  const onProfileSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const trimmedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          typeof value === "string" ? value.trim() : value,
        ])
      )
      const updatedData = { ...trimmedData, profileImage }
      await api.updateUser(updatedData)
      toast.success("Profil mis à jour avec succès")
    } catch (error) {
      toast.error("Échec de la mise à jour du profil")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onPasswordSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await api.resetPassword(data.newPassword, data.currentPassword)
      toast.success("Mot de passe mis à jour avec succès")
      passwordForm.reset()
    } catch (error) {
      toast.error("Échec de la mise à jour du mot de passe")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    event.target.value = null

    if (file) {
      try {
        const base64Image = await convertImageToBase64(file)
        const compressedImage = await compressImage(base64Image, 500, 500, 100)
        setProfileImage(compressedImage)

        // Update the user's profile image immediately
        await api.updateProfilePicture({ profileImage: compressedImage })

        toast.success("Image de profil mise à jour avec succès")
      } catch (error) {
        toast.error("Échec du traitement de l'image")
        console.error(error)
      }
    }
  }

  if (loading) {
    return (
      <PanelWrapper>
        <Loader />
      </PanelWrapper>
    )
  }

  return (
    <PanelWrapper>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Gérer mon profil</CardTitle>
            <CardDescription className="text-lg">
              Mettez à jour les informations et les paramètres de votre profil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="info" className="text-lg">Informations personnelles</TabsTrigger>
                <TabsTrigger value="security" className="text-lg">Sécurité</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-8"
                  >
                    <div className="flex flex-col items-center space-y-4 mb-8">
                      <div className="relative">
                        <Avatar className="w-40 h-40">
                          <AvatarImage
                            src={profileImage || user.profileImageURL}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Label
                          htmlFor="picture"
                          className="absolute bottom-0 right-0 cursor-pointer bg-primary text-primary-foreground rounded-full p-3 shadow-md hover:bg-primary/90 transition-colors"
                        >
                          <Camera size={24} />
                          <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            ref={fileInputRef}
                          />
                        </Label>
                      </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom*</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" className={`${profileForm.formState.errors.name ? 'border-red-500 focus:ring-red-500' : ''}`} {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500 bg-red-50 p-2 rounded-md mt-1" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="userName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom d'utilisateur*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Votre nom d'utilisateur"
                                className={`${profileForm.formState.errors.userName ? 'border-red-500 focus:ring-red-500' : ''}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 bg-red-50 p-2 rounded-md mt-1" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre email" className={`${profileForm.formState.errors.email ? 'border-red-500 focus:ring-red-500' : ''}`} {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500 bg-red-50 p-2 rounded-md mt-1" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Localisation</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Votre localisation"
                                className={`${profileForm.formState.errors.location ? 'border-red-500 focus:ring-red-500' : ''}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 bg-red-50 p-2 rounded-md mt-1" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site web</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre site web" className={`${profileForm.formState.errors.website ? 'border-red-500 focus:ring-red-500' : ''}`} {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500 bg-red-50 p-2 rounded-md mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biographie</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Parlez-nous un peu de vous"
                              className={`resize-none ${ profileForm.formState.errors.bio ? 'border-red-500 focus:ring-red-500' : ''}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 bg-red-50 p-2 rounded-md mt-1" />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                      {isSubmitting ? "Mise à jour..." : "Mettre à jour le profil"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="security">
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de passe actuel</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Entrez votre mot de passe actuel"
                              className={`${passwordForm.formState.errors.currentPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 bg-red-50 p-2 rounded-md mt-1" />
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nouveau mot de passe</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Entrez votre nouveau mot de passe"
                              className={`${passwordForm.formState.errors.newPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 bg-red-50 p-2 rounded-md mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirmez votre nouveau mot de passe"
                              className={`${passwordForm.formState.errors.confirmNewPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 bg-red-50 p-2 rounded-md mt-1" />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                      {isSubmitting ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PanelWrapper>
  )
}