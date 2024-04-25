import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { ILogin } from "../types/app";
import { useNavigate } from "react-router-dom";
import { getProfileAsync, loginAsync } from "../store/async/auth";

const useLogin = () => {
  const [formInput, setFormInput] = useState<ILogin>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginAsync(formInput));

      navigate("/");
      await dispatch(getProfileAsync(token));
    } catch (error) {
      setMsg("Wrong username or password");
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
