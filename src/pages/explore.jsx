import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import Loader from "../components/loader.jsx";
import * as api from "../services/api/api";
import { useInView } from "react-intersection-observer";
import { ArrowDown, RefreshCcw } from 'lucide-react';

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.getAllPosts();
      console.log(response.posts);
      setPosts(response.posts);
      setError(null);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    setVisible((prevValue) => prevValue + 6);
  };

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
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
            Explorer les Articles
          </h1>
          <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
            Découvrez une variété d'articles passionnants écrits par la communauté des développeurs africains.
            Apprenez, inspirez-vous et restez à jour avec les dernières tendances technologiques.
          </p>
        </motion.div>

        {loading && posts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchPosts} variant="outline">
              <RefreshCcw className="mr-2 h-4 w-4" /> Réessayer
            </Button>
          </div>
        ) : (
          <>
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {posts.slice(0, visible).map((post) => (
                  <motion.div key={post._id} variants={itemVariants}>
                    <BlogCard
                      title={post.title}
                      category={post.category}
                      summary={post.summary}
                      slug={post.slug}
                      imageURL={post.imageURL}
                      profileImage={post.author.profileImageURL}
                      user={post.author.name}
                      username={post.author.username}
                      date={post.date}
                      commentCount={post.comments?.length || 0}
                      reactions={post.likes?.length || 0}
                      readTime={`${Math.ceil(post.description?.split(' ').length / 300)} min de lecture`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {visible < posts.length && (
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                ref={ref}
              >
                <Button
                  size="lg"
                  onClick={handleLoadMore}
                  className="group"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="mr-2 h-4 w-4" />
                  ) : (
                    <ArrowDown className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  )}
                  Charger plus d'articles
                </Button>
              </motion.div>
            )}

            {visible >= posts.length && posts.length > 0 && (
              <motion.p
                className="text-center mt-12 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Vous avez atteint la fin des articles disponibles.
              </motion.p>
            )}

            {posts.length === 0 && !loading && (
              <motion.p
                className="text-center mt-12 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Aucun article trouvé. Revenez bientôt pour du nouveau contenu !
              </motion.p>
            )}
          </>
        )}
      </div>
    </div>
  );
}