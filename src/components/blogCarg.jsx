import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

// helper
import formatDate from "../helpers/formatDate.helper";

const BlogCard = ({ slug, imageURL, category, title, summary, user, username, date }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-card">
      <Link to={`/blog/${slug}`} className="block overflow-hidden">
        <img
          className="w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-105"
          src={imageURL}
          alt={title}
        />
      </Link>
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {category}
          </span>
        </div>
        <Link 
          to={`/blog/${slug}`}
          className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors duration-200"
        >
          {title}
        </Link>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">
          {summary}
        </p>
        <div className="flex items-center text-sm text-muted-foreground mt-auto">
          <User className="w-4 h-4 mr-1" />
          <Link
            to={`/blog/author/${username}/`}
            className="hover:text-primary transition-colors duration-200 mr-3"
          >
            {user}
          </Link>
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;