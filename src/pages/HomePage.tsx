import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Thread from "../components/Thread";
import ThreadPost from "../components/ThreadPost";
import { IThread } from "../types/app";
import { getThreads } from "../libs/api/call/thread";
import NavMobile from "../components/NavMobile";
// import NavMobile from "./NavMobile";

const HomePage = () => {
  const [threads, setThreads] = useState<IThread[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(threads);

  // const [preview, setPreview] = useState("");

  const getThread = async () => {
    try {
      const res = await getThreads();

      setThreads(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getThread();
  }, []);

  return (
    <Box borderRight={"1px"} borderLeft={"1px"} borderColor={"#3f3f3f"}>
      <Box
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
        width={{ base: "100%", sm: "768px", lg: "870px" }}
        pos={"relative"}
        bg={"#262626"}
      >
        <Box
          pos={"fixed"}
          bgColor={"#262626"}
          zIndex={"999"}
          width={{ base: "100%", sm: "768px", lg: "870px" }}
        >
          <Text
            fontSize={"28px"}
            fontWeight={"700"}
            color={"#fff"}
            ps={"20px"}
            pt={"20px"}
          >
            Home
          </Text>
          <ThreadPost callback={getThread} />
        </Box>

        <Box mt={"140px"}>
          {!isLoading ? (
            threads?.map((item: any) => {
              return (
                <Box key={item.id}>
                  <Thread thread={item} callback={getThread} />
                </Box>
              );
            })
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={"50px"}
            >
              <Spinner color="#fff" width={"50px"} height={"50px"} />
            </Box>
          )}
        </Box>
      </Box>

      <Box
        pos={"absolute"}
        bottom={"0"}
        width={{ base: "100%", sm: "768px", lg: "870px" }}
      >
        <NavMobile />
      </Box>
    </Box>
  );
};

export default HomePage;
