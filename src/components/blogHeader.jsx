import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import formatDate from "../helpers/formatDate.helper";

const BlogHeader = ({ postData, navigate }) => {
  return (
    <>
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
      </Button>

      <article className="bg-white rounded-lg shadow-sm p-8">
        <Badge variant="secondary" className="mb-4">
          {postData?.category}
        </Badge>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {postData?.title}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <Link
            to={`/author/${postData?.author.userName}/`}
            className="flex items-center gap-2 hover:underline"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={postData?.author.profileImageURL}
                alt={postData?.author.name}
              />
              <AvatarFallback>
                {postData?.author.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{postData?.author.name}</p>
              <p className="text-sm text-muted-foreground">
                Publié le {formatDate(postData?.date)}
              </p>
            </div>
          </Link>
        </div>

        {postData?.imageURL && (
          <img
            src={postData.imageURL}
            alt={postData.title}
            className="w-full rounded-lg mb-8"
          />
        )}
      </article>
    </>
  );
}

export default BlogHeader;
