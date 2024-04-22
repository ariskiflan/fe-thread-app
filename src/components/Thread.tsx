import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import Message from "../assets/image/message-text.png";
import Avatar from "../assets/image/customer-5.jpg";
import { IThread } from "../types/app";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useLikes from "../hooks/useLikes";
import { FaHeart } from "react-icons/fa";

interface IThreadCardPost {
  thread: IThread;
}

const Thread: React.FC<IThreadCardPost> = ({ thread }) => {
  const { content, auhtor, image, id, posted_at } = thread;

  const { toogleLikes, getLikes, totalLikes, likes } = useLikes(Number(id));

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  return (
    <div>
      <Box>
        <Box
          display={"flex"}
          gap={"10px"}
          borderBottom={"1px"}
          borderColor={"#3f3f3f"}
          p={"20px"}
        >
          <Image src={Avatar} rounded={"full"} width={"40px"} height={"40px"} />

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
                {auhtor?.email}
              </Text>

              <GoDotFill size={"10px"} color={"#909090"} />

              <Text size={"14px"} color={"#909090"}>
                {posted_at}
              </Text>
            </Box>

            <Text
              size={"14px"}
              color={"#fff"}
              mb={"10px"}
              textAlign={"justify"}
            >
              {content}
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={"20px"}>
              {image &&
                image.map((image) => (
                  <Box key={image.id}>
                    <GridItem>
                      <Image
                        src={"http://localhost:5000/uploads/" + image.image}
                        alt="image"
                        height={"200px"}
                        rounded={"10px"}
                        objectFit={"cover"}
                      />
                    </GridItem>
                  </Box>
                ))}
            </Grid>

            <Box display={"flex"} gap={"20px"}>
              <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <Text onClick={() => toogleLikes()}>
                  {likes ? (
                    <FaHeart size={"20px"} color={"red"} />
                  ) : (
                    <FaRegHeart size={"20px"} color={"#909090"} />
                  )}
                </Text>

                <Text size={"14px"} color={"#909090"}>
                  {totalLikes}
                </Text>
              </Box>

              <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <Link to={`detailPage/${id}`}>
                  <Image src={Message} width={"20px"} />
                </Link>
                <Text size={"14px"} color={"#909090"}>
                  25 Replies
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
