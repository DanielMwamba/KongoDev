import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
import BlogCard from "../components/blogCarg";
import Loader from "../components/loader";
import * as api from "../services/api/api";
import { toast } from "react-hot-toast";

export default function Author() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(5);
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
    setVisible((prevValue) => prevValue + 5);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="flex flex-col items-center pt-6">
          <Avatar className="w-32 h-32 mb-4">
            <AvatarImage src={user?.profileImageURL} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold mb-2">{user?.name}</CardTitle>
          <p className="text-muted-foreground">
            {user?.posts.length} {user?.posts.length === 1 ? "Article" : "Articles"}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold mb-6">Articles</h2>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No articles available</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                date={post.date}
                commentCount={post.comments?.length}
              />
            ))}
          </div>
          <div className="flex justify-center">
            {visible < posts.length ? (
              <Button onClick={handleLoadMore} variant="outline">
                Voir plus
              </Button>
            ) : (
              <p className="text-muted-foreground"></p>
            )}
          </div>
        </>
      )}
    </div>
  );
}