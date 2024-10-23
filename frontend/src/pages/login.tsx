import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { registrationSchemaLogin } from "@/schemas/registrationSchema"; // Esquema de validação
import { useTask } from "@/context/TaskContext";

type RegistrationData = z.infer<typeof registrationSchemaLogin>;

export default function Login() {
  const { handleAxiosError, errorMessage } = useTask();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegistrationData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(registrationSchemaLogin),
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/tasks");
    }
  }, [router]);

  const handleSubmitForm = async (data: RegistrationData) => {
    try {
      const response = await axios.post("http://localhost:3001/login", data);
      localStorage.setItem("token", response.data.token);
      router.push("/tasks");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-gray-300 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-fucshia-900">Login</h1>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
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
            Sign In
          </button>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </form>
        <p className="mt-4 text-center">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-purple-600 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
