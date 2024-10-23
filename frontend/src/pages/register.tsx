import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { registrationSchema } from "@/schemas/registrationSchema"; // Esquema de validação
import { useTask } from "@/context/TaskContext";
import ThemeToggleButton from "../components/themeToggkeButton";
type RegistrationData = z.infer<typeof registrationSchema>;

export default function Register() {
  const { handleAxiosError, errorMessage } = useTask();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegistrationData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  const router = useRouter();

  const handleSubmitForm = async (data: RegistrationData) => {
    try {
      const response = await axios.post("http://localhost:3001/register", data);
      localStorage.setItem("token", response.data.token);
      router.push("/tasks");
    } catch (error) {
      handleAxiosError(error);
      console.log("kaods", errorMessage);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-background dark:bg-dark-background ">
      {/* Botão de alternância de tema */}
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>

      <div className="flex flex-row w-full max-w-4xl bg-white dark:bg-slate-700 shadow-2xl rounded-3xl overflow-hidden">
        <div
          className="w-2/3 p-8 bg-white text-fontColor dark:bg-slate-700 dark:text-dark-fontColor flex flex-col 
        justify-center rounded-2xl"
        >
          <h1 className="text-4xl font-bold mb-4">Olá, Amigo!</h1>
          <p className="mb-8 text-black dark:text-dark-fontColor">
            Crie sua conta e comece a gerenciar suas tarefas de forma simples e
            eficiente. Estamos felizes em ter você aqui!
          </p>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nome"
                {...register("username")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
              />
              {errors.username && (
                <p className="text-red-700 dark:text-purple-500 mt-2">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
              />
              {errors.email && (
                <p className="text-red-700 mt-2 dark:text-purple-500 ">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Senha"
                {...register("password")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
              />
              {errors.password && (
                <p className="text-red-700 mt-2 dark:text-purple-500 ">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-800 dark:bg-purple-700 dark:hover:bg-purple-900 hover:bg-purple-900 text-white dark:bg-purple-700 font-bold py-3 rounded-lg transition duration-300"
            >
              Registrar
            </button>
            {errorMessage && (
              <p className="text-red-300 mt-4 text-center">{errorMessage}</p>
            )}
          </form>
          <p className="mt-4 text-center text-black dark:text-white">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-purple-700 hover:underline">
              Faça login
            </Link>
          </p>
        </div>

        {/* Seção da direita (informativa) */}
        <div
          className="w-1/2 p-8 flex flex-col justify-center bg-secondColor
        dark:bg-gray-900"
        >
          <h1 className="text-5xl font-bold mb-4 text-white dark:text-purple-800 text-center">
            Bem-vindo !
          </h1>
          <p className="text-center dark:text-white">
            <br />
            <br />
            Junte-se a nós e organize suas tarefas de maneira fácil e intuitiva.
            Estamos prontos para ajudá-lo a alcançar sua produtividade máxima!
          </p>
        </div>
      </div>
    </div>
  );
}
