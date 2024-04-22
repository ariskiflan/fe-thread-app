export interface IThread {
  id?: number;
  content?: string;
  image?: IThread[];
  userId: number;
  threadId?: number;
  auhtor?: IUser;
  posted_at: string;
}

interface IThreadImage {
  image?: string;
}

export interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  // profile?: IProfile;
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
