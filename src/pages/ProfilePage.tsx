import {
  Box,
  Grid,
  GridItem,
  Image,
  TabIndicator,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Suggested from "../components/Suggested";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUser } from "../libs/api/call/user";
import { IThread, IUser } from "../types/app";
import { getThreadByUserId } from "../libs/api/call/thread";
import { GoDotFill } from "react-icons/go";
import ModalDelete from "../components/ModalDelete";
import Like from "../components/Like";
import Message from "../assets/image/message-text.png";
import ButtonFollow from "../components/ButtonFollow";

const ProfilPage = () => {
  const _host_url = "http://localhost:5000/uploads/";

  const [user, setUser] = useState<IUser>({
    id: 0,
    username: "",
    email: "",
    fullname: "",
    profile: {
      avatar: "",
      bio: "",
      cover: "",
      user: {
        id: 0,
        username: "",
        email: "",
        fullname: "",
      },
    },
    follower: [],
    following: [],
  });

  const { id } = useParams();

  const handleUser = async () => {
    try {
      const res = await getUser(Number(id));
      console.log(res);
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [threadByUserId, setThreadByUserId] = useState<IThread[]>([]);

  const handleThreadByUserId = async () => {
    try {
      const res = await getThreadByUserId(Number(id));
      console.log(res);

      setThreadByUserId(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUser();
    handleThreadByUserId();
  }, []);

  return (
    <div>
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
                    {user.fullname}
                  </Text>
                </Box>
                <Box pos={"relative"}>
                  <Image
                    width={"100%"}
                    height={"80px"}
                    src={_host_url + user.profile?.cover}
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
                    src={_host_url + user.profile?.avatar}
                    border={"4px"}
                    borderColor={"#262626"}
                    objectFit={"cover"}
                    alt="Avatar"
                  />

                  <Box display={"flex"} justifyContent={"flex-end"} mt={"10px"}>
                    <ButtonFollow followingId={user.id} />
                  </Box>
                </Box>

                <Box display={"flex"} flexDir={"column"} gap={"5px"}>
                  <Text fontSize={"20px"} color={"#fff"}>
                    {user.fullname}
                  </Text>

                  <Text fontSize={"16px"} color={"#909090"}>
                    @{user.username}
                  </Text>

                  <Text fontSize={"14px"} color={"#fff"}>
                    {user.profile?.bio}
                  </Text>

                  <Box display={"flex"} gap={"20px"}>
                    <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Text fontSize={"14px"} color={"#fff"}>
                        {user?.following?.length}
                      </Text>
                      <Text fontSize={"14px"} color={"#909090"}>
                        Followers
                      </Text>
                    </Box>

                    <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                      <Text fontSize={"14px"} color={"#fff"}>
                        {user?.follower?.length}
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
                    {threadByUserId.map((item) => (
                      <Box>
                        <Box
                          display={"flex"}
                          gap={"10px"}
                          borderBottom={"1px"}
                          borderColor={"#3f3f3f"}
                          p={"20px"}
                          position={"relative"}
                        >
                          <Image
                            src={_host_url + item.auhtor?.profile?.avatar}
                            rounded={"full"}
                            width={"40px"}
                            height={"40px"}
                          />

                          <Box>
                            <Box
                              display={"flex"}
                              gap={"10px"}
                              mb={"10px"}
                              alignItems={"center"}
                            >
                              <Text size={"14px"} color={"#fff"}>
                                {item.auhtor?.fullname}
                              </Text>

                              <Text size={"14px"} color={"#909090"}>
                                @{item.auhtor?.username}
                              </Text>

                              <GoDotFill size={"10px"} color={"#909090"} />

                              <Text size={"14px"} color={"#909090"}>
                                {item.posted_at}
                              </Text>

                              <Box
                                position={"absolute"}
                                right={"10px"}
                                top={"22px"}
                              >
                                <ModalDelete />
                              </Box>
                            </Box>

                            <Text
                              size={"14px"}
                              color={"#fff"}
                              mb={"10px"}
                              textAlign={"justify"}
                            >
                              {item.content}
                            </Text>

                            <Grid
                              templateColumns="repeat(2, 1fr)"
                              gap={6}
                              mb={"20px"}
                            >
                              {item.image &&
                                item.image.map((image) => (
                                  <GridItem key={image.id}>
                                    <Image
                                      src={
                                        "http://localhost:5000/uploads/" +
                                        image.image
                                      }
                                      alt="image"
                                      width={"200px"}
                                      rounded={"10px"}
                                      objectFit={"cover"}
                                    />
                                  </GridItem>
                                ))}
                            </Grid>

                            <Box display={"flex"} gap={"20px"}>
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                gap={"10px"}
                              >
                                <Like threadId={Number(id)} />
                                <Text size={"14px"} color={"#909090"}>
                                  {item._count.like}
                                </Text>
                              </Box>

                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                gap={"10px"}
                              >
                                <Link to={`/detailPage/${id}`}>
                                  <Image src={Message} width={"20px"} />
                                </Link>

                                <Text size={"14px"} color={"#909090"}>
                                  {item._count.replies} Replies
                                </Text>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </TabPanel>
                  <TabPanel color={"#fff"}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                      {threadByUserId.map((item) => {
                        return (
                          <>
                            {item.image &&
                              item.image.map((image: any) => {
                                return (
                                  <GridItem key={image.id}>
                                    <Link to={`/detailimage/${id}`}>
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
                                    </Link>
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

export default ProfilPage;
