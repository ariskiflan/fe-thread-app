import { Box, Image, Text } from "@chakra-ui/react";
import { RiHome7Line, RiUserSearchLine } from "react-icons/ri";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import Logo from "../assets/image/logo-circle.png";

import ModalPost from "./ModalPost";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { SET_LOGOUT } from "../store/slice/auth";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(SET_LOGOUT());
    navigate("/auth/login");
  };

  const profile = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <Box
        width={"270px"}
        height={"100vh"}
        position={"fixed"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-between"}
        p={"30px"}
      >
        <Box>
          <Image width={"150px"} height={"40px"} src={Logo} />

          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"30px"}
            my={"50px"}
          >
            <Box
              display={"flex"}
              gap={"10px"}
              _hover={{
                transform: "translateX(10px)",
                transition: "0.3s",
              }}
            >
              <RiHome7Line size={"24px"} color={"#fff"} />
              <Link to={"/"}>
                <Text
                  size={"18px"}
                  fontWeight={"500"}
                  color={"#fff"}
                  cursor={"pointer"}
                >
                  Home
                </Text>
              </Link>
            </Box>

            <Box
              display={"flex"}
              gap={"10px"}
              _hover={{
                transform: "translateX(10px)",
                transition: "0.3s",
              }}
            >
              <RiUserSearchLine size={"24px"} color={"#fff"} />
              <Link to={"/search"}>
                <Text
                  size={"18px"}
                  fontWeight={"500"}
                  color={"#fff"}
                  cursor={"pointer"}
                >
                  Search
                </Text>
              </Link>
            </Box>

            <Box
              display={"flex"}
              gap={"10px"}
              _hover={{
                transform: "translateX(10px)",
                transition: "0.3s",
              }}
            >
              <FaRegHeart size={"24px"} color={"#fff"} />
              <Text
                size={"18px"}
                fontWeight={"500"}
                color={"#fff"}
                cursor={"pointer"}
              >
                Follow
              </Text>
            </Box>

            <Box
              display={"flex"}
              gap={"10px"}
              _hover={{
                transform: "translateX(10px)",
                transition: "0.3s",
              }}
            >
              <FaRegUserCircle size={"24px"} color={"#fff"} />
              <Link to={`/profilepage/${profile?.user.id}`}>
                <Text
                  size={"18px"}
                  fontWeight={"500"}
                  color={"#fff"}
                  cursor={"pointer"}
                >
                  Profile
                </Text>
              </Link>
            </Box>
          </Box>

          <ModalPost />
        </Box>

        <Box
          display={"flex"}
          gap={"10px"}
          _hover={{
            transform: "translateX(10px)",
            transition: "0.3s",
          }}
        >
          <TbLogout2 size={"24px"} color={"#fff"} />
          <Text
            onClick={handleLogout}
            size={"18px"}
            fontWeight={"500"}
            color={"#fff"}
            cursor={"pointer"}
          >
            Logout
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;
