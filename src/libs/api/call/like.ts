import apiConfig from "..";

export const createLike = async (threadId: number) => {
  return await apiConfig.post(
    "likes",
    { threadId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const likeById = async (threadId: number) => {
  return await apiConfig.get(`likes/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
