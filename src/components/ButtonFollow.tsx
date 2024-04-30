import { Button } from "@chakra-ui/react";
import { createFollow, getFollower } from "../libs/api/call/follow";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getProfileAsync } from "../store/async/auth";

interface IButtonFollow {
  followingId?: number;
  isFollowed?: boolean;
  callback?: () => Promise<void>;
}

const ButtonFollow: React.FC<IButtonFollow> = ({ followingId, callback }) => {
  const [isLoading, setIsloading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [follow, setFollow] = useState<boolean>(false);
  console.log(follow);

  const profile = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const handleFollow = async () => {
    setIsloading(true);

    try {
      await createFollow(Number(followingId));

      const token = localStorage.getItem("token");

      if (callback) callback();

      await dispatch(getProfileAsync(token!));

      setIsloading(false);
      await getFollowers();
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = async () => {
    try {
      const resFollower = await getFollower();
      setFollow(resFollower.data.data === null ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowers();
  }, []);

  useEffect(() => {
    const checkIsFollowing = () => {
      try {
        const following = profile?.user?.follower?.find(
          (following) => following.followingId === followingId
        );

        setIsFollowing(following ? true : false);
      } catch (error) {
        console.log(error);
      }
    };

    checkIsFollowing();
  }, [profile, followingId]);

  return (
    <div>
      <Button
        onClick={handleFollow}
        px={"2px"}
        py={"3px"}
        rounded={"full"}
        width={"106px"}
        height={"30px"}
        fontSize={"12px"}
        bg={"#3f3f3f"}
        color={isFollowing ? "#909090" : "#fff"}
        borderColor={isFollowing ? "#909090" : "#fff"}
        border={"1px"}
        _hover={{ bg: "#fff", color: "#3f3f3f" }}
        disabled={isLoading}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default ButtonFollow;
