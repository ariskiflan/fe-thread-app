import { Box } from "@chakra-ui/react";

import Footer from "./Footer";
import Suggested from "./Suggested";
import Profile from "./Profile";

const RightBar = () => {
  return (
    <Box display={{ base: "none", xl: "flex" }}>
      <Box
        width={"400px"}
        height={"1117px"}
        position={"fixed"}
        display={"flex"}
        flexDir={"column"}
        p={"20px"}
        bg={"#262626"}
      >
        <Profile />
        <Suggested />
        <Footer />
      </Box>
    </Box>
  );
};

export default RightBar;
