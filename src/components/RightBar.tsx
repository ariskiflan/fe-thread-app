import { Box } from "@chakra-ui/react";

import Footer from "./Footer";
import Suggested from "./Suggested";
import Profile from "./Profile";

const RightBar = () => {
  return (
    <div>
      <Box
        width={"400px"}
        height={"1117px"}
        position={"fixed"}
        display={"flex"}
        flexDir={"column"}
        p={"20px"}
      >
        <Profile />
        <Suggested />
        <Footer />
      </Box>
    </div>
  );
};

export default RightBar;
