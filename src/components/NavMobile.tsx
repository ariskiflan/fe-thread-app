import { FaPlusCircle } from "react-icons/fa";
import { RiHome7Line, RiUserSearchLine } from "react-icons/ri";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RootState, useAppSelector } from "../store";
import { Box } from "@chakra-ui/react";

const NavMobile = () => {
  const profile = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div>
      {" "}
      <Box
        display={{ base: "flex", md: "none" }}
        width={"100%"}
        bg={"#04A51E"}
        h={"50px"}
        p={"10px"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Link to={"/"}>
          {" "}
          <RiHome7Line size={"24px"} color={"#fff"} />
        </Link>

        <Link to={"/search"}>
          <RiUserSearchLine size={"24px"} color={"#fff"} />
        </Link>

        <FaPlusCircle size={"24px"} color={"#fff"} />

        <Link to={"/follow"}>
          <FaRegHeart size={"24px"} color={"#fff"} />
        </Link>

        <Link to={`/myprofilepage/${profile?.user.id}`}>
          <FaRegUserCircle size={"24px"} color={"#fff"} />
        </Link>
      </Box>
    </div>
  );
};

export default NavMobile;
