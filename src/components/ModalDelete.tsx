import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

import { FaRegTrashCan, FaX } from "react-icons/fa6";
import { deleteThread } from "../libs/api/call/thread";
import { IThread } from "../types/app";
import { useAppDispatch } from "../store";
import { getThreadAsync } from "../store/async/thread";

interface IModalDeleteProps {
  thread: IThread;
  callback?: () => {};
}

const ModalDelete: React.FC<IModalDeleteProps> = ({ thread, callback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();
  const toast = useToast();

  const deletePost = async (id: number) => {
    try {
      await deleteThread(id);

      toast({
        title: "Delete Success!",
        status: "success",
        position: "top",
        isClosable: true,
      });

      if (callback) {
        await callback();
      } else {
        await dispatch(getThreadAsync());
      }

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box onClick={onOpen}>
        <FaRegTrashCan color="#909090" size={"16px"} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#3f3f3f"} rounded={"20px"} position={"fixed"}>
          <ModalCloseButton color={"#909090"} />
          <ModalBody>
            <Box px={"10px"} py={"50px"}>
              <Text
                fontSize={"18px"}
                fontWeight={"700"}
                color={"#fff"}
                textAlign={"center"}
              >
                Are you sure you want to delete this post?
              </Text>

              <Box display={"flex"} gap={"10px"} mt={"20px"}>
                <Button
                  onClick={() => onClose()}
                  px={"3px"}
                  py={"4px"}
                  rounded={"full"}
                  width={"100%"}
                  height={"30px"}
                  fontSize={"15px"}
                  bg={"#04A51E"}
                  color={"#fff"}
                  _hover={{ bg: "#fff", color: "#04A51E" }}
                >
                  <Text display={"flex"} alignItems={"center"} gap={"5px"}>
                    <FaX />
                    Close
                  </Text>
                </Button>

                <Button
                  onClick={() => deletePost(Number(thread.id))}
                  px={"3px"}
                  py={"4px"}
                  rounded={"full"}
                  width={"100%"}
                  height={"30px"}
                  fontSize={"15px"}
                  bg={"#04A51E"}
                  color={"#fff"}
                  _hover={{ bg: "#fff", color: "#04A51E" }}
                >
                  <Text display={"flex"} alignItems={"center"} gap={"5px"}>
                    <FaRegTrashCan />
                    Delete
                  </Text>
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalDelete;
