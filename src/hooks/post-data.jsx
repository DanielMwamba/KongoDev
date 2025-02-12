import { useState, useEffect, useCallback } from "react";
import * as api from "../services/api/api";
import { toast } from "react-hot-toast";

const usePostData = (slug, userId) => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await api.getPost(slug);
      setPostData(response.posts);
      setIsLiked(response.posts?.like?.includes(userId));
    } catch (error) {
      toast.error("Erreur lors du chargement du post. Veuillez réessayer.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [slug, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { postData, setPostData, loading, isLiked, setIsLiked };
};

export default usePostData;
