import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import formatDate from "../helpers/formatDate.helper";

export default function BlogHeader({ blogData, navigate }) {
  return (
    <>
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
      </Button>

      <article className="bg-white rounded-lg shadow-sm p-8">
        <Badge variant="secondary" className="mb-4">
          {blogData?.category}
        </Badge>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {blogData?.title}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <Link
            to={`/blog/author/${blogData?.author.userName}/`}
            className="flex items-center gap-2 hover:underline"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={blogData?.author.profileImageURL}
                alt={blogData?.author.name}
              />
              <AvatarFallback>
                {blogData?.author.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{blogData?.author.name}</p>
              <p className="text-sm text-muted-foreground">
                Publié le {formatDate(blogData?.date)}
              </p>
            </div>
          </Link>
        </div>

        {blogData?.imageURL && (
          <img
            src={blogData.imageURL}
            alt={blogData.title}
            className="w-full rounded-lg mb-8"
          />
        )}
      </article>
    </>
  );
}
