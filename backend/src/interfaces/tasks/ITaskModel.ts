import { ITasks } from "./ITasks";

export interface ITaskModel {
  findAll(userId: number): Promise<ITasks[]>;
  create(data: ITasks): Promise<ITasks>;
  findById(id: number, userId: number): Promise<ITasks | null>;
  update(
    data: { name: string; status: string },
    id: number,
    userId: number
  ): Promise<ITasks | null>;
  delete(id: number, userId: number): Promise<void>;
}
