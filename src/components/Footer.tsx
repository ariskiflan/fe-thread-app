import { Box, Image, Text } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import MainLogo from "../assets/image/main-logo.png";

const Footer = () => {
  return (
    <div>
      <Box p={"15px"} bg={"#3f3f3f"} rounded={"lg"}>
        <Box display={"flex"} alignItems={"center"} gap={"10px"} mb={"5px"}>
          <Text fontSize={"14px"} fontWeight={"700"} color={"#fff"}>
            Developed by arskflnm
          </Text>

          <GoDotFill size={"10px"} color={"#909090"} />

          <FaGithub size={"20px"} color={"#B2B2B2"} />
          <FaLinkedin size={"20px"} color={"#B2B2B2"} />
          <FaInstagram size={"20px"} color={"#B2B2B2"} />
          <FaFacebook size={"20px"} color={"#B2B2B2"} />
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={"5px"}>
          <Text fontSize={"11px"} fontWeight={"500"} color={"#B2B2B2"}>
            Powered by
          </Text>

          <Image width={"24px"} src={MainLogo}></Image>
          <Text fontSize={"11px"} fontWeight={"500"} color={"#B2B2B2"}>
            DumbWays Indonesia
          </Text>
          <Text fontSize={"11px"} fontWeight={"500"} color={"#B2B2B2"}>
            #1 Coding Bootcamp
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default Footer;
