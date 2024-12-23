import React from "react";
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const  BlogContent = ({ blogData, isLiked, handleLike, commentsCount }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm p-8 mt-8">
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
          {commentsCount} commentaires
        </Button>
      </div>
    </article>
  );
}

export default BlogContent;