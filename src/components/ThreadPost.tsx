import { Box, Button, Image, Input, useToast } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import React, { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { createThreads } from "../libs/api/call/thread";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { getThreadAsync } from "../store/async/thread";

interface IThreadPostProps {
  threadId?: number;
  callback?: () => Promise<void>;
}

const ThreadPost: React.FC<IThreadPostProps> = ({ threadId, callback }) => {
  const profile = useAppSelector((state: RootState) => state.auth.user);
  const _host_url = "http://localhost:5000/uploads/";

  const [postThreads, setPostThreads] = useState<{
    content: string;
    image: FileList | null;
    threadId?: number;
  }>({
    content: "",
    image: null,
  });

  const [preview, setPreview] = useState<any>([]);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handlePostThreads = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (threadId) {
        postThreads.threadId = threadId;
      }

      const res = await createThreads(postThreads);

      setPostThreads({
        content: "",
        image: null,
      });

      toast({
        title: "Thread Added!",
        status: "success",
        position: "top",
        isClosable: true,
      });

      setPreview([]);

      if (callback) {
        await callback();
      } else {
        await dispatch(getThreadAsync());
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;

    if (files) {
      const fileList = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreview(fileList);

      setPostThreads({
        ...postThreads,
        [name]: files,
      });

      return;
    }

    setPostThreads({
      ...postThreads,
      [name]: value,
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handlePostThreads}>
        <Box
          borderBottom={"1px"}
          borderColor={"#3f3f3f"}
          display={"flex"}
          gap={"10px"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={"20px"}
        >
          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
            <Image
              src={_host_url + profile?.avatar}
              rounded={"full"}
              width={"40px"}
              height={"40px"}
              objectFit={"cover"}
            />

            <Input
              variant="unstyled"
              placeholder="What is Happening?!"
              color={"#909090"}
              fontSize={"20px"}
              onChange={handleChange}
              name="content"
              value={postThreads.content}
            />
          </Box>

          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
            <Button
              bg={"#262626"}
              _hover={{
                transform: "translateY(-10px)",
                transition: "0.3s",
                bg: "#262626",
              }}
              onClick={handleImage}
            >
              <LuImagePlus size={"24px"} color={"#04A51E"} />
              <Input
                type="file"
                multiple
                max={4}
                display={"none"}
                onChange={handleChange}
                name="image"
                ref={inputRef}
              />
            </Button>

            <Button
              type="submit"
              px={"2px"}
              py={"4px"}
              rounded={"full"}
              width={"63px"}
              height={"33px"}
              fontSize={"14px"}
              bg={"#005E0E"}
              color={"#fff"}
              _hover={{ bg: "#fff", color: "#005E0E" }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </form>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={"10px"}
        justifyContent={"center"}
      >
        {preview
          ? preview.map((item: any) => (
              <Image width={"30%"} src={item} rounded={"10px"} />
            ))
          : ""}
      </Box>
    </div>
  );
};

export default ThreadPost;
