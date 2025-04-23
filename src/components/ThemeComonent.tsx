import { useEffect } from "react";
import { Button } from "./ui/button";
import { useThemeStore } from "@/store/form-store";
import { Sun, Moon } from "lucide-react"; 

export default function ThemedComponent() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed top-4 right-4">
      <Button
        onClick={toggleTheme}
        className={`transition-colors duration-300 flex items-center gap-2 ${
          theme === "dark" ? "bg-black text-white" : "bg-black text-gray-100"
        }`}
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        {theme === "dark" ? " Light Mode" : "Dark Mode"}
      </Button>
    </div>
  );
}
