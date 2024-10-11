import { ITasks } from "./ITasks";

export interface ITaskModel {
  findAll(userId: number): Promise<ITasks[]>;
  create(data: ITasks): Promise<ITasks>;
}
