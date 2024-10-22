// src/pages/_app.tsx
import { TaskProvider } from "@/context/TaskContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </>
  );
}
