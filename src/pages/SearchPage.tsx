import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import RightBar from "../components/RightBar";
import Search from "../components/Search";

const SearchPage = () => {
  return (
    <div>
      <Box display={"flex"} bg={"#262626"}>
        <Navbar />
        <Search />
        <RightBar />
      </Box>
    </div>
  );
};

export default SearchPage;
