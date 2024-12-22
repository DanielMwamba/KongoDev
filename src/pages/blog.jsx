'use client'

import React, { useEffect, useState, useCallback } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MessageCircle, ThumbsUp, Calendar, Share2, Bookmark, Twitter, Facebook, LinkedinIcon as LinkedIn, Copy, MapPin, LinkIcon, Github, Globe } from 'lucide-react'
import { toast } from "react-hot-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Loader from "@/components/loader"
import formatDate from "@/helpers/formatDate.helper"
import * as api from "@/services/api/api"
import { useSelector } from "react-redux"

export default function Blog() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.user)

  const [loading, setLoading] = useState(true)
  const [blogData, setBlogData] = useState(null)
  const [comments, setComments] = useState([])
  const [like, setlike] = useState([])
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const response = await api.getPost(slug)
      setBlogData(response.posts)
      setComments(response.posts.comments || [])
      setlike(response.posts.likes)
      setIsLiked(response.posts.likes)
      setLoading(false)
    } catch (error) {
      toast.error("Failed to load blog post. Please try again later.")
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error("Connectez vous pour ajouter un commentaire.")
      return
    }
    if (!newComment.trim()) return
    try {
      const response = await api.addComment(slug, {
        content: newComment,
        date: new Date().toISOString(),
      })
      setComments([...comments, response.comment])
      setNewComment("")
      toast.success("Commentaire ajouté avec succès!")
    } catch (error) {
      toast.error("Erreur lors de l'ajout du commentaire. Veuillez réessayer.")
    }
  }

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Connectez-vous pour aimer cet article.")
      return
    }
    try {
      await api.likePost(blogData.id)
      setIsLiked(!isLiked)
      setBlogData(prev => ({
        ...prev,
        likes: isLiked 
          ? (prev.likes || []).filter(id => id !== user.id) 
          : [...(prev.likes || []), user.id]
      }))
      toast.success(isLiked ? "Like retiré" : "Article aimé!")
    } catch (error) {
      toast.error("Erreur lors de l'action. Veuillez réessayer.")
    }
  }

  const handleShare = async (platform) => {
    const url = window.location.href
    const text = `Check out this article: ${blogData.title}`
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
        break
      case 'copy':
        await navigator.clipboard.writeText(url)
        toast.success("Lien copié!")
        break
    }
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Sharing Options */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                className={`rounded-full ${isLiked ? 'text-primary' : ''}`}
              >
                <ThumbsUp className="h-5 w-5" />
                <span className="text-sm mt-1">{blogData?.likes?.length || ""}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare('twitter')}
                className="rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare('facebook')}
                className="rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare('linkedin')}
                className="rounded-full"
              >
                <LinkedIn className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleShare('copy')}
                className="rounded-full"
              >
                <Copy className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <main className=" mt-16 lg:col-span-8">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour
            </Button>

            <article className="bg-white rounded-lg shadow-sm p-8">
              <Badge variant="secondary" className="mb-4">
                {blogData?.category}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {blogData?.title}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <Link
                  to={`/blog/author/${blogData?.author.userName}/`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={blogData?.author.profileImageURL}
                      alt={blogData?.author.name}
                    />
                    <AvatarFallback>{blogData?.author.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{blogData?.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Publié le {formatDate(blogData?.date)}
                    </p>
                  </div>
                </Link>
              </div>

              {blogData?.imageURL && (
                <img
                  src={blogData.imageURL}
                  alt={blogData.title}
                  className="w-full rounded-lg mb-8"
                />
              )}

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blogData?.description }}
              />

              <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t">
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  onClick={handleLike}
                  className="rounded-full"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {blogData?.likes?.length || 0} réactions
                </Button>
                <Button variant="outline" className="rounded-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {comments.length} commentaires
                </Button>
              </div>
            </article>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">
                Discussion ({comments.length})
              </h2>
              
              <Card className="bg-white mb-8">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Ajouter un commentaire</h3>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={
                        isAuthenticated
                          ? "Écrivez votre commentaire ici..."
                          : "Connectez-vous pour ajouter un commentaire"
                      }
                      className="min-h-[100px] w-full"
                      disabled={!isAuthenticated}
                    />
                    <Button
                      type="submit"
                      disabled={!isAuthenticated}
                      className="rounded-full"
                    >
                      {isAuthenticated ? "Poster le commentaire" : "Se connecter pour commenter"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="bg-white">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={comment.author.profileImageURL}
                            alt={comment.author.name}
                          />
                          <AvatarFallback>
                            {comment.author.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{comment.author.userName}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(comment.date)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground">{comment.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-start gap-4">
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        J'aime
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Répondre
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </main>

          {/* Right Sidebar - Author Info */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage
                    src={blogData?.author.profileImageURL}
                    alt={blogData?.author.name}
                  />
                  <AvatarFallback>{blogData?.author.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{blogData?.author.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">@{blogData?.author.userName}</p>
                <Button className="w-full rounded-full mb-4">Suivre</Button>
              </div>
              
              {blogData?.author.bio && (
                <p className="text-sm text-muted-foreground mb-4">{blogData.author.bio}</p>
              )}
              
              <div className="space-y-2 text-sm">
                {blogData?.author.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{blogData.author.location}</span>
                  </div>
                )}
                {blogData?.author.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <a href={blogData.author.website} target="_blank" rel="noopener noreferrer" 
                      className="text-primary hover:underline truncate">
                      {blogData.author.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                {blogData?.author.github && (
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <a href={`https://github.com/${blogData.author.github}`} 
                      target="_blank" rel="noopener noreferrer"
                      className="text-primary hover:underline">
                      @{blogData.author.github}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-around items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={`${isLiked ? 'text-primary' : ''}`}
          >
            <ThumbsUp className="h-5 w-5" />
            <span className="text-xs">{blogData?.likes?.length || 0}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('facebook')}
          >
            <Facebook className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('copy')}
          >
            <Copy className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}