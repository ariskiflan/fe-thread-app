import apiConfig from "..";

export const getProfile = async (token: string) => {
  return await apiConfig.get("profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// type TKey = "bio" | "avatar" | "cover";

type TBody = {
  [key: string]: string | File | null | undefined;
};

interface IBody extends TBody {
  bio?: string | null;
  avatar?: File | null | string;
  cover?: File | null | string;
  username?: string | null;
  fullname?: string | null;
}

export const updateProfile = async (token: string, body: IBody) => {
  const formData = new FormData();

  Object.keys(body).map((key) => {
    if (body[key]) {
      formData.append(key, body[key] as Blob);
    }
  });

  try {
    const res = await apiConfig.patch("profile", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(token, body, res);

    return res.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};
