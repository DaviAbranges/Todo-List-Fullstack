// src/context/types.ts
import { ITasks } from "../interface/TaskIterface";

export type taskContextType = {
  saveNewTask: (newTask: ITasks) => void;
  tasks: ITasks[];
  setTasks: (tasks: ITasks[]) => void;
};

export const taskContextDefaultValue: taskContextType = {
  saveNewTask: () => {},
  tasks: [],
  setTasks: () => {},
};
