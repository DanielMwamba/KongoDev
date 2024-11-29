import React from "react";
import {
  BarChart,
  Calendar,
  Edit3,
  Eye,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import PanelWrapper from "../partials/panelWrapper.panel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import * as api from "../../services/api/api";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const response = await api.getAllPosts();
      setPosts(response.posts);
      // console.log(response.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  }

  const totalComments = posts.reduce(
    (total, post) => total + post.comments.length,
    0
  );

  // Mock data - replace with actual API calls
  const stats = {
    totalPosts: 42,
    totalViews: 0,
    totalLikes: 0,
  };

  const recentPosts = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      views: 1200,
      likes: 89,
      comments: 23,
    },
    {
      id: 2,
      title: "Advanced TypeScript Techniques",
      views: 980,
      likes: 76,
      comments: 18,
    },
    {
      id: 3,
      title: "Building Scalable Node.js Applications",
      views: 1500,
      likes: 112,
      comments: 31,
    },
  ];

  const scheduledPosts = [
    {
      id: 1,
      title: "GraphQL vs REST: A Comprehensive Comparison",
      date: "2023-07-15",
    },
    { id: 2, title: "Mastering CSS Grid Layout", date: "2023-07-22" },
  ];

  return (
    <PanelWrapper>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Posts
                </CardTitle>
                <Edit3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Views
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalViews}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Likes
                </CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLikes}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Comments
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalComments}</div>
              </CardContent>
            </Card>
          </div>

          {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Recent Posts Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentPosts.map(post => (
                                        <div key={post.id} className="flex items-center">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={`https://avatar.vercel.sh/${post.id}.png`} alt={post.title} />
                                                <AvatarFallback>{post.title.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">{post.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {post.views} views • {post.likes} likes • {post.comments} comments
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium">
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Draft</CardTitle>
                                <CardDescription>Quickly jot down your ideas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Input id="title" placeholder="Post title" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Textarea placeholder="What's on your mind?" />
                                        </div>
                                    </div>
                                    <Button className="mt-4">Save Draft</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Scheduled Posts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {scheduledPosts.map(post => (
                                        <div key={post.id} className="flex items-center">
                                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium leading-none">{post.title}</p>
                                                <p className="text-sm text-muted-foreground">Scheduled for {post.date}</p>
                                            </div>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div> */}
        </div>
      </main>
    </PanelWrapper>
  );
}
