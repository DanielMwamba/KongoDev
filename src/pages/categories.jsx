import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CategoryCard from "../components/categoryCard";
import categories from "@/services/api/categories.json";
import Loader from "../components/loader.jsx";

export default function Categories() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating API call

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {loading ? (
        <Loader />
      ) : (
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
              Explorez diferrents sujets
            </h1>
            <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Découvrez une variété de sujets passionnants dans le domaine du développement, 
              adaptés aux besoins et aux intérêts de la communauté tech africaine.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <CategoryCard 
                  name={category.name}
                  image={category.imageURL}
                  link={`/categories/${category.name}`}
                  color={category.color}
                  description={category.description || "Explorez les dernières tendances et innovations dans cette catégorie."}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}