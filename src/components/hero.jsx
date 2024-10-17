import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Book, Share2 } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-moving-gradient"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-16">
        <div className="text-center lg:text-left lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight animate-fade-in-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Apprenez, Codez,
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/70 to-primary">
              Partagez
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto lg:mx-0 text-xl sm:text-2xl md:mt-5 text-muted-foreground animate-fade-in-up animation-delay-300">
            Rejoignez une communauté passionnée de développeurs. Découvrez, apprenez et partagez vos connaissances.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="btn-primary text-lg px-8 py-3 rounded-full flex items-center justify-center animate-bounce-subtle"
            >
              Commencer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/explore"
              className="btn-secondary text-lg px-8 py-3 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              Explorer
            </Link>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="w-full h-[400px] sm:h-[500px] relative overflow-hidden rounded-lg shadow-2xl animate-float">
            <img 
              src="./cover.png" 
              alt="Développeurs collaborant" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground p-3 rounded-full animate-ping-slow">
            <Code className="h-6 w-6" />
          </div>
          <div className="absolute bottom-4 right-4 bg-secondary text-secondary-foreground p-3 rounded-full animate-ping-slow animation-delay-2000">
            <Book className="h-6 w-6" />
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-accent text-accent-foreground p-3 rounded-full animate-ping-slow animation-delay-4000">
            <Share2 className="h-6 w-6" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;