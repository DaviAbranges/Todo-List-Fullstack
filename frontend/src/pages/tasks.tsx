import TaskTable from "@/components/TaskTable";
import { useTask } from "@/context/TaskContext";
// import { ITasks } from "@/interface/TaskIterface";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CreateTask from "../components/createTask";
import ThemeToggleButton from "@/components/themeToggkeButton";

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
    <>
      <CreateTask />
      <ThemeToggleButton />
      <TaskTable tasks={tasks} />
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </>
  );
}
