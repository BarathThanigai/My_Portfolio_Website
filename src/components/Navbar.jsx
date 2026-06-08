import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="fixed w-full top-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="font-semibold text-lg">Barath</h1>

        <div className="flex items-center gap-6">

          <div className="hidden md:flex gap-5 text-sm text-gray-600 dark:text-gray-300">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 border rounded-md border-gray-300 dark:border-white/20"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

        </div>
      </div>
    </nav>
  );
}