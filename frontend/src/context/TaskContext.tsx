import { ITasks } from "@/interface/TaskIterface";
import { taskContextDefaultValue, taskContextType } from "@/types/types";
import { ReactNode, useState } from "react";
import { createContext, useContext } from "react";

const taskContext = createContext<taskContextType>(taskContextDefaultValue);

export function useTask() {
  return useContext(taskContext);
}

type Props = {
  children: ReactNode;
};

export function TaskProvider({ children }: Props) {
  const [tasks, setTasks] = useState<ITasks[]>([]);

  const saveNewTask = (newTask: ITasks) => {
    setTasks([...tasks, newTask]);
  };
  const value = {
    saveNewTask,
    tasks,
    setTasks,
  };

  return (
    <>
      <taskContext.Provider value={value}>{children}</taskContext.Provider>
    </>
  );
}
