import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import RightBar from "../components/RightBar";

const Layout = () => {
  return (
    <>
      <Box display={"flex"} bg={"#262626"}>
        <Box>
          <Navbar />
        </Box>
        <Box>
          <Outlet />
        </Box>
        <Box>
          <RightBar />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
