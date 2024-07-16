import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import Following from "../components/Following";
import Followers from "../components/Followers";
import NavMobile from "../components/NavMobile";

const FollowPage = () => {
  return (
    <div>
      {" "}
      <Box display={"flex"} bg={"#262626"}>
        <Box borderRight={"1px"} borderLeft={"1px"} borderColor={"#3f3f3f"}>
          <Box
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
            width={{ base: "100%", sm: "768px", lg: "870px" }}
          >
            <Tabs isFitted variant="unstyled">
              <Box
                position={"fixed"}
                width={{ base: "100%", sm: "768px", lg: "870px" }}
                zIndex={"999"}
              >
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

          <Box
            pos={"absolute"}
            bottom={"0"}
            width={{ base: "100%", sm: "768px", lg: "870px" }}
          >
            <NavMobile />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default FollowPage;
