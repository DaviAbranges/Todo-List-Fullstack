// pages/index.tsx
import React, { useEffect } from "react";
import Register from "./register";
import { useRouter } from "next/router";

export default function IndexPages() {
  const router = useRouter();
  useEffect(() => {
    router.push("/register");
  });
  return <Register />;
}
