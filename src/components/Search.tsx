import { Box, Input } from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";
const Search = () => {
  return (
    <div>
      <Box
        borderRight={"1px"}
        borderLeft={"1px"}
        borderColor={"#3f3f3f"}
        ml={"270px"}
      >
        <Box
          width={"695px"}
          height={"100vh"}
          display={"flex"}
          flexDir={"column"}
          overflowY={"scroll"}
          overflowX={"hidden"}
          __css={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box pos={"fixed"} width={"695px"} bgColor={"#262626"} p={"30px"}>
            <form>
              <Box>
                <RiUserSearchLine color="#909090" size={"24px"} />
              </Box>
              <Input
                placeholder="Search Your Friends"
                bg={"#3f3f3f"}
                color={"#909090"}
                fontSize={"18px"}
                name="content"
                rounded={"20px"}
                width={"100%"}
                border={"none"}
              />
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Search;
