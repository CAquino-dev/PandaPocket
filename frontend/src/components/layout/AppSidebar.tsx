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
  WalletMinimal,
  ChartPie,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { UserDropdown } from "./UserDropdown";
import redPanda from "../../assets/red-panda.png";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
  { title: "Transactions", url: "/transactions", icon: CreditCardIcon },
  { title: "Accounts", url: "/accounts", icon: WalletMinimal },
  { title: "Budgets", url: "/budgets", icon: ChartPie },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border pb-1">
        <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center">
            <img
              src={redPanda}
              alt="Red Panda"
              className="h-12 w-12 object-contain"
            />
          </div>

          <div className="flex flex-col overflow-hidden transition-opacity duration-200 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground whitespace-nowrap">
              PandaPocket
            </span>
            <span className="text-xs text-sidebar-foreground/60 whitespace-nowrap">
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
                          "h-4 w-4 flex-shrink-0",
                          isActive && "text-money dark:text-primary-light",
                        )}
                      />
                      <span className="truncate">{item.title}</span>
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
                  <HelpCircleIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Help & Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Profile Footer */}
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <div className="group-data-[collapsible=icon]:hidden">
          <UserDropdown user={user} onLogout={logout} />
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex justify-center">
          <UserDropdown user={user} onLogout={logout} iconOnly />
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
