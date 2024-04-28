import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { GoDotFill } from "react-icons/go";
import Message from "../assets/image/message-text.png";
import { IThread } from "../types/app";
import React from "react";
import { Link } from "react-router-dom";
import ModalDelete from "./ModalDelete";
import { formatDate } from "../libs/date/formatDate";
import Like from "./Like";

interface IThreadCardPost {
  thread: IThread;
  callback?: () => {};
}

const Thread: React.FC<IThreadCardPost> = ({ thread, callback }) => {
  const { content, auhtor, image, id, userId, posted_at, _count } = thread;

  const _host_url = "http://localhost:5000/uploads/";

  return (
    <div>
      <Box>
        <Box
          display={"flex"}
          gap={"10px"}
          borderBottom={"1px"}
          borderColor={"#3f3f3f"}
          p={"20px"}
          position={"relative"}
        >
          <Link to={`/profilepage/${userId}`}>
            <Image
              src={_host_url + auhtor?.profile?.avatar}
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
            >
              <Text size={"14px"} color={"#fff"}>
                {auhtor?.fullname}
              </Text>

              <Text size={"14px"} color={"#909090"}>
                @{auhtor?.username}
              </Text>

              <GoDotFill size={"10px"} color={"#909090"} />

              <Text size={"14px"} color={"#909090"}>
                {formatDate(posted_at)}
              </Text>
              <Box position={"absolute"} right={"10px"} top={"22px"}>
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
                      <Link to={`/detailimage/${id}`}>
                        <Image
                          src={"http://localhost:5000/uploads/" + image.image}
                          alt="image"
                          width={"200px"}
                          rounded={"10px"}
                          objectFit={"cover"}
                        />
                      </Link>
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
