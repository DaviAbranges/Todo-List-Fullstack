import { useTask } from "@/context/TaskContext"; // Importar o contexto de tarefas
import { FiSun, FiMoon } from "react-icons/fi"; // Importar os ícones

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTask();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-500 rounded flex items-center justify-center"
    >
      {theme === "light" ? (
        <>
          <FiMoon size="26" className="text-gray-800" /> {/* Ícone de lua */}
        </>
      ) : (
        <>
          <FiSun size="26" className="text-yellow-400" /> {/* Ícone de sol */}
        </>
      )}
    </button>
  );
}
