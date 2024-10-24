// src/context/types.ts
import { ITasks } from "../interface/TaskIterface";

export type taskContextType = {
  saveNewTask: (newTask: ITasks) => void;
  tasks: ITasks[];
  setTasks: (tasks: ITasks[]) => void;
  editTask: (taskUpdate: ITasks) => void;
  setTaskToEdit: (taskUpdate: ITasks | null) => void;
  taskToEdit: ITasks | null;
  removeTask: (task: ITasks) => void;
  handleAxiosError: (error: unknown) => void;
  errorMessage: string;
  theme: string;
  toggleTheme: () => void;
};

export const taskContextDefaultValue: taskContextType = {
  saveNewTask: () => {},
  tasks: [],
  setTasks: () => {},
  setTaskToEdit: () => {},
  editTask: () => {},
  taskToEdit: null,
  removeTask: () => {},
  handleAxiosError: () => {},
  errorMessage: "",
  theme: "",
  toggleTheme: () => {},
};

export type TaskStatus = "pending" | "completed" | "in Progress";
