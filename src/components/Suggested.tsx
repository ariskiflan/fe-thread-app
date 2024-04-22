import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUsers } from "../libs/api/call/user";
import { IUser } from "../types/app";
import Avatar from "../assets/image/customer-5.jpg";

const Suggested = () => {
  const [user, setUser] = useState<IUser[]>([]);

  const getUser = async () => {
    try {
      const res = await getUsers();
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Box
        p={"15px"}
        bg={"#3f3f3f"}
        rounded={"lg"}
        height={"180px"}
        mb={"20px"}
        display={"flex"}
        flexDir={"column"}
      >
        <Text
          fontSize={"20px"}
          color={"#fff"}
          fontWeight={"700"}
          mb={"10px"}
          position={"fixed"}
        >
          Suggested For You
        </Text>

        <Box
          mt={"50px"}
          display={"flex"}
          flexDir={"column"}
          gap={"15px"}
          overflowX={"hidden"}
          overflowY={"scroll"}
          __css={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {user.map((item) => (
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              key={item.id}
            >
              <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <Image
                  rounded={"full"}
                  width={"40px"}
                  height={"40px"}
                  src={Avatar}
                />

                <Box>
                  <Text fontSize={"14px"} color={"#fff"} fontWeight={"700"}>
                    {item.fullname}
                  </Text>
                  <Text fontSize={"14px"} color={"#909090"} fontWeight={"500"}>
                    @{item.username}
                  </Text>
                </Box>
              </Box>

              <Button
                // onClick={handleFollow}
                px={"2px"}
                py={"3px"}
                rounded={"full"}
                width={"106px"}
                height={"30px"}
                fontSize={"12px"}
                bg={"#3f3f3f"}
                color={"#fff"}
                borderColor={"#fff"}
                border={"1px"}
                _hover={{ bg: "#fff", color: "#3f3f3f" }}
              >
                follow
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Suggested;
