import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';


const CategoryCard = ({ name, image, link, description }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{name}</h3>
      </div>
      <CardContent className="p-4">
        <p className="text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full group">
          <Link to={link}>
            Explorer
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;