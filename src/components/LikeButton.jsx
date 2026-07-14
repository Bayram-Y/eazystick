import { useEffect, useState } from "react";
import { toggleLikeApi, getLikeStatusApi } from "../api/LikeApi";

const LikeButton = ({ productId, initialCount, initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount || 0);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await getLikeStatusApi(productId);
        setLiked(status);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStatus();
  }, [productId]);

  const handleLike = async () => {
    try {
      const res = await toggleLikeApi(productId);
      setLiked(res.liked);
      setCount(res.likesCount);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={handleLike}
      //   className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:scale-110 transition cursor-pointer"
      className="bg-violet-50 text-violet-800 text-xs font-medium px-2.5 py-1 rounded-full border border-violet-200"
    >
      <span className={`text-lg ${liked ? "text-red-800" : "text-gray-400"}`}>
        {liked ? "❤️" : "🤍"}
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
        {count}
      </span>
    </button>
  );
};

export default LikeButton;
