export type User = {
  email: string;
  password: string;
};

export type UserDB = {
  id: number;
  email: string;
  authenticated: boolean;
};
