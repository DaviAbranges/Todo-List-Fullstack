import TaskTable from "@/components/TaskTable";
import { useTask } from "@/context/TaskContext";
// import { ITasks } from "@/interface/TaskIterface";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CreateTask from "../components/createTask";
import ThemeToggleButton from "@/components/themeToggkeButton";
import Logout from "@/components/logoutButton";

export default function Tasks() {
  const router = useRouter();
  const { tasks, setTasks, handleAxiosError, errorMessage } = useTask();
  const getAllTasks = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:3001/tasks", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      // console.log("CHEGAMOS NO GET ALL", response.data);
      setTasks(response.data);
    } catch (error) {
      handleAxiosError(error);
    }
  };
  useEffect(() => {
    const authorizationUser = async () => {
      const token = localStorage.getItem("token");

      // console.log("TASKSSSS", token);

      if (!token) {
        router.push("/register");
      } else {
        await getAllTasks(token);
        // console.log("ELSEE");
      }
    };

    authorizationUser();
  }, [router, getAllTasks]);

  // console.log("TASKS", tasks[0]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-dark-background relative">
      {/* Botão de alternância de tema no canto superior direito */}
      <div className="absolute top-4 right-4">
        <Logout />
        <ThemeToggleButton />
      </div>
      <CreateTask />
      <div className="mt-8 w-full max-w-4xl p-4 bg-white dark:bg-slate-700 shadow-lg rounded-lg">
        <TaskTable tasks={tasks} />
        {errorMessage && (
          <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
