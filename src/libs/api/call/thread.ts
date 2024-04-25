import apiConfig from "..";

export const getThreads = async () => {
  return await apiConfig.get("threads");
};

export const createThreads = async (body: {
  content: string;
  image: FileList | null;
  threadId?: number;
}) => {
  const formData = new FormData();

  if (body.image !== null) {
    for (let i = 0; i < body.image.length; i++) {
      formData.append("image", body.image[i]);
    }
    // formData.append("image", body.image);
  }

  if (body.threadId) {
    formData.append("threadId", body.threadId.toString());
  }

  formData.append("content", body.content);

  return await apiConfig.post("thread", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getThreadById = async (id: number) => {
  return await apiConfig.get(`thread/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getReplies = async (id: number) => {
  return await apiConfig.get(`replies/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteThread = async (id: number) => {
  return await apiConfig.delete(`deleteThread/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
