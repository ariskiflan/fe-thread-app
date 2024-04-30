import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import RightBar from "../components/RightBar";
import Navbar from "../components/Navbar";
import Following from "../components/Following";
import Followers from "../components/Followers";

const FollowPage = () => {
  return (
    <div>
      {" "}
      <Box display={"flex"} bg={"#262626"}>
        <Navbar />
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
            <Tabs isFitted variant="unstyled">
              <Box position={"fixed"} width={"695px"} zIndex={"999"}>
                <TabList borderColor={"#3f3f3f"} bg={"#262626"} pt={"30px"}>
                  <Tab color={"#fff"}>Followers</Tab>
                  <Tab color={"#fff"}>Following</Tab>
                </TabList>
                <TabIndicator bg={"#04A51E"} height={"4px"} rounded={"2px"} />
              </Box>

              <Box
                overflowY={"scroll"}
                __css={{
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                mt={"80px"}
              >
                <TabPanels>
                  <TabPanel color={"#fff"}>
                    <Box p={"20px"}>
                      <Followers />
                    </Box>
                  </TabPanel>
                  <TabPanel color={"#fff"}>
                    <Box p={"20px"}>
                      <Following />
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Box>
            </Tabs>
          </Box>
        </Box>
        <RightBar />
      </Box>
    </div>
  );
};

export default FollowPage;
