export interface ITasks {
  id: number;
  //   createdAt: Date;
  name: string;
  status: "pending" | "completed" | "in Progress";
  createdAt: Date;
}

// export interface ITasks {
//   id?: number;
//   status: string;
//   name: string;
//   userId: number;
// }
