import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Loader2, TrendingUp, Clock, Zap } from "lucide-react";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import BlogCard from "../components/blogCarg";
import categories from "../services/api/categories.json";
import * as api from "../services/api/api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState(null);
  const [latestPosts, setLatestPosts] = useState(null);
  const [visible, setVisible] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.getAllPosts();
        setPosts(response.posts);
        setTrendingPosts(
          response.posts.sort((a, b) => b.reactions - a.reactions).slice(0, 5)
        );
        setLatestPosts(
          response.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="lg:w-2/3">
            <Tabs defaultValue="feed" className="mb-8">
              <TabsList>
                <TabsTrigger value="feed">Your Feed</TabsTrigger>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="top">Top</TabsTrigger>
              </TabsList>
              <TabsContent value="feed">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {posts?.slice(0, visible).map((post) => (
                      <BlogCard
                        key={post.id}
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
                        // readTime={`${Math.ceil(post.description?.split(' ').length / 200)} min read`}
                        reactions={post.reactions || 0}
                      />
                    ))}
                  </div>
                )}
                {posts && visible < posts.length && (
                  <div className="mt-8 text-center">
                    <Button
                      size="lg"
                      onClick={handleLoadMore}
                      className="group"
                    >
                      Voir Plus
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="latest">
                <div className="space-y-6">
                  {latestPosts?.map((post) => (
                    <BlogCard
                      key={post.id}
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
                      // readTime={`${Math.ceil(post.description.split(' ').length / 200)} min read`}
                      reactions={post.reactions || 0}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="top">
                <div className="space-y-6">
                  {trendingPosts?.map((post) => (
                    <BlogCard
                      key={post.id}
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
                      // readTime={`${Math.ceil(post.description.split(' ').length / 200)} min read`}
                      reactions={post.reactions || 0}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>

          <aside className="lg:w-1/3 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Tendance
                </h2>
                <ul className="space-y-4">
                  {trendingPosts?.slice(0, 3).map((post, index) => (
                    <li key={post.id} className="flex items-start">
                      <span className="text-2xl font-bold text-muted-foreground mr-4">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-medium hover:text-primary transition-colors">
                          <a href={`/blog/${post.slug}`}>{post.title}</a>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {post.author.name}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Dernier
                </h2>
                <ul className="space-y-4">
                  {latestPosts?.slice(0, 3).map((post) => (
                    <li key={post.id}>
                      <h3 className="font-medium hover:text-primary transition-colors">
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {post.author.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  Categories
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 4).map((category) => (
                    <CategoryCard
                      key={category.id}
                      name={category.name}
                      image={category.imageURL}
                      link={`/categories/${category.name}`}
                    />
                  ))}
                </div>
                <NavLink to="/categories" className="mt-4 w-full">
                  <Button variant="link" className="mt-4 w-full">
                    Voir toutes les catégories
                  </Button>
                </NavLink>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
