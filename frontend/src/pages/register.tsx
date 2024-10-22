import { registrationSchema } from "@/schemas/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { z } from "zod";

type RegistrationData = z.infer<typeof registrationSchema>;
export default function Register() {
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

  const routes = useRouter();
  const handleSubmitForm = async (data: RegistrationData) => {
    // console.log("Oi sou  Data", data);

    try {
      const response = await axios.post("http://localhost:3001/register", data);
      // console.log("Sucesso", response.data.token);

      const token = response.data.token;
      // console.log(token);

      if (token) {
        localStorage.setItem("token", token);
        routes.push("/tasks");
      }
    } catch (error) {
      console.error("Erro ao registrar:", "data", data, "error", error);
    }

    // console.log(data);
  };
  return (
    <>
      <h1> REGISTROS </h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <input type="text" placeholder="Name" {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
}
