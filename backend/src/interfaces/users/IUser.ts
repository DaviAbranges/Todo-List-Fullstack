export interface IUsers {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type UserWithToken = {
  token: string;
  user: IUsers;
};
