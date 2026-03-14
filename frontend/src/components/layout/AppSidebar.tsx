import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  LayoutDashboardIcon,
  CreditCardIcon,
  HelpCircleIcon,
  UserIcon,
  LogOutIcon,
  SettingsIcon,
  ChevronUpIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserDropdown } from "./UserDropdown";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
  { title: "Transactions", url: "/transactions", icon: CreditCardIcon },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border pb-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-md">
            <span className="text-lg font-bold text-white">F</span>
          </div>

          <div className="flex flex-col overflow-hidden transition-opacity group-data-[collapsible=icon]:opacity-0">
            <span className="text-sm font-semibold text-sidebar-foreground">
              FinanceApp
            </span>
            <span className="text-xs text-sidebar-foreground/60">
              Personal Finance
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70">
            Menu
          </SidebarGroupLabel>

          <SidebarMenu>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.url;

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className={cn(
                      "relative transition-all duration-200",
                      isActive &&
                        "bg-money/10 text-money font-medium dark:bg-primary/20 dark:text-primary-light",
                    )}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          isActive && "text-money dark:text-primary-light",
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Help */}
        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Help & Support">
                <Link to="/help" className="flex items-center gap-3">
                  <HelpCircleIcon className="h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Profile Footer - Enhanced Dropdown */}
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <UserDropdown user={user} onLogout={logout} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
