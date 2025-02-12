import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../components/loader";
import * as api from "../services/api/api";
import usePostData from "../hooks/post-data";
import BlogHeader from "@/components/blogHeader";
import BlogContent from "@/components/blogContent";
import CommentSection from "@/components/commentSection";
import AuthorSidebar from "@/components/authorSidebar";
import SharingSidebar from "@/components/sharingSidebar";
import MobileBottomBar from "@/components/mobileBottomBar";
import { motion } from "framer-motion";

export default function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.user);
  const { postData, setPostData, loading, isLiked, setIsLiked } = usePostData(
    slug,
    user?.id
  );

  const [comments, setComments] = useState([]);
  // const [isLiked, setIsLiked] = useState(false);

  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await api.getPost(slug);
  //     setpostData(response.posts);
  //     setComments(response.posts.comments || []);
  //     setIsLiked(response.posts.likes.includes(user?.id));
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error("Failed to load blog post. Please try again later.");
  //     // console.log("voici l'erreur", error);
  //     setLoading(false);
  //   }
  // }, [slug, user?.id]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const handleCommentSubmit = async (newComment) => {
    if (!isAuthenticated) {
      toast.error("Connectez vous pour ajouter un commentaire.");
      return;
    }
    try {
      const response = await api.addComment(slug, {
        content: newComment,
        date: new Date().toISOString(),
      });
      setComments([...comments, response.comment]);
      toast.success("Commentaire ajouté avec succès!");
    } catch (error) {
      toast.error("Erreur lors de l'ajout du commentaire. Veuillez réessayer.");
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Connectez-vous pour aimer cet article.");
      return;
    }
    try {
      await api.likePost(postData?.id);
      setIsLiked(!isLiked);
      setPostData((prev) => ({
        ...prev,
        likes: isLiked
          ? prev.likes.filter((id) => id !== user.id)
          : [...prev.likes, user.id],
      }));
      toast.success(isLiked ? "Like retiré" : "Article aimé!");
    } catch (error) {
      toast.error("Erreur lors de l'action. Veuillez réessayer.");
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `Check out this article: ${postData.title}`;

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        );
        break;
      case "copy":
        await navigator.clipboard.writeText(url);
        toast.success("Lien copié!");
        break;
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-24">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            className="lg:w-16 hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SharingSidebar
              isLiked={postData?.isLiked}
              likesCount={postData?.likes?.length}
              handleLike={handleLike}
              handleShare={handleShare}
            />
          </motion.aside>
          <motion.main
            className="flex-grow overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <BlogHeader postData={postData} navigate={navigate} />
            <BlogContent
              postData={postData}
              isLiked={postData.isLiked}
              handleLike={handleLike}
              commentsCount={comments.length}
            />
            <CommentSection
              comments={comments}
              isAuthenticated={isAuthenticated}
              handleCommentSubmit={handleCommentSubmit}
            />
          </motion.main>
          <motion.aside
            className="lg:w-64"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AuthorSidebar author={postData?.author} />
          </motion.aside>
        </div>
      </div>
      <MobileBottomBar
        isLiked={isLiked}
        likesCount={postData?.likes?.length}
        handleLike={handleLike}
        handleShare={handleShare}
      />
    </div>
  );
}
