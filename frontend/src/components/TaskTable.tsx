import { ITasks } from "../interface/TaskIterface";

interface TaskTableProps {
  tasks: ITasks[];
}

export default function TaskTable({ tasks }: TaskTableProps) {
  console.log("tasks Table", tasks);

  return (
    <>
      <h1>Lista de Tarefas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
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
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.status}</td>
                <td>
                  <button>editar</button>
                  <button>deletar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
