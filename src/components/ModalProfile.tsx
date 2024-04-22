import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import Avatar from "../assets/image/customer-5.jpg";
import Cover from "../assets/image/cover.png";
import { LuImagePlus } from "react-icons/lu";

const ModalProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Box display={"flex"} justifyContent={"flex-end"} mt={"10px"}>
        <Button
          onClick={onOpen}
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
          Edit Profile
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#3f3f3f"} position={"fixed"} rounded={"20px"}>
          <ModalCloseButton color={"#909090"} />
          <ModalBody>
            <Box display={"flex"} flexDir={"column"} gap={"10px"} py={"20px"}>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={"10px"}
                mb={"10px"}
                pt={"10px"}
              >
                <Text fontSize={"20px"} fontWeight={"700"} color={"#fff"}>
                  Edit Profile
                </Text>
              </Box>
              <Box pos={"relative"}>
                <Image
                  width={"100%"}
                  height={"80px"}
                  src={Cover}
                  rounded={"10px"}
                />

                <Image
                  rounded={"full"}
                  width={"70px"}
                  height={"70px"}
                  pos={"absolute"}
                  top={"45px"}
                  left={"30px"}
                  src={Avatar}
                  border={"4px"}
                  borderColor={"#262626"}
                ></Image>

                <Box
                  bg={"#262626"}
                  rounded={"full"}
                  width={"30px"}
                  height={"30px"}
                  p={"5px"}
                  position={"absolute"}
                  top={"65px"}
                  left={"50px"}
                >
                  <LuImagePlus size={"20px"} color={"#fff"} />
                </Box>
              </Box>

              <form>
                <FormControl>
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    gap={"30px"}
                    alignItems={"center"}
                    mt={"50px"}
                  >
                    <Box width={"100%"} position={"relative"}>
                      <FormLabel
                        color={"#909090"}
                        position={"absolute"}
                        bg={"#3f3f3f"}
                        p={"5px"}
                        top={"-17px"}
                        left={"10px"}
                        zIndex={"1"}
                      >
                        Name
                      </FormLabel>
                      <Input
                        border={"2px"}
                        py={"10px"}
                        px={"5px"}
                        borderColor={"#545454"}
                        color={"#909090"}
                        fontSize={"14px"}
                        name="name"
                        variant="unstyled"
                        placeholder="Aris Kiflan"
                      />
                    </Box>

                    <Box width={"100%"} position={"relative"}>
                      <FormLabel
                        color={"#909090"}
                        position={"absolute"}
                        bg={"#3f3f3f"}
                        p={"5px"}
                        top={"-17px"}
                        left={"10px"}
                        zIndex={"1"}
                      >
                        Username
                      </FormLabel>
                      <Input
                        border={"2px"}
                        py={"10px"}
                        px={"5px"}
                        borderColor={"#545454"}
                        color={"#909090"}
                        fontSize={"14px"}
                        name="username"
                        variant="unstyled"
                        placeholder="@arskflnm"
                      />
                    </Box>

                    <Box width={"100%"} position={"relative"}>
                      <FormLabel
                        color={"#909090"}
                        position={"absolute"}
                        bg={"#3f3f3f"}
                        p={"5px"}
                        top={"-17px"}
                        left={"10px"}
                        zIndex={"1"}
                      >
                        Bio
                      </FormLabel>
                      <Input
                        border={"2px"}
                        py={"30px"}
                        px={"5px"}
                        borderColor={"#545454"}
                        color={"#909090"}
                        fontSize={"14px"}
                        name="bio"
                        variant="unstyled"
                        placeholder="Males mau beli truck"
                      />
                    </Box>
                  </Box>

                  <Box
                    display={"flex"}
                    gap={"10px"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    mt={"20px"}
                  >
                    <Button
                      type="submit"
                      px={"2px"}
                      py={"4px"}
                      rounded={"full"}
                      width={"63px"}
                      height={"33px"}
                      fontSize={"14px"}
                      bg={"#04A51E"}
                      color={"#fff"}
                      _hover={{ bg: "#fff", color: "#005E0E" }}
                    >
                      Save
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

export default ModalProfile;
