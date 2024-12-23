import React from "react";
import { MapPin, Globe, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthorSidebar({ author }) {
  if (!author) return null;

  return (
    <div className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-6">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src={author.profileImageURL} alt={author.name} />
            <AvatarFallback>{author.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-lg">{author.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            @{author.userName}
          </p>
          <Button className="w-full rounded-full mb-4">Suivre</Button>
        </div>

        {author.bio && (
          <p className="text-sm text-muted-foreground mb-4">{author.bio}</p>
        )}

        <div className="space-y-2 text-sm">
          {author.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{author.location}</span>
            </div>
          )}
          {author.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline truncate"
              >
                {author.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {author.github && (
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <a
                href={`https://github.com/${author.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @{author.github}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
