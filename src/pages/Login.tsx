import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import Logo from "../assets/image/logo-circle.png";
import { FormControl, FormHelperText } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { handleChange, handleLogin, msg, togleShowPassword, showPassword } =
    useLogin();
  return (
    <div>
      <Box
        bg={"#262626"}
        display={"flex"}
        justifyContent={"center"}
        height={"100vh"}
      >
        <Box width={"500px"} mt={"50px"}>
          <Text
            color={"#fff"}
            fontSize={"20px"}
            mb={"20px"}
            fontWeight={"700"}
            textAlign={"center"}
          >
            {msg}
          </Text>
          <Image width={"150px"} height={"40px"} src={Logo} mb={"10px"} />
          <Text color={"#fff"} fontSize={"28px"} mb={"20px"} fontWeight={"700"}>
            Login To Circle
          </Text>

          <form onSubmit={handleLogin}>
            <FormControl>
              <Box display={"flex"} flexDir={"column"} gap={"20px"}>
                <Box>
                  <Input
                    rounded={"md"}
                    borderColor={"#545454"}
                    color={"#fff"}
                    px={"10px"}
                    height={"50px"}
                    placeholder="Email/Username*"
                    type="text"
                    onChange={handleChange}
                    name="username"
                  />
                </Box>

                <Box position={"relative"}>
                  <Input
                    rounded={"md"}
                    placeholder="Password*"
                    borderColor={"#545454"}
                    color={"#fff"}
                    px={"10px"}
                    height={"50px"}
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    name="password"
                  />

                  <Box
                    onClick={togleShowPassword}
                    position={"absolute"}
                    top={"9px"}
                    right={"20px"}
                    p={"5px"}
                    cursor={"pointer"}
                  >
                    {showPassword ? (
                      <FaRegEye size={"24px"} color={"#fff"} />
                    ) : (
                      <FaRegEyeSlash size={"24px"} color={"#fff"} />
                    )}
                  </Box>
                </Box>

                <Box display={"flex"} justifyContent={"flex-end"}>
                  <Link to={"/forgot"}>
                    <Text color={"#fff"} fontSize={"16px"} cursor={"pointer"}>
                      Forgot Password?
                    </Text>
                  </Link>
                </Box>
                <Button
                  type="submit"
                  px={"3px"}
                  py={"4px"}
                  rounded={"full"}
                  width={"100%"}
                  height={"50px"}
                  fontSize={"24px"}
                  bg={"#04A51E"}
                  color={"#fff"}
                  _hover={{ bg: "#fff", color: "#04A51E" }}
                >
                  Login
                </Button>

                <Box display={"flex"} gap={"10px"}>
                  <FormHelperText
                    color={"#fff"}
                    fontSize={"18px"}
                    fontWeight={"500"}
                    cursor={"pointer"}
                  >
                    Don't have an account yet?
                  </FormHelperText>

                  <Link to={"/auth/register"}>
                    <FormHelperText
                      color={"#04A51E"}
                      fontSize={"18px"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                    >
                      Create account
                    </FormHelperText>
                  </Link>
                </Box>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
