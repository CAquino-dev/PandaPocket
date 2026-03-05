import { useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { UserDropdown } from "./UserDropdown";
import { ThemeToggle } from "./ThemeToggle";

export function AppNavbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const routeTitles: Record<string, string> = {
    "/": "Dashboard",
    "/transactions": "Transactions",
  };

  const pageTitle = routeTitles[location.pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="rounded-md p-2 transition-all duration-200 hover:bg-money/10 hover:text-money dark:hover:bg-primary/20 dark:hover:text-primary-light" />

        <div className="flex items-center gap-2">
          <div className="h-6 w-1 rounded-full bg-sidebar-primary" />
          <h1 className="text-xl font-semibold text-sidebar-primary">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative transition-all duration-200 hover:bg-money/10 hover:text-money dark:hover:bg-primary/20 dark:hover:text-primary-light"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-money animate-pulse dark:bg-primary-light" />
        </Button>

        <ThemeToggle />

        <UserDropdown user={user} onLogout={logout} />
      </div>
    </header>
  );
}
