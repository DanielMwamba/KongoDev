import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Code, Users, Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground">
      {/* African-inspired pattern background */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>

      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-moving-gradient"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 20,
        }}
      ></motion.div>

      <div className="relative mt-8 z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-12 md:py-24">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary">Code</span> de l'
          <span className="text-secondary">Afrique</span>
        </motion.h1>
        <motion.p 
          className="mt-6 max-w-2xl text-center text-lg sm:text-xl md:text-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Unissons nos talents pour façonner l'avenir technologique de l'Afrique.
          Apprenez, partagez et innovez avec la communauté des développeurs africains.
        </motion.p>
        <motion.div 
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="text-lg rounded-full w-72 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/register")}
          >
            Rejoignez la communauté <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg rounded-full border-secondary w-64 text-secondary hover:bg-secondary hover:text-secondary-foreground"
            onClick={() => navigate("/explore")}
          >
            Explorez les articles
          </Button>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          <FeatureItem
            icon={Code}
            title="Codez avec fierté"
            description="Développez des solutions uniques pour l'Afrique et le monde"
            delay={0.6}
          />
          <FeatureItem
            icon={Users}
            title="Communauté soudée"
            description="Connectez-vous avec des développeurs passionnés à travers le continent"
            delay={0.8}
          />
          <FeatureItem
            icon={Lightbulb}
            title="Innovez pour l'Afrique"
            description="Créez des technologies qui répondent aux défis locaux"
            delay={1}
          />
        </div>
      </div>

      {/* Decorative element: Adinkra symbol */}
      <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
        <motion.svg 
          width="100" 
          height="100" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <path d="M50 0L61 39H39L50 0Z" fill="currentColor" className="text-primary"/>
          <path d="M100 50L61 61V39L100 50Z" fill="currentColor" className="text-secondary"/>
          <path d="M50 100L39 61H61L50 100Z" fill="currentColor" className="text-primary"/>
          <path d="M0 50L39 39V61L0 50Z" fill="currentColor" className="text-secondary"/>
        </motion.svg>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    className="flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
  >
    <div className="bg-accent text-accent-foreground p-4 rounded-full mb-4">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export default Hero;