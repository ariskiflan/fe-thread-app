import { ChangeEvent, useState } from "react";
import { login } from "../libs/api/call/user";
import { getProfile } from "../libs/api/call/profile";
import { useAppDispatch } from "../store";
import { SET_LOGIN } from "../store/slice/auth";
import { ILogin } from "../types/app";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [formInput, setFormInput] = useState<ILogin>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [msg, setMsg] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const togleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login(formInput);

      const token = res.data.data;

      const resProfile = await getProfile(token);
      localStorage.setItem("token", token);

      dispatch(SET_LOGIN({ user: resProfile.data.data, token }));
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.Message);
      }
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  return {
    handleChange,
    handleLogin,
    msg,
    togleShowPassword,
    showPassword,
  };
};

export default useLogin;
