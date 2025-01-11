import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Code, Users, Lightbulb, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-background/95">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight">
            <span className="text-primary">DEV</span>Sphere
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-muted-foreground">
            Unissez-vous, apprenez et innovez avec une communauté de développeurs passionnés.
          </p>
        </motion.div>

        <motion.div 
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Button
            size="lg"
            className="text-lg px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/register")}
          >
            Rejoindre la communauté <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/explore")}
          >
            Explorer les articles
          </Button>
        </motion.div>

        <motion.div 
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FeatureItem
            icon={Code}
            title="Codez avec passion"
            description="Développez des solutions innovantes pour relever les défis mondiaux"
          />
          <FeatureItem
            icon={Users}
            title="Communauté diverse"
            description="Connectez-vous avec des développeurs talentueux du monde entier"
          />
          <FeatureItem
            icon={Lightbulb}
            title="Innovez sans limites"
            description="Créez des technologies qui façonnent l'avenir du numérique"
          />
          <FeatureItem
            icon={Globe}
            title="Impact global"
            description="Contribuez à des projets qui ont un impact positif à l'échelle mondiale"
          />
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-10 right-10 opacity-20 hidden lg:block">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "loop",
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
        >
          <Globe className="w-24 h-24 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Hero;