import React, { useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import formatDate from "@/helpers/formatDate.helper";

const CommentSection = ({
  comments,
  isAuthenticated,
  handleCommentSubmit,
}) => {
  const [newComment, setNewComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommentSubmit(newComment);
    setNewComment("");
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Discussion ({comments.length})
      </h2>

      <Card className="bg-white mb-8">
        <CardHeader>
          <h3 className="text-xl font-semibold">Ajouter un commentaire</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
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
              disabled={!isAuthenticated || !newComment.trim()}
              className="rounded-full"
            >
              {isAuthenticated
                ? "Poster le commentaire"
                : "Se connecter pour commenter"}
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
  );
}

export default CommentSection;

