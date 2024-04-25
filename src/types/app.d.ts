export interface IThread {
  id?: number;
  content?: string;
  image?: IThread[];
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
  image?: string;
}

export interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile?: IProfile;
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
}

export interface IFollower {
  followerId: number;
}

export interface IProfileSearch {
  bio?: string;
  avatar?: string;
}
