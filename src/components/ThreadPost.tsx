import { Box, Button, Image, Input } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import Avatar from "../assets/image/customer-5.jpg";
import React, { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { createThreads } from "../libs/api/call/thread";

interface IThreadPostProps {
  threadId?: number;
  callback?: () => {};
}

const ThreadPost: React.FC<IThreadPostProps> = ({ threadId, callback }) => {
  const [postThreads, setPostThreads] = useState<{
    content: string;
    image: FileList | null;
    threadId?: number;
  }>({
    content: "",
    image: null,
  });

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

      if (callback) {
        callback();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;

    if (files) {
      // const imagePreview = e.target.files ? e.target.files[0] : null;

      // if (imagePreview) {
      //   setPreview(URL.createObjectURL(imagePreview));
      // }

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
              src={Avatar}
              rounded={"full"}
              width={"40px"}
              height={"40px"}
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
    </div>
  );
};

export default ThreadPost;
