import apiConfig from "..";
import { ILogin, IRegister } from "../../../types/app";

export const login = async (body: ILogin) => {
  return await apiConfig.post("login", body);
};

export const register = async (body: IRegister) => {
  return await apiConfig.post("register", body);
};

export const getUsers = async () => {
  return await apiConfig.get("user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getUser = async (id: number) => {
  return await apiConfig.get(`user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getUsersNotId = async () => {
  return await apiConfig.get("suggested", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
