import { taskSchema } from "@/schemas/taskSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import axios from "axios";
import { useTask } from "@/context/TaskContext";

type RegistrationTask = z.infer<typeof taskSchema>;

export default function CreateTask() {
  const router = useRouter();
  const { saveNewTask } = useTask();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationTask>({
    resolver: zodResolver(taskSchema),
  });

  const handleSubmitForm = async (data: RegistrationTask) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      const response = await axios.post("http://localhost:3001/tasks", data, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      saveNewTask(response.data);
      reset();
    } catch (error) {
      console.error("Erro ao criar tarefa", error);
    }
  };
  return (
    <>
      {/* <h1>CreateTask</h1>; */}
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <input type="text" placeholder="Nome da Tarefa" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
        <select {...register("status")}>
          {errors.status && <span>{errors.status.message}</span>}
          <option value="">pendente</option>
          <option value="">concluída</option>
          <option value="">em progresso</option>
        </select>
        <button type="submit">Criar Tarefa</button>
      </form>
    </>
  );
}
