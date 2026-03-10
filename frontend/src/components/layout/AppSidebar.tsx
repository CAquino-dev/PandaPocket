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
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  LayoutDashboardIcon,
  CreditCardIcon,
  HelpCircleIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
  { title: "Transactions", url: "/transactions", icon: CreditCardIcon },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border pb-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dark shadow-md">
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
                      "relative group transition-all duration-200",
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
                      <span className="flex-1">{item.title}</span>
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

      <SidebarRail />
    </Sidebar>
  );
}
