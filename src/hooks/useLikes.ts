import { useState } from "react";
import { createLike, likeById } from "../libs/api/call/like";

const useLikes = (threadId: number) => {
  const [likes, setLikes] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const toogleLikes = async () => {
    try {
      if (!likes) {
        await createLike(threadId);
        setLikes(1);
        localStorage.setItem(`liked_${threadId}`, "true");
      } else {
        await createLike(threadId);
        setLikes(0);
        localStorage.removeItem(`liked_${threadId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLikes = async () => {
    try {
      const likesCount = await likeById(threadId);
      console.log(likesCount);
      setTotalLikes(likesCount.data.data.user.length);

      const liked = localStorage.getItem(`liked_${threadId}`);

      if (liked === "true") {
        setLikes(1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { toogleLikes, getLikes, totalLikes, likes };
};

export default useLikes;
