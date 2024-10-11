import { ITasks } from "./ITasks";

export interface ITaskModel {
  findAll(userId: number): Promise<ITasks[]>;
}
