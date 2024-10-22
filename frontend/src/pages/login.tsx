import { registrationSchemaLogin } from "@/schemas/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == typeof "string") {
      console.log("Nao tem token", token);
      router.push("/tasks");
    }
  });

  useEffect(() => {});
  const handleSubmitForm = async (data: RegistrationData) => {
    // console.log("Oi sou  Data", data);
    try {
      const response = await axios.post("http://localhost:3001/login", data);
      console.log("RESPOMNNSEEEesponse", response);
      localStorage.setItem("token", response.data.token);
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
