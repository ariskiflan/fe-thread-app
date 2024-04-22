import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import RightBar from "../components/RightBar";

const Base = () => {
  return (
    <div>
      <Box display={"flex"} bg={"#262626"}>
        <Navbar />
        <Home />
        <RightBar />
      </Box>
    </div>
  );
};

export default Base;
