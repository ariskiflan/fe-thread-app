import apiConfig from "..";

export const getProfile = async (token: string) => {
  return await apiConfig.get("profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// type TKey = "bio" | "avatar" | "cover";

// type TBody = {
//   [key: string]: string | File | null | undefined;
// };

// interface IBody extends TBody {
//   bio?: string | null;
//   avatar?: File | null;
//   cover?: File | null;
// }

// export const updateProfile = async (token: string, body: IBody) => {
//   const formData = new FormData();

//   Object.keys(body).map((key) => {
//     if (body[key]) {
//       formData.append(key, body[key] as Blob);
//     }
//   });
// };
