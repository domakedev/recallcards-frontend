export type User = {
  email: string;
  password: string;
};

export type UserDB = {
  id: number;
  email: string;
  authenticated: boolean;
};

//extend UserDB type
export type UserDBExtended = UserDB & {
  name: string;
  roles: string[];
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type UserAuthDB = {
  id: number;
  name: string | null;
  email: string  | null;
  password: string;
  roles: string[];
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};