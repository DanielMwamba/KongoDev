import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className=" mt-10 bg-background text-foreground min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-4">
            À Propos de <span className="text-primary">DEVSphere</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une plateforme pour partager des connaissances et connecter les développeurs
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              DEVSphere vise à créer une communauté de développeurs passionnés. 
              Notre plateforme offre un espace où chacun peut partager ses connaissances, 
              explorer de nouvelles idées et collaborer sur des projets innovants.
            </p>
            <p className="text-lg mb-8 text-muted-foreground">
              Que vous soyez débutant ou expert, DEVSphere vous permet de grandir 
              professionnellement, d'élargir votre réseau et de contribuer à l'avancement 
              de la technologie à l'échelle mondiale.
            </p>
            <div className="flex space-x-4">
              <Button asChild>
                <Link to="/register">Rejoignez-nous</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/categories">Explorez les Articles</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/devsphere.png"
                alt="Développeurs collaborant"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
              <p className="font-semibold">Rejoignez plus de</p>
              <p className="text-3xl font-bold">100,000+</p>
              <p>développeurs</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Connectez-vous avec nous</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/articlesphere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-8 w-8" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/company/articlesphere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-8 w-8" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://twitter.com/articlesphere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-8 w-8" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;