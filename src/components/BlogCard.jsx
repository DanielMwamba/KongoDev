import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MessageCircle, Heart, Bookmark, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import formatDate from "@/helpers/formatDate.helper";

const BlogCard = ({
  slug,
  imageURL,
  category,
  title,
  summary,
  user,
  username,
  date,
  commentCount,
  profileImage,
  readTime,
  reactions,
}) => {
  return (
    <Card className="group flex flex-col h-full overflow-hidden border-2 border-border hover:border-primary transition-all duration-300">
      <CardHeader className="p-0">
        {imageURL && (
          <Link
            to={`/blog/${slug}`}
            className="block overflow-hidden aspect-video"
          >
            <img
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              src={imageURL}
              alt={title}
              loading="lazy"
            />
          </Link>
        )}
      </CardHeader>
      <CardContent className="flex flex-col flex-grow p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {readTime}
          </span>
        </div>

        <Link
          to={`/blog/${slug}`}
          className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200 line-clamp-2 mb-2"
        >
          {title}
        </Link>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {summary}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to={`/author/${username}/`}
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              <Avatar className="w-10 h-10 border-2 border-primary">
                <AvatarImage src={profileImage} alt={user} />
                <AvatarFallback>{user.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link
                to={`/author/${username}/`}
                className="text-sm font-medium hover:text-primary transition-colors duration-200"
              >
                {user}
              </Link>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{formatDate(date)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 bg-muted/50">
        <div className="flex items-center gap-3 text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary transition-colors p-1"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-xs">{reactions}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Réactions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary transition-colors p-1"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{commentCount}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Commentaires</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-primary transition-colors p-1"
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sauvegarder</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}; 

export default BlogCard;
