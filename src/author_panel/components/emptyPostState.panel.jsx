import React from "react";
import { Link } from "react-router-dom";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyPostState() {
  return (
    <main className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center p-6">
        <div className="rounded-full bg-primary/10 p-3">
          <PenLine className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Aucun article</h3>
        <p className="text-sm text-muted-foreground">
          Commencez par écrire sur ce qui vous passionne.
        </p>
        <Link to="/authorpanel/blogs/new">
          <Button className="mt-4">
            <PenLine className="mr-2 h-4 w-4" />
            Écrire un nouvel article
          </Button>
        </Link>
      </div>
    </main>
  );
}
