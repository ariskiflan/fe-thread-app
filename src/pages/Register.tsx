import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import Logo from "../assets/image/logo-circle.png";
import { FormControl, FormHelperText } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const { handleRegister, handleChange } = useRegister();
  return (
    <div>
      <Box
        bg={"#262626"}
        display={"flex"}
        justifyContent={"center"}
        height={"100vh"}
      >
        <Box width={"500px"} mt={"50px"}>
          <Image width={"150px"} height={"40px"} src={Logo} mb={"10px"} />
          <Text color={"#fff"} fontSize={"28px"} mb={"20px"} fontWeight={"700"}>
            Create account Circle
          </Text>
          <form onSubmit={handleRegister}>
            <FormControl>
              <Box display={"flex"} flexDir={"column"} gap={"20px"}>
                <Input
                  id="full_name"
                  rounded={"md"}
                  borderColor={"#545454"}
                  color={"#fff"}
                  px={"10px"}
                  height={"50px"}
                  placeholder="Fullname*"
                  type="text"
                  name="fullname"
                  onChange={handleChange}
                />

                <Input
                  id="email"
                  rounded={"md"}
                  borderColor={"#545454"}
                  color={"#fff"}
                  px={"10px"}
                  height={"50px"}
                  placeholder="Email*"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />

                <Input
                  id="username"
                  rounded={"md"}
                  borderColor={"#545454"}
                  color={"#fff"}
                  px={"10px"}
                  height={"50px"}
                  placeholder="username*"
                  type="text"
                  name="username"
                  onChange={handleChange}
                />

                <Input
                  id="password"
                  rounded={"md"}
                  placeholder="Password*"
                  borderColor={"#545454"}
                  color={"#fff"}
                  px={"10px"}
                  height={"50px"}
                  type="text"
                  name="password"
                  onChange={handleChange}
                />

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
                  Create
                </Button>

                <Box display={"flex"} gap={"10px"}>
                  <FormHelperText
                    color={"#fff"}
                    fontSize={"18px"}
                    fontWeight={"500"}
                    cursor={"pointer"}
                  >
                    Already have account?
                  </FormHelperText>

                  <Link to={"/auth/login"}>
                    <FormHelperText
                      color={"#04A51E"}
                      fontSize={"18px"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                    >
                      Login
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

export default Register;
