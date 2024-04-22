import { Box, Image, Text } from "@chakra-ui/react";
import ModalProfile from "./ModalProfile";
import { RootState, useAppSelector } from "../store";

const Profile = () => {
  const profile = useAppSelector((state: RootState) => state.auth.user);
  const _host_url = "http://localhost:5000/uploads/";

  return (
    <div>
      <Box p={"15px"} bg={"#3f3f3f"} rounded={"lg"} mb={"20px"}>
        <Text fontSize={"20px"} color={"#fff"} mb={"20px"} fontWeight={"700"}>
          My profile
        </Text>
        <Box pos={"relative"}>
          <Image
            width={"350px"}
            height={"80px"}
            src={_host_url + profile?.cover}
            objectFit={"cover"}
            alt="Cover"
            rounded={"10px"}
          />

          <Image
            rounded={"full"}
            width={"70px"}
            height={"70px"}
            pos={"absolute"}
            top={"45px"}
            left={"30px"}
            src={_host_url + profile?.avatar}
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
              <Text fontSize={"12px"} color={"#fff"}>
                291
              </Text>
              <Text fontSize={"12px"} color={"#909090"}>
                Following
              </Text>
            </Box>

            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Text fontSize={"12px"} color={"#fff"}>
                23
              </Text>
              <Text fontSize={"12px"} color={"#909090"}>
                Followers
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
