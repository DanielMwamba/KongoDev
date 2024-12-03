import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, ThumbsUp, Calendar, User } from 'lucide-react';
import { toast } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Loader from "../components/loader";
import formatDate from "../helpers/formatDate.helper";
import * as api from "../services/api/api";
import { useSelector } from "react-redux";
// import './css/blogStyle.css';  // Import the CSS file

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
        console.table(response.posts.description)
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
      toast.error("Please log in to add a comment.");
      return;
    }
    if (!newComment.trim()) return;
    try {
      const response = await api.addComment(slug, { content: newComment, date: new Date().toISOString() });
      setComments([...comments, response.comment]);
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
      </Button>
      <article className="space-y-8">
        <img
          src={blogData?.imageURL}
          alt={blogData?.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="space-y-6">
          <Badge variant="secondary">{blogData?.category}</Badge>
          <h1 className="text-4xl font-bold text-foreground">{blogData?.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link to={`/blog/author/${blogData?.author.userName}/`} className="flex items-center hover:text-foreground">
              <User className="mr-2 h-4 w-4" />
              {blogData?.author.name}
            </Link>
            <span className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {formatDate(blogData?.date)}
            </span>
          </div>
        </div>
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blogData?.description }}
        ></div>
      </article>

      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold text-foreground">Comments ({comments.length})</h2>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Add a comment</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCommentSubmit}>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={isAuthenticated ? "Write your comment here..." : "Please log in to add a comment"}
                className="mb-4"
                disabled={!isAuthenticated}
              />
              <Button type="submit" disabled={!isAuthenticated}>
                {isAuthenticated ? "Commenter" : "Veuillez vous connecter pour ajouter un commentaire"}
              </Button>
            </form>
          </CardContent>
        </Card>
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={comment.author.profileImageURL} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{comment.author.userName}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(comment.date)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{comment.content}</p>
            </CardContent>
            <CardFooter>
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
  );
}