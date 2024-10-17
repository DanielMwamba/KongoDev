import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Hero from "../components/hero";
import CategoryCard from "../components/categoryCard";
import BlogCard from "../components/blogCarg";
import categories from "../services/api/categories.json";
import * as api from "../services/api/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [visible, setVisible] = useState(9);

  useEffect(() => {
    api.getAllPosts().then((response) => setPosts(response.posts));
  }, []);

  function handleLoadMore() {
    setVisible((prevValue) => prevValue + 9);
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explorer les Catégories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.slice(0, 5).map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                image={category.imageURL}
                link={`/categories/${category.name}`}
              />
            ))}
            <CategoryCard
              name="Tout explorer"
              image="https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              link="/categories/"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explorer les Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.slice(0, visible).map((post) => (
              <div key={post.id} className="bg-background rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <BlogCard
                  title={post.title}
                  category={post.category}
                  summary={post.summary}
                  slug={post.slug}
                  imageURL={post.imageURL}
                  user={post.author.name}
                  username={post.author.userName}
                  date={post.date}
                />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            {posts && visible < posts.length && (
              <Button
                size="lg"
                onClick={handleLoadMore}
                className="group"
              >
                Voir Plus
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}