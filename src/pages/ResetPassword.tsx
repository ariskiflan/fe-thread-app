import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import Logo from "../assets/image/logo-circle.png";
import { FormControl } from "@chakra-ui/react";

const ResetPassword = () => {
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
            Reset Password
          </Text>

          <FormControl>
            <Box display={"flex"} flexDir={"column"} gap={"20px"}>
              <Input
                rounded={"md"}
                borderColor={"#545454"}
                color={"#fff"}
                px={"10px"}
                height={"50px"}
                placeholder="New Password*"
                type="password"
              />

              <Input
                rounded={"md"}
                borderColor={"#545454"}
                color={"#fff"}
                px={"10px"}
                height={"50px"}
                placeholder="Confirm New Password*"
                type="email"
              />

              <Button
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
                Create New Password
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};

export default ResetPassword;
