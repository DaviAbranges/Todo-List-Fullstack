import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { registrationSchema } from "@/schemas/registrationSchema"; // Esquema de validação
import { useTask } from "@/context/TaskContext";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-4">Registrar</h1>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <input
            type="text"
            placeholder="Name"
            {...register("username")}
            className="w-full p-2 mb-3 border rounded"
          />
          {errors.username && (
            <p className="text-red-600">{errors.username.message}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-2 mb-3 border rounded"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="Senha"
            {...register("password")}
            className="w-full p-2 mb-3 border rounded"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded"
          >
            Register
          </button>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </form>
        <p className="mt-4 text-center">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-purple-800 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
