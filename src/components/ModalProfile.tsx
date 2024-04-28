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
                      src={imagePreviewCover ? imagePreviewCover : ""}
                      rounded={"10px"}
                      onClick={handleCover}
                      objectFit={"cover"}
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
                      objectFit={"cover"}
                      src={
                        imagePreviewAvatar
                          ? imagePreviewAvatar
                          : "data:image/png;base64,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"
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
