import { Box, Button, Image, Text } from "@chakra-ui/react";
import Message from "../assets/image/message-text.png";
import { GoDotFill } from "react-icons/go";
import ThreadPost from "../components/ThreadPost";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IThread } from "../types/app";
import { getReplies, getThreadById } from "../libs/api/call/thread";
import Thread from "../components/Thread";
import Like from "../components/Like";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { FaAngleLeft, FaAngleRight, FaArrowLeft } from "react-icons/fa";
import ModalDelete from "../components/ModalDelete";
// import { formatDistanceToNow } from "date-fns";

const DetailImage = () => {
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
  console.log(threadDetail);

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

  const sliderSettings = {
    spaceBetween: 10,
    slidesPerView: 1,
  };

  return (
    <div>
      <Box display={"flex"} bg={"#262626"}>
        <Box width={"862px"} position={"relative"}>
          <Swiper {...sliderSettings}>
            <SliderButton />
            <Box
              position={"absolute"}
              top={"20px"}
              left={"20px"}
              height={"50px"}
              width={"50px"}
              rounded={"full"}
              bg={"#fff"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              zIndex={"99"}
            >
              <Link to={"/"}>
                <FaArrowLeft size={"24px"} color={"#262626"} />
              </Link>
            </Box>

            {threadDetail.image &&
              threadDetail.image.map((image: any) => (
                <SwiperSlide key={image.image}>
                  <Box>
                    <Image
                      src={image.image}
                      alt="image"
                      height={"100vh"}
                      width={"100%"}
                      objectFit={"cover"}
                    />
                  </Box>
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>
        <Box borderRight={"1px"} borderLeft={"1px"} borderColor={"#3f3f3f"}>
          <Box
            width={"500px"}
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
                  src={threadDetail.auhtor?.profile?.avatar}
                  rounded={"full"}
                  width={"40px"}
                  height={"40px"}
                  objectFit={"cover"}
                />

                <Box>
                  <Box
                    display={"flex"}
                    gap={"10px"}
                    mb={"10px"}
                    alignItems={"center"}
                  >
                    <Text size={"14px"} color={"#fff"}>
                      {threadDetail.auhtor?.fullname}
                    </Text>

                    <Text size={"14px"} color={"#909090"}>
                      @{threadDetail.auhtor?.username}
                    </Text>

                    <GoDotFill size={"10px"} color={"#909090"} />

                    <Text size={"14px"} color={"#909090"}>
                      {/* {formatDistanceToNow(new Date(threadDetail.posted_at), {
                        addSuffix: false,
                      })} */}
                      {threadDetail.posted_at}
                    </Text>
                    <Box position={"absolute"} right={"10px"} top={"22px"}>
                      <ModalDelete />
                    </Box>
                  </Box>

                  <Text
                    size={"14px"}
                    color={"#fff"}
                    mb={"10px"}
                    textAlign={"justify"}
                  >
                    {threadDetail.content}
                  </Text>

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
              </Box>
              <ThreadPost threadId={Number(id)} callback={getThreadDetails} />
              {replies.map((item) => {
                return (
                  <Box key={item.id}>
                    <Thread thread={item} callback={getThreadDetails} />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DetailImage;

const SliderButton = () => {
  const swiper = useSwiper();
  return (
    <Box>
      <Button
        onClick={() => swiper.slidePrev()}
        bg={"#fff"}
        fontSize={"20px"}
        position={"absolute"}
        left={"0"}
        top={"50%"}
        height={"50px"}
        width={"50px"}
        rounded={"full"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        zIndex={"999"}
        ml={"20px"}
      >
        <FaAngleLeft size="50px" />
      </Button>
      <Button
        onClick={() => swiper.slideNext()}
        bg={"#fff"}
        fontSize={"20px"}
        position={"absolute"}
        right={"0"}
        top={"50%"}
        height={"50px"}
        width={"50px"}
        rounded={"full"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        zIndex={"999"}
        mr={"20px"}
      >
        <FaAngleRight size="50px" />
      </Button>
    </Box>
  );
};
