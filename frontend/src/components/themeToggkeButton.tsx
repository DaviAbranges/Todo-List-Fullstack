import { useTask } from "@/context/TaskContext"; // Importar o contexto de tarefas
import { FiSun, FiMoon } from "react-icons/fi"; // Importar os ícones

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTask();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
    >
      {theme === "light" ? (
        <FiMoon
          size="26"
          className="text-gray-800 dark:text-white transition-colors duration-300"
        />
      ) : (
        <FiSun
          size="26"
          className="text-yellow-400 dark:text-yellow-500 transition-colors duration-300"
        />
      )}
    </button>
  );
}
