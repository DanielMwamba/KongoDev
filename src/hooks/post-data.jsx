import { useState, useEffect } from "react";
import * as api from "../services/api/api";
import { toast } from "react-hot-toast";
import useAuth from "./use-auth";

const usePostData = (slug, userId) => {
  const { user, isAuthenticated } = useAuth();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getPost(slug);
        setPostData(response.posts);
        setIsLiked(response.posts?.like?.includes(userId));
        setComments(response.posts?.comments);
      } catch (error) {
        toast.error("Erreur lors du chargement du post. Veuillez réessayer.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, userId]);

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
      setComments((prevComments) => [...prevComments, response.comment]);
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

  return {
    postData,
    setPostData,
    loading,
    isLiked,
    setIsLiked,
    comments,
    handleCommentSubmit,
    handleLike,
  };
};

export default usePostData;
