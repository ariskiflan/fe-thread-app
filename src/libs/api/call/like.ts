import apiConfig from "..";

export const createLike = async (threadId: number) => {
  return await apiConfig.post(
    "like",
    { threadId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const getCurrentLike = async (threadId: number) => {
  return await apiConfig.get(`like/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const likeById = async (threadId: number) => {
  return await apiConfig.get(`likes/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
