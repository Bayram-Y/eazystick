// src/hooks/useLike.js
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectJwtToken } from "../../store/auth-slice"; 
import axios from "axios";
import apiClient from "../../api/apiClient"; 

export function useLike(productId, initialLiked = false, initialCount = 0) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const token = useSelector(selectJwtToken); // ← Redux dan token

  const toggleLike = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await apiClient.post(
        `/api/likes/product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // backend int qaytaradi (likeCount)
      setLiked((prev) => !prev);
      setLikeCount(data);
    } catch (err) {
      console.error("Like error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { liked, likeCount, loading, toggleLike };
}