import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { createLike, getCurrentLike } from "../libs/api/call/like";

interface ILikeButtonProps {
  threadId: number;
  callback?: () => void;
}
const Like: React.FC<ILikeButtonProps> = ({ threadId, callback }) => {
  const [liked, setliked] = useState(false);
  //   const { user } = useAppSelector((state) => state.auth);

  const getLike = async () => {
    try {
      const res = await getCurrentLike(threadId);

      setliked(res.data.data.like === null ? false : true);

      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      await createLike(threadId);

      await getLike();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLike();
  }, []);

  return (
    <div>
      <Text onClick={() => handleLike()} cursor={"pointer"}>
        {liked ? (
          <FaHeart size={"20px"} color={"red"} />
        ) : (
          <FaRegHeart size={"20px"} color={"#909090"} />
        )}
      </Text>
    </div>
  );
};

export default Like;
