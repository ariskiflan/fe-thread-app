import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Image,
  Input,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import Avatar from "../assets/image/customer-5.jpg";

import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { createThreads } from "../libs/api/call/thread";

interface IThreadPostProps {
  threadId?: number;
}

const ModalPost: React.FC<IThreadPostProps> = ({ threadId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [postThreads, setPostThreads] = useState<{
    content: string;
    image: FileList | null;
    threadId?: number;
  }>({
    content: "",
    image: null,
  });

  const toast = useToast();

  const handlePostThreads = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (threadId) {
        postThreads.threadId = threadId;
      }

      const res = await createThreads(postThreads);

      toast({
        title: "Thread Added!",
        status: "success",
        position: "top",
        isClosable: true,
      });

      setPostThreads({
        content: "",
        image: null,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;

    if (files) {
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
      <Button
        onClick={onOpen}
        px={"3px"}
        py={"4px"}
        rounded={"full"}
        width={"100%"}
        height={"52px"}
        fontSize={"20px"}
        bg={"#04A51E"}
        color={"#fff"}
        _hover={{ bg: "#fff", color: "#04A51E" }}
      >
        Create Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#3f3f3f"} rounded={"20px"} position={"fixed"}>
          <ModalCloseButton color={"#909090"} />
          <ModalBody>
            <Box display={"flex"} flexDir={"column"} gap={"10px"} py={"20px"}>
              <form encType="multipart/form-data" onSubmit={handlePostThreads}>
                <FormControl>
                  <Box
                    display={"flex"}
                    gap={"10px"}
                    alignItems={"center"}
                    borderBottom={"1px"}
                    borderColor={"#909090"}
                    pb={"50px"}
                  >
                    <Image
                      src={Avatar}
                      rounded={"full"}
                      width={"40px"}
                      height={"40px"}
                    ></Image>

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

                  {/* {preview ? (
                    <Box display={"flex"} justifyContent={"center"} mt={"20px"}>
                      <Image width={"300px"} src={preview} />
                    </Box>
                  ) : (
                    ""
                  )} */}

                  <Box
                    display={"flex"}
                    gap={"10px"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    mt={"20px"}
                  >
                    <Button
                      bg={"#3f3f3f"}
                      _hover={{
                        transform: "translateY(-10px)",
                        transition: "0.3s",
                        bg: "#3f3f3f",
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
                      onClick={onClose}
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
                </FormControl>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalPost;
