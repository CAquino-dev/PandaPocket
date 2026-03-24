import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-300",
        "hover:scale-105 active:scale-95",
        // Light mode styles
        "bg-money/10 text-money",
        "hover:bg-money/20",
        // Dark mode styles
        "dark:bg-primary/20 dark:text-primary-light",
        "dark:hover:bg-primary/30",
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Animated icon container */}
      <div className="relative w-4 h-4">
        <SunIcon
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300",
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100",
          )}
        />
        <MoonIcon
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300",
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0",
          )}
        />
      </div>

      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}
