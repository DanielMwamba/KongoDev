import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MessageCircle, Heart, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import formatDate from "../helpers/formatDate.helper";

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
  readTime = "5 min read", // Added default read time
  reactions = 0, // Added default reactions count
}) => {
  return (
    <Card className="group flex flex-col h-full overflow-hidden border-b-2 border-transparent hover:border-primary hover:shadow-lg transition-all duration-300">
      {imageURL && (
        <Link
          to={`/blog/${slug}`}
          className="block overflow-hidden aspect-[1.91/1]"
        >
          <img
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            src={imageURL}
            alt={title}
            loading="lazy"
          />
        </Link>
      )}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{readTime}</span>
        </div>

        <Link
          to={`/blog/${slug}`}
          className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200 line-clamp-2 mb-2"
        >
          {title}
        </Link>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {summary}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src={profileImage} alt={user} />
              <AvatarFallback>{user.charAt(0)}</AvatarFallback>
            </Avatar>
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

          <div className="flex items-center gap-3 text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{reactions}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{commentCount}</span>
            </button>
            <button className="hover:text-primary transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
