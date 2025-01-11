import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Sparkles } from "lucide-react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import BlogCard from "@/components/BlogCard";
import categories from "@/services/api/categories.json";
import * as api from "@/services/api/api";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
// import { useToast } from "../hooks/use-toast";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.getAllPosts();
        setPosts(response.posts);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
        toast({
          title: "Erreur",
          description:
            "Impossible de charger les articles. Veuillez réessayer plus tard.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  const handleStartWriting = () => {
    if (isLoggedIn) {
      navigate("/authorpanel/blogs/new");
    } else {
      toast((t) => (
        <span>
          Vous devez être connecté pour écrire un article.
          <Button 
            size="sm" 
            onClick={() => { 
              toast.dismiss(t.id);
              navigate("/login");
            }}
            className="ml-2"
          >
            Se connecter
          </Button>
        </span>
      ), {
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      navigate("/login");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
            Explorez nos Catégories
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Découvrez une variété de sujets passionnants dans le monde du
            développement, adaptés aux intérêts de tous les développeurs.
          </p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.slice(0, 5).map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <CategoryCard
                  name={category.name}
                  icon={category.icon}
                  link={`/categories/${category.name.toLowerCase()}`}
                />
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <CategoryCard
                name="Tout explorer"
                icon="MoreHorizontal"
                link="/categories"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
            Articles Récents
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Découvrez les derniers articles publiés par notre communauté
            mondiale de développeurs. Restez à jour avec les dernières tendances
            et innovations technologiques.
          </p>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {posts?.slice(0, visible).map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <BlogCard
                      title={post.title}
                      category={post.category}
                      summary={post.summary}
                      slug={post.slug}
                      imageURL={post.imageURL}
                      profileImage={post.author.profileImageURL}
                      user={post.author.name}
                      username={post.author.userName}
                      date={post.date}
                      commentCount={post.comments.length}
                      reactions={post.likes.length}
                      readTime={`${Math.ceil(
                        post.description.split(" ").length / 200
                      )} min de lecture`}
                    />
                  </motion.div>
                ))}
              </motion.div>
              {posts && visible < posts.length && (
                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button size="lg" onClick={handleLoadMore} className="group">
                    Voir Plus
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Rejoignez notre Communauté de Développeurs passionnés
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Partagez vos connaissances, apprenez des autres et contribuez à une
            communauté diversifiée de développeurs passionnés.
          </p>
          <Button size="lg" onClick={handleStartWriting} className="group w-64">
            Commencer à Écrire
            <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
          </Button>
        </div>
      </section>
    </div>
  );
}
