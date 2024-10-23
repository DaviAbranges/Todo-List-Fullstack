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
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="w-full max-w-md mx-auto bg-white dark:bg-slate-700 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <h1 className="text-xl font-bold text-center mb-6 dark:text-white">
            Crei uma nova Tarefa
          </h1>
          <input
            type="text"
            placeholder="Nome da Tarefa"
            {...register("name")}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400"
          />
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <select
            {...register("status")}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400"
          >
            <option value="pendente">Pendente</option>
            <option value="concluída">Concluída</option>
            <option value="em progresso">Em Progresso</option>
          </select>
          {errors.status && (
            <span className="text-red-600">{errors.status.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition-colors"
        >
          {taskToEdit ? "Atualizar Tarefa" : "Criar Tarefa"}
        </button>
        {errorMessage && (
          <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
        )}
      </form>
    </>
  );
}
