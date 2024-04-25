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
  useToast,
} from "@chakra-ui/react";

import React, { ChangeEvent, useRef, useState } from "react";
import { updateProfile } from "../libs/api/call/profile";
import { useAppDispatch, useAppSelector } from "../store";

import { getProfileAsync } from "../store/async/auth";
import { getThreadAsync } from "../store/async/thread";

const ModalProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = useAppSelector((state) => state.auth.token);
  const profile = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [formInput, setFormInput] = useState<{
    bio?: string;
    avatar?: File | null | string;
    cover?: File | null | string;
    username?: string;
    fullname?: string;
  }>({
    bio: profile?.bio || "",
    avatar: null,
    cover: null,
    username: profile?.user.username || "",
    fullname: profile?.user.fullname || "",
  });

  const [imagePreviewAvatar, setImagePreviewAvatar] = useState<
    string | undefined
  >();

  const [imagePreviewCover, setImagePreviewCover] = useState<
    string | undefined
  >();

  const handleImgAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewAvatar(imageUrl);
    }

    setFormInput({
      ...formInput,
      avatar: file || profile?.avatar || null,
    });
  };

  const handleImgCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewCover(imageUrl);
    }

    setFormInput({
      ...formInput,
      cover: file || profile?.cover || null,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await updateProfile(token, formInput);

      toast({
        title: "Profile Updated!",
        status: "success",
        position: "top",
        isClosable: true,
      });

      setFormInput(formInput);

      await dispatch(getProfileAsync(token!));
      await dispatch(getThreadAsync());
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const inputRefCover = useRef<HTMLInputElement>(null);
  const inputRefAvatar = useRef<HTMLInputElement>(null);

  const handleAvatar = () => {
    if (inputRefAvatar.current) {
      inputRefAvatar.current.click();
    }
  };

  const handleCover = () => {
    if (inputRefCover.current) {
      inputRefCover.current.click();
    }
  };

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
              <form onSubmit={handleUpdate}>
                <FormControl>
                  <Box pos={"relative"}>
                    <Image
                      width={"100%"}
                      height={"80px"}
                      src={
                        imagePreviewCover ? imagePreviewCover : profile?.cover
                      }
                      rounded={"10px"}
                      onClick={handleCover}
                    />
                    <Input
                      type="file"
                      display={"none"}
                      onChange={handleImgCover}
                      name="cover"
                      ref={inputRefCover}
                    />

                    <Image
                      rounded={"full"}
                      width={"70px"}
                      height={"70px"}
                      pos={"absolute"}
                      top={"45px"}
                      left={"30px"}
                      src={
                        imagePreviewAvatar
                          ? imagePreviewAvatar
                          : profile?.avatar
                      }
                      border={"4px"}
                      borderColor={"#262626"}
                      onClick={handleAvatar}
                    />
                    <Input
                      type="file"
                      display={"none"}
                      onChange={handleImgAvatar}
                      name="avatar"
                      ref={inputRefAvatar}
                    />
                  </Box>

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
                        name="fullname"
                        variant="unstyled"
                        placeholder="Aris Kiflan"
                        onChange={handleInput}
                        value={formInput.fullname || ""}
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
                        onChange={handleInput}
                        value={formInput.username || ""}
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
                        onChange={handleInput}
                        value={formInput.bio || ""}
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
