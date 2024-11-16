import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import formatDate from "../helpers/formatDate.helper";

const BlogCard = ({ slug, imageURL, category, title, summary, user, username, date, commentCount, profileImage }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link to={`/blog/${slug}`} className="block overflow-hidden">
          <img
            className="w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-105"
            src={imageURL}
            alt={title}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <Badge variant="secondary" className="mb-2">
          {category}
        </Badge>
        <Link 
          to={`/blog/${slug}`}
          className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200 line-clamp-2"
        >
          {title}
        </Link>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
          {summary}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-6 pt-0">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={`${profileImage}`} alt={user} />
            <AvatarFallback>{user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <Link
              to={`/blog/author/${username}/`}
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              {user}
            </Link>
            <p className="text-xs text-muted-foreground">{formatDate(date)}</p>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MessageCircle className="w-4 h-4 mr-1" />
          <span className="text-xs">{commentCount}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;