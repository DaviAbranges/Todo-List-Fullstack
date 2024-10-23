import { ITasks } from "@/interface/TaskIterface";
import { taskContextDefaultValue, taskContextType } from "@/types/types";
import { ReactNode, useState } from "react";
import { createContext, useContext } from "react";
import { AxiosError } from "axios";

const taskContext = createContext<taskContextType>(taskContextDefaultValue);

export function useTask() {
  return useContext(taskContext);
}

type Props = {
  children: ReactNode;
};

export function TaskProvider({ children }: Props) {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<ITasks | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const saveNewTask = (newTask: ITasks) => {
    setTasks([...tasks, newTask]);
  };

  const editTask = (updateTask: ITasks) => {
    setTasks(
      tasks.map((task) => (task.id === updateTask.id ? updateTask : task))
    );
    setTaskToEdit(null);
  };

  const removeTask = (taskToDelete: ITasks) => {
    const currentTasks = tasks.filter((task) => task.id !== taskToDelete.id);

    setTasks(currentTasks);
  };

  const handleAxiosError = (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage("Nenhuma resposta do servidor. Tente novamente.");
      }
    } else {
      setErrorMessage("Erro ao configurar requisição.");
    }
  };

  const value = {
    saveNewTask,
    tasks,
    setTasks,
    editTask,
    setTaskToEdit,
    taskToEdit,
    removeTask,
    handleAxiosError,
    errorMessage,
  };

  return (
    <>
      <taskContext.Provider value={value}>{children}</taskContext.Provider>
    </>
  );
}
