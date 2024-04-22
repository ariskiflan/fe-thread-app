import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { GoDotFill } from "react-icons/go";
import Message from "../assets/image/message-text.png";
import Avatar from "../assets/image/customer-5.jpg";
import { IThread } from "../types/app";
import { RootState, useAppSelector } from "../store";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useLikes from "../hooks/useLikes";
import { useEffect } from "react";

const AllPost = (props: IThread) => {
  const { content, image, posted_at, id } = props;

  const { toogleLikes, getLikes, totalLikes, likes } = useLikes(Number(id));
  const profile = useAppSelector((state: RootState) => state.auth.user);

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
                {profile?.user.fullname}
              </Text>

              <Text size={"14px"} color={"#909090"}>
                @{profile?.user.username}
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
                  <GridItem>
                    <Image
                      src={"http://localhost:5000/uploads/" + image.image}
                      alt="image"
                      height={"200px"}
                      rounded={"10px"}
                      objectFit={"cover"}
                    />
                  </GridItem>
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
                <Image src={Message} width={"20px"} />

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

export default AllPost;
