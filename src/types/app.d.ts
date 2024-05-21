export interface IThread {
  id?: number;
  content?: string;
  image?: IThreadImage[];
  userId: number;
  threadId?: number;
  auhtor?: IUser;
  posted_at: string;
  _count: {
    replies: number;
    like: number;
  };
}

interface IThreadImage {
  id: number;
  image?: string;
}

export interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile?: IProfile;
  following?: IFollowers[];
  follower?: IFollowers[];
}

export interface IFollowers {
  followerId: number;
  followingId: number;
}

export interface IProfile {
  bio?: string;
  avatar?: string;
  cover?: string;
  user: IUser;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  email: string;
  fullname: string;
  username: string;
  password: string;
}

export interface IUserSearch {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile?: IProfileSearch;
  following?: IFollowing[];
  follower?: IFollower[];
}

export interface IFollowing {
  followingId: number;
  followerId: number;
}

export interface IFollower {
  followerId: number;
  followingId: number;
}

export interface IProfileSearch {
  bio?: string;
  avatar?: string;
}

export interface IFollow {
  username: string;
  id: number;
  fullname: string;
  profile: IProfile;
  isFollowed: boolean;
}
