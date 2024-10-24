import { useTask } from "@/context/TaskContext";
import { ITasks } from "../interface/TaskIterface";
import { useRouter } from "next/router";
import axios from "axios";

interface TaskTableProps {
  tasks: ITasks[];
}

export default function TaskTable({ tasks }: TaskTableProps) {
  // console.log("tasks Table", tasks);
  const router = useRouter();
  const { setTaskToEdit, removeTask } = useTask();
  const handleRemoveTask = async (data: ITasks) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }

    const response = await axios.delete(
      `http://localhost:3001/tasks/${data.id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    removeTask(response.data);
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="py-2 px-4 border-b text-left text-purple-700">
              Nome
            </th>
            <th className="py-2 px-4 border-b text-left text-purple-700">
              Status
            </th>
            <th className="py-2 px-4 border-b text-center text-purple-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                Nenhuma tarefa encontrada.
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr
                key={task.id}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <td className="py-2 px-4 border-b text-left dark:text-white">
                  {task.name}
                </td>
                <td className="py-2 px-4 border-b text-left dark:text-white">
                  {task.status}
                </td>
                <td className="py-2 px-4 border-b flex gap-2 justify-center">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => setTaskToEdit(task)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleRemoveTask(task)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
