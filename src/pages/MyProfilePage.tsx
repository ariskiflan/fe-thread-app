import {
  Box,
  Grid,
  GridItem,
  Image,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ModalProfile from "../components/ModalProfile";
import AllPost from "../components/AllPost";
import { useAppSelector } from "../store";
import useAllPost from "../hooks/useAllPost";
import Suggested from "../components/Suggested";
import Footer from "../components/Footer";

const MyProfilePage = () => {
  const profile = useAppSelector((state) => state.auth.user);

  const { threadByToken, getThreadByToken } = useAllPost();

  useEffect(() => {
    getThreadByToken();
  }, []);
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
            <Box
              width={"695px"}
              zIndex={"999"}
              bgColor={"#262626"}
              position={"fixed"}
            >
              <Box p={"15px"} bg={"#262626"} rounded={"lg"}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={"10px"}
                  mb={"10px"}
                  pt={"10px"}
                >
                  <Link to={"/"}>
                    <FaArrowLeft size={"24px"} color={"#fff"} />
                  </Link>
                  <Text fontSize={"28px"} fontWeight={"700"} color={"#fff"}>
                    {profile?.user.fullname}
                  </Text>
                </Box>
                <Box pos={"relative"}>
                  <Image
                    width={"100%"}
                    height={"80px"}
                    src={profile?.cover}
                    rounded={"10px"}
                    objectFit={"cover"}
                    alt="Cover"
                  />

                  <Image
                    rounded={"full"}
                    width={"70px"}
                    height={"70px"}
                    pos={"absolute"}
                    top={"45px"}
                    left={"30px"}
                    src={profile?.avatar}
                    border={"4px"}
                    borderColor={"#262626"}
                    objectFit={"cover"}
                    alt="Avatar"
                  />

                  <ModalProfile />
                </Box>

                <Box display={"flex"} flexDir={"column"} gap={"5px"}>
                  <Text fontSize={"20px"} color={"#fff"}>
                    {profile?.user.fullname}
                  </Text>

                  <Text fontSize={"16px"} color={"#909090"}>
                    @{profile?.user.username}
                  </Text>

                  <Text fontSize={"14px"} color={"#fff"}>
                    {profile?.bio}
                  </Text>

                  <Box display={"flex"} gap={"20px"}>
                    <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Text fontSize={"14px"} color={"#fff"}>
                        {profile?.user?.following?.length}
                      </Text>
                      <Text fontSize={"14px"} color={"#909090"}>
                        Followers
                      </Text>
                    </Box>

                    <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Text fontSize={"14px"} color={"#fff"}>
                        {profile?.user?.follower?.length}
                      </Text>
                      <Text fontSize={"14px"} color={"#909090"}>
                        Following
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Tabs isFitted variant="unstyled" mt={"320px"}>
              <Box position={"fixed"} width={"695px"} zIndex={"999"}>
                <TabList borderColor={"#3f3f3f"} bg={"#262626"}>
                  <Tab color={"#fff"}>All Post</Tab>
                  <Tab color={"#fff"}>Media</Tab>
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
                mt={"50px"}
              >
                <TabPanels>
                  <TabPanel color={"#fff"} p={"0"}>
                    {threadByToken?.map((item: any) => {
                      return (
                        <Box key={item.id}>
                          <AllPost
                            threadByToken={item}
                            callback={getThreadByToken}
                          />
                        </Box>
                      );
                    })}
                  </TabPanel>
                  <TabPanel color={"#fff"}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                      {threadByToken.map((item) => {
                        return (
                          <>
                            {item.image &&
                              item.image.map((image: any) => {
                                return (
                                  <GridItem key={image.id}>
                                    <Image
                                      src={
                                        "http://localhost:5000/uploads/" +
                                        image.image
                                      }
                                      alt="image"
                                      height={"200px"}
                                      rounded={"10px"}
                                      objectFit={"cover"}
                                    />
                                  </GridItem>
                                );
                              })}
                          </>
                        );
                      })}
                    </Grid>
                  </TabPanel>
                </TabPanels>
              </Box>
            </Tabs>
          </Box>
        </Box>
        <Box
          width={"400px"}
          height={"1117px"}
          position={"fixed"}
          top={"0"}
          right={"0"}
          display={"flex"}
          flexDir={"column"}
          p={"20px"}
        >
          <Suggested />
          <Footer />
        </Box>
      </Box>
    </div>
  );
};

export default MyProfilePage;
