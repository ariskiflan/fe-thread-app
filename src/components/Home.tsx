import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Thread from "./Thread";
import ThreadPost from "./ThreadPost";
import { IThread } from "../types/app";
import { getThreads } from "../libs/api/call/thread";

const Home = () => {
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
    <div>
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
          <Box pos={"fixed"} width={"695px"} bgColor={"#262626"} zIndex={"999"}>
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
      </Box>
    </div>
  );
};

export default Home;
