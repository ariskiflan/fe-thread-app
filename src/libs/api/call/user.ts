import apiConfig from "..";
import { ILogin, IRegister } from "../../../types/app";

export const login = async (body: ILogin) => {
  return await apiConfig.post("login", body);
};

export const register = async (body: IRegister) => {
  return await apiConfig.post("register", body);
};

export const getUsers = async () => {
  return await apiConfig.get("users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
