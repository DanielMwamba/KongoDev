import React from "react";
import { ThumbsUp, Twitter, Facebook, Copy, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileBottomBar = ({
  isLiked,
  likesCount,
  handleLike,
  handleShare,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <div className="flex justify-around items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLike}
          className={`${isLiked ? "text-primary" : ""}`}
        >
          <ThumbsUp className="h-5 w-5" />
          <span className="text-xs">{likesCount}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("twitter")}
        >
          <Twitter className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("facebook")}
        >
          <Facebook className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleShare("copy")}>
          <Copy className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
export default MobileBottomBar;
