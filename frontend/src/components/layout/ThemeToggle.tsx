import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
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

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-money/10 px-3 py-1.5 transition-colors dark:bg-primary/20">
      <SunIcon
        className={cn(
          "h-4 w-4",
          !isDark ? "text-money" : "text-muted-foreground",
        )}
      />

      <Switch
        checked={isDark}
        onCheckedChange={setIsDark}
        className="data-[state=checked]:bg-money dark:data-[state=checked]:bg-primary-light"
      />

      <MoonIcon
        className={cn(
          "h-4 w-4",
          isDark ? "text-primary-light" : "text-muted-foreground",
        )}
      />
    </div>
  );
}
