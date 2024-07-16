import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Like from "../components/Like";
import ThreadPost from "../components/ThreadPost";
import Thread from "../components/Thread";
import { useEffect, useState } from "react";
import { IThread } from "../types/app";
import { getReplies, getThreadById } from "../libs/api/call/thread";
import Message from "../assets/image/message-text.png";
import NavMobile from "../components/NavMobile";

const DetailPage = () => {
  const { id } = useParams();

  const [threadDetail, setThreadDetail] = useState<IThread>({
    id: 0,
    userId: 0,
    content: "",
    image: [],
    posted_at: "",
    auhtor: {
      email: "",
      fullname: "",
      id: 0,
      username: "",
      profile: {
        avatar: "",
        user: {
          email: "",
          fullname: "",
          id: 0,
          username: "",
        },
      },
    },
    _count: {
      replies: 0,
      like: 0,
    },
  });

  const [replies, setReplies] = useState<IThread[]>([]);

  const getThreadDetails = async () => {
    try {
      const res = await getThreadById(Number(id));
      const resReplies = await getReplies(Number(id));

      setThreadDetail(res.data.data);
      setReplies(resReplies.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getThreadDetails();
  }, []);

  return (
    <div>
      <Box display={"flex"} bg={"#262626"}>
        <Box borderRight={"1px"} borderLeft={"1px"} borderColor={"#3f3f3f"}>
          <Box
            width={{ base: "100%", sm: "768px", lg: "870px" }}
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
            py={"30px"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              ps={"20px"}
              gap={"10px"}
            >
              <Link to={"/"}>
                <FaArrowLeft size={"24px"} color={"#fff"} />
              </Link>
              <Text fontSize={"28px"} fontWeight={"700"} color={"#fff"}>
                Status
              </Text>
            </Box>

            <Box display={"flex"} gap={"10px"} alignItems={"center"} p={"20px"}>
              <Image
                src={threadDetail.auhtor?.profile?.avatar}
                rounded={"full"}
                width={"40px"}
                height={"40px"}
                objectFit={"cover"}
              />

              <Box display={"flex"} flexDir={"column"}>
                <Text size={"14px"} color={"#fff"}>
                  {threadDetail.auhtor?.fullname}
                </Text>

                <Text size={"14px"} color={"#909090"}>
                  @{threadDetail.auhtor?.username}
                </Text>
              </Box>
            </Box>

            <Box
              px={"20px"}
              pb={"20px"}
              borderBottom={"1px"}
              borderColor={"#3f3f3f"}
              // key={value.id}
            >
              <Text
                size={"14px"}
                color={"#fff"}
                mb={"10px"}
                textAlign={"justify"}
              >
                {threadDetail.content}
              </Text>

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={"20px"}>
                {threadDetail.image &&
                  threadDetail.image.map((image: any) => (
                    <GridItem>
                      <Image
                        src={image.image}
                        alt="image"
                        height={"200px"}
                        rounded={"10px"}
                        objectFit={"cover"}
                      />
                    </GridItem>
                  ))}
              </Grid>

              <Box
                display={"flex"}
                gap={"10px"}
                alignItems={"center"}
                mb={"20px"}
              >
                <Text size={"14px"} color={"#909090"}>
                  11:32PM
                </Text>

                <GoDotFill size={"10px"} color={"#909090"} />

                <Text size={"14px"} color={"#909090"}>
                  {threadDetail.posted_at}
                  {/* {formatDistanceToNow(new Date(threadDetail.posted_at), {
                  addSuffix: false,
                })} */}
                </Text>
              </Box>

              <Box display={"flex"} gap={"20px"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <Like threadId={Number(id)} callback={getThreadDetails} />
                  <Text size={"14px"} color={"#909090"}>
                    {threadDetail._count.like}
                  </Text>
                </Box>

                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <Image src={Message} width={"20px"} />
                  <Text size={"14px"} color={"#909090"}>
                    {threadDetail._count.replies} Replies
                  </Text>
                </Box>
              </Box>
            </Box>
            <ThreadPost callback={getThreadDetails} threadId={Number(id)} />

            {replies.map((item) => {
              return (
                <Box key={item.id}>
                  <Thread thread={item} callback={getThreadDetails} />
                </Box>
              );
            })}
          </Box>

          <NavMobile />
        </Box>
      </Box>
    </div>
  );
};

export default DetailPage;
