import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { GoDotFill } from "react-icons/go";
import Message from "../assets/image/message-text.png";
import { IThread } from "../types/app";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ModalDelete from "./ModalDelete";
import Like from "./Like";
import { formatDistanceToNow } from "date-fns";

interface IThreadCardPost {
  thread: IThread;
  callback?: () => {};
}

const Thread: React.FC<IThreadCardPost> = ({ thread, callback }) => {
  const { content, auhtor, image, id, userId, posted_at, _count } = thread;

  useEffect(() => {
    if (callback) callback();
  }, []);

  return (
    <div>
      <Box>
        <Box
          display={"grid"}
          gridTemplateColumns={"auto 1fr"}
          gap={"10px"}
          borderBottom={"1px"}
          borderColor={"#3f3f3f"}
          p={"20px"}
          position={"relative"}
          bg={"#262626"}
          width={{ base: "100%", sm: "768px", lg: "870px" }}
        >
          <Link to={`/profilepage/${userId}`}>
            <Image
              src={auhtor?.profile?.avatar}
              rounded={"full"}
              width={"40px"}
              height={"40px"}
              objectFit={"cover"}
            />
          </Link>

          <Box>
            <Box
              display={"flex"}
              gap={"10px"}
              mb={"10px"}
              alignItems={"center"}
              width={"100%"}
            >
              <Text size={"14px"} color={"#fff"}>
                {auhtor?.fullname}
              </Text>

              <Text size={"14px"} color={"#909090"}>
                @{auhtor?.username}
              </Text>

              <GoDotFill size={"10px"} color={"#909090"} />

              <Text size={"14px"} color={"#909090"}>
                {formatDistanceToNow(new Date(posted_at), {
                  addSuffix: false,
                })}
              </Text>
              <Box position={"absolute"} right={"10px"} top={"10px"}>
                <ModalDelete thread={thread} callback={callback} />
              </Box>
            </Box>

            <Text
              size={"14px"}
              color={"#fff"}
              mb={"10px"}
              textAlign={"justify"}
            >
              {content}
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={"15px"} mb={"20px"}>
              {image &&
                image.map((image) => (
                  <Box key={image.id}>
                    <GridItem>
                      <Image
                        src={image.image}
                        alt="image"
                        width={"200px"}
                        rounded={"10px"}
                        objectFit={"cover"}
                      />
                    </GridItem>
                  </Box>
                ))}
            </Grid>

            <Box display={"flex"} gap={"20px"}>
              <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <Like threadId={Number(id)} callback={callback} />
                <Text size={"14px"} color={"#909090"}>
                  {_count.like}
                </Text>
              </Box>

              <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <Link to={`detailPage/${id}`}>
                  <Image src={Message} width={"20px"} />
                </Link>
                <Text size={"14px"} color={"#909090"}>
                  {_count.replies} Replies
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Thread;
