import apiConfig from "..";

export const getFollower = async () => {
  return await apiConfig.get("follower", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getFollowing = async () => {
  return await apiConfig.get("following", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const createFollow = async (followingId: number) => {
  return await apiConfig.post(
    "follow",
    {
      followingId: followingId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    }
  );
};
