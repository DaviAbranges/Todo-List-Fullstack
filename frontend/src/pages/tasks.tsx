import TaskTable from "@/components/TaskTable";
import { useTask } from "@/context/TaskContext";
// import { ITasks } from "@/interface/TaskIterface";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Tasks() {
  const router = useRouter();
  const { tasks, setTasks } = useTask();
  const getAllTasks = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:3001/tasks", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log("CHEGAMOS NO GET ALL", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("erro requisitar", error);
    }
  };
  useEffect(() => {
    const authorizationUser = async () => {
      const token = localStorage.getItem("token");

      console.log("TASKSSSS", token);

      if (!token) {
        router.push("/register");
      } else {
        await getAllTasks(token);
        console.log("ELSEE");
      }
    };

    authorizationUser();
  }, [router, getAllTasks]);

  console.log("TASKS", tasks[0]);

  return <TaskTable tasks={tasks} />;
}
