import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { UserIcon, SettingsIcon, LogOutIcon } from "lucide-react";

interface Props {
  user: any;
  onLogout: () => void;
}

export function UserDropdown({ user, onLogout }: Props) {
  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.substring(0, 2).toUpperCase();
  };

  const username = user?.email?.split("@")[0] || "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 rounded-full px-2 transition-all duration-200 hover:bg-money/10 hover:text-money dark:hover:bg-primary/20 dark:hover:text-primary-light"
        >
          <Avatar className="h-8 w-8 border-2 border-money/20 dark:border-primary-light/20">
            <AvatarFallback className="bg-money/10 text-xs font-medium text-money dark:bg-primary/20 dark:text-primary-light">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>

          <div className="hidden flex-col items-start lg:flex">
            <span className="text-sm font-medium">{username}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="mt-2 w-56 border-border bg-popover p-1"
      >
        <div className="border-b border-border px-2 py-3">
          <p className="text-sm font-medium">{username}</p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>
        <DropdownMenuItem className="flex items-center gap-2 transition-all duration-200 data-highlighted:bg-money/10 data-highlighted:text-money dark:data-highlighted:bg-primary/20 dark:data-highlighted:text-primary-light">
          <UserIcon className="h-4 w-4" />
          <span className="text-sm">Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 transition-all duration-200 data-highlighted:bg-money/10 data-highlighted:text-money dark:data-highlighted:bg-primary/20 dark:data-highlighted:text-primary-light">
          <SettingsIcon className="h-4 w-4" />
          <span className="text-sm">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center gap-2 text-expense transition-all duration-200 data-highlighted:bg-expense/10 data-highlighted:text-expense-dark dark:text-expense-light dark:data-highlighted:bg-expense/20"
        >
          <LogOutIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
