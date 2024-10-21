import { registrationSchemaLogin } from "@/schemas/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegistrationData = z.infer<typeof registrationSchemaLogin>;
export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegistrationData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(registrationSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleSubmitForm = async (data: RegistrationData) => {
    // console.log("Oi sou  Data", data);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3001/login", data, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Sucesso", token, "response", response);
      router.push("/tasks");
    } catch (error) {
      console.error("Erro ao registrar:", "data", data, "error", error);
    }

    // console.log(data);
  };
  return (
    <>
      <h1> LOGIN </h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}
