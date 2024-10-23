import { taskSchema } from "@/schemas/taskSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import axios from "axios";
import { useTask } from "@/context/TaskContext";
import { useEffect } from "react";

type RegistrationTask = z.infer<typeof taskSchema>;

export default function CreateTask() {
  const router = useRouter();
  const { saveNewTask, taskToEdit, editTask, handleAxiosError, errorMessage } =
    useTask();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegistrationTask>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (taskToEdit) {
      setValue("name", taskToEdit.name);
      setValue("status", taskToEdit.status);
    } else {
      reset();
    }
  }, [setValue, reset, taskToEdit]);

  const handleSubmitForm = async (data: RegistrationTask) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }
      if (taskToEdit) {
        const response = await axios.put(
          `http://localhost:3001/tasks/${taskToEdit.id}`,
          data,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        editTask(response.data);
      } else {
        console.log(data);

        const response = await axios.post("http://localhost:3001/tasks", data, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        saveNewTask(response.data);
        reset();
      }
    } catch (error) {
      handleAxiosError(error);
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
          <option value="pendente">pendente</option>
          <option value="concluída">concluída</option>
          <option value="em progresso">em progresso</option>
        </select>
        <button type="submit">
          {taskToEdit ? "Atualizar Tarefa" : "Criar Tarefa"}
        </button>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </form>

      <button onClick={() => localStorage.removeItem("token")}>Logout</button>
    </>
  );
}
