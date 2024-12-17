import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  Calendar,
  User,
  Share2,
  Bookmark,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Loader from "../components/loader";
import formatDate from "../helpers/formatDate.helper";
import * as api from "../services/api/api";
import { useSelector } from "react-redux";

export default function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getPost(slug);
        setBlogData(response.posts);
        setComments(response.posts.comments || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast.error("Failed to load blog post. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Connectez vous pour ajouter un commentaire.");
      return;
    }
    if (!newComment.trim()) return;
    try {
      const response = await api.addComment(slug, {
        content: newComment,
        date: new Date().toISOString(),
      });
      setComments([...comments, response.comment]);
      setNewComment("");
      toast.success("Commentaire ajouté avec succès!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Erreur lors de l'ajout du commentaire. Veuillez réessayer.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
      </Button>
      <article className="space-y-8">
        <div className="relative w-full h-48 sm:h-64 md:h-96 overflow-hidden rounded-lg shadow-md">
          <img
            src={blogData?.imageURL}
            alt={blogData?.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <Badge
              variant="secondary"
              className="text-sm sm:text-base px-2 py-1 mb-2"
            >
              {blogData?.category}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {blogData?.title}
            </h1>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link
              to={`/blog/author/${blogData?.author.userName}/`}
              className="flex items-center hover:text-foreground"
            >
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src={blogData?.author.profileImageURL}
                  alt={blogData?.author.name}
                />
                <AvatarFallback>
                  {blogData?.author.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{blogData?.author.name}</span>
            </Link>
            <span className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {formatDate(blogData?.date)}
            </span>
          </div>
        </div>
        <Separator className="my-8" />
        <div
          className="blog-content prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blogData?.description }}
        ></div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </article>

      <div className="mt-12 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Commentaires ({comments.length})
        </h2>
        <Card className="bg-secondary/10">
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
                    ? "Write your comment here..."
                    : "Please log in to add a comment"
                }
                className="min-h-[100px] w-full"
                disabled={!isAuthenticated}
              />
              <Button
                type="submit"
                disabled={!isAuthenticated}
                className="w-full sm:w-auto"
              >
                {isAuthenticated ? "Post Comment" : "Log in to Comment"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-6">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className="bg-card hover:bg-secondary/5 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
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
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Reply
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
