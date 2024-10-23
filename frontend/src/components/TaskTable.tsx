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
      <h1>Lista de Tarefas</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
          </tr>
        </thead>
        {/* if tasks.length for igual a zero então apece um botao grande crie uma nova task */}
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={4}>
                Nenhuma tarefa encontrada.{" "}
                <button>Criar uma nova tarefa</button>
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => setTaskToEdit(task)}>editar</button>
                  <button onClick={() => handleRemoveTask(task)}>
                    deletar
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
