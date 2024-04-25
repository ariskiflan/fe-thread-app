import { useState } from "react";
import apiConfig from "../libs/api";
import { IThread } from "../types/app";

const useAllPost = () => {
  const [threadByToken, setThreadByToken] = useState<IThread[] | []>([]);

  const getThreadByToken = async () => {
    try {
      const res = await apiConfig.get(`threadByToken`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setThreadByToken(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { getThreadByToken, threadByToken };
};

export default useAllPost;
