export interface TaskInterface {
  id: number;
  //   createdAt: Date;
  name: string;
  status: ["pending", "completed", "in Progress"];
}
