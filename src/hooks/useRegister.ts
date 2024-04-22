import { ChangeEvent, useState } from "react";
import { IRegister } from "../types/app";
import { register } from "../libs/api/call/user";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [formInput, setFormInput] = useState<IRegister>({
    username: "",
    password: "",
    email: "",
    fullname: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await register(formInput);
      console.log(res);

      navigate("/auth/login");
      console.log(res);
    } catch (error) {
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
    handleRegister,
    handleChange,
  };
};

export default useRegister;
