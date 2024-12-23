import React from "react";
import {
  ThumbsUp,
  Twitter,
  Facebook,
  LinkedinIcon as LinkedIn,
  Copy,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SharingSidebar = ({
  isLiked,
  likesCount,
  handleLike,
  handleShare,
}) => {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="sticky top-24 flex flex-col gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLike}
          className={`rounded-full ${isLiked ? "text-primary" : ""}`}
        >
          <ThumbsUp className="h-5 w-5" />
          <span className="text-sm mt-1">{likesCount}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("twitter")}
          className="rounded-full"
        >
          <Twitter className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("facebook")}
          className="rounded-full"
        >
          <Facebook className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("linkedin")}
          className="rounded-full"
        >
          <LinkedIn className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("copy")}
          className="rounded-full"
        >
          <Copy className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default SharingSidebar
