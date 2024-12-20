import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, LinkIcon, Twitter, Github } from "lucide-react";
import BlogCard from "../components/blogCarg";
import Loader from "../components/loader";
import * as api from "../services/api/api";
import { toast } from "react-hot-toast";

export default function Author() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.getUserByUsername(username);
        setUser(response.user);
        setPosts(response.user.posts);
      } catch (err) {
        setError("Failed to load user data. Please try again later.");
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleLoadMore = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="mt-16 container max-w-7xl mx-auto px-4 py-8">
      <Card className="mb-8 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
        <CardContent className="relative pt-0">
          <Avatar className="w-32 h-32 border-4 border-background absolute -top-16 left-6">
            <AvatarImage src={user?.profileImageURL} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="mb-20 flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mt-20">
              <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
              <p className="text-muted-foreground mb-4">@{username}</p>
            </div>
            <Button>Follow</Button>
          </div>
          <p className="text-lg mb-4">{user?.bio || "No bio available"}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {user?.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {user.location}
              </div>
            )}
            {user?.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                {user.website}
              </a>
            )}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Joined {new Date(user?.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            {user?.twitter && (
              <a
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {user?.github && (
              <a
                href={`https://github.com/${user.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="mb-8">
        <TabsList className="flex justify-start gap-4 mb-4">
          <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
          <TabsTrigger value="about">À Propos</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Pas des posts disponibles
            </p>
          ) : (
            <>
              <div className="grid griboutd-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.slice(0, visible).map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    profileImage={post.author.profileImageURL}
                    category={post.category}
                    summary={post.summary}
                    slug={post.slug}
                    imageURL={post.imageURL}
                    user={user.name}
                    username={username}
                    date={post.date}
                    commentCount={post.comments?.length}
                    readTime={`${Math.ceil(
                      post.description.split(" ").length / 300
                    )} min de lecture`}
                    reactions={post.reactions || 0}
                  />
                ))}
              </div>
              {visible < posts.length && (
                <div className="flex justify-center">
                  <Button onClick={handleLoadMore} variant="outline">
                    Load more articles
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="about">
          <Card>
            <CardContent className="prose dark:prose-invert max-w-none py-6">
              <h2>About {user?.name}</h2>
              <p>{user?.bio || "Pas de Bio disponible."}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
