import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Detail from "../components/Detail";
import RightBar from "../components/RightBar";

const DetailPage = () => {
  return (
    <div>
      <Box display={"flex"} bg={"#262626"}>
        <Navbar />
        <Detail />
        <RightBar />
      </Box>
    </div>
  );
};

export default DetailPage;
