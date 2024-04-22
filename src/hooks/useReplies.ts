import { useState } from "react";
import { getReplies } from "../libs/api/call/thread";
import { IThread } from "../types/app";
import { useParams } from "react-router-dom";

const useReplies = () => {
  const [replies, setReplies] = useState<IThread[]>([]);

  const { threadId } = useParams();

  const getReply = async () => {
    try {
      const resReplies = await getReplies(Number(threadId));
      console.log(resReplies);

      setReplies(resReplies.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { replies, getReply, threadId };
};

export default useReplies;
