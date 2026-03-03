"use client"

import { useState, useEffect } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { 
  SunIcon, 
  MoonIcon, 
  UserIcon, 
  SettingsIcon, 
  LogOutIcon,
  LayoutDashboardIcon,
  CreditCardIcon,
  HelpCircleIcon,
  BellIcon
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Navigation items
const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: CreditCardIcon,
  },
]

export default function AppLayout() {
  const location = useLocation()
  const { user, logout } = useAuth()

  // Dark Mode State with system preference detection
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        return savedTheme === "dark"
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return false
  })

  // Apply dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  const getPageTitle = () => {
    const routeTitles: Record<string, string> = {
      "/": "Dashboard",
      "/transactions": "Transactions",
    }
    return routeTitles[location.pathname] ?? "Dashboard"
  }

  const getUserInitials = () => {
    if (!user?.email) return "U"
    return user.email.substring(0, 2).toUpperCase()
  }

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Sidebar */}
      <Sidebar variant="floating" collapsible="icon">
        {/* Header with Logo */}
        <SidebarHeader className="border-b border-sidebar-border pb-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dark dark:from-primary-light dark:to-primary shadow-md">
              <span className="text-lg font-bold text-white">F</span>
            </div>
            <div className="flex flex-col overflow-hidden transition-opacity group-data-[collapsible=icon]:opacity-0">
              <span className="text-sm font-semibold text-sidebar-foreground">FinanceApp</span>
              <span className="text-xs text-sidebar-foreground/60">Personal Finance</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 px-3 text-xs font-semibold uppercase tracking-wider">
              Menu
            </SidebarGroupLabel>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.url
                
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      tooltip={item.title}
                      className={cn(
                        "relative group transition-all duration-200",
                        isActive && "bg-money/10 text-money font-medium dark:bg-primary/20 dark:text-primary-light"
                      )}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <Icon className={cn(
                          "h-4 w-4 transition-colors",
                          isActive && "text-money dark:text-primary-light"
                        )} />
                        <span className="flex-1">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>

          {/* Help Section */}
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

      <SidebarInset className="flex flex-col bg-background">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-6">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-sidebar-primary dark:hover:text-sidebar-primary transition-colors" />
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-sidebar-primary dark:bg-sidebar-primary" />
              <h1 className="text-xl font-semibold text-sidebar-primary dark:text-sidebar-primary">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-muted-foreground hover:text-sidebar-primary dark:hover:text-sidebar-primary hover:bg-sidebar-accent dark:hover:bg-sidebar-accent"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-sidebar-primary dark:bg-sidebar-primary animate-pulse" />
            </Button>

            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
              <SunIcon className={cn(
                "w-4 h-4 transition-colors",
                !isDark ? "text-yellow-500" : "text-muted-foreground"
              )} />
              <Switch
                id="dark-mode-toggle"
                checked={isDark}
                onCheckedChange={setIsDark}
                className="data-[state=checked]:bg-sidebar-primary dark:data-[state=checked]:bg-sidebar-primary"
              />
              <MoonIcon className={cn(
                "w-4 h-4 transition-colors",
                isDark ? "text-sidebar-primary dark:text-sidebar-primary" : "text-muted-foreground"
              )} />
            </div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-3 px-2 hover:bg-sidebar-accent dark:hover:bg-sidebar-accent transition-colors rounded-full"
                >
                  <Avatar className="h-8 w-8 border-2 border-sidebar-primary/20 dark:border-sidebar-primary/20">
                    <AvatarFallback className="bg-sidebar-accent text-sidebar-primary dark:bg-sidebar-accent dark:text-sidebar-primary text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground">
                      {user?.email?.split('@')[0] || 'User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent 
                align="end" 
                className="w-56 mt-2 p-1 bg-popover border-border"
              >
                <div className="px-2 py-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{user?.email?.split('@')[0] || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
                </div>
                
                <DropdownMenuItem className="flex items-center gap-2 mt-1 cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-primary dark:hover:bg-sidebar-accent dark:hover:text-sidebar-primary">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Profile</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-primary dark:hover:bg-sidebar-accent dark:hover:text-sidebar-primary">
                  <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-1 bg-border" />
                
                <DropdownMenuItem 
                  onClick={logout}
                  className="flex items-center gap-2 cursor-pointer text-sidebar-primary dark:text-sidebar-primary hover:bg-sidebar-accent dark:hover:bg-sidebar-accent"
                >
                  <LogOutIcon className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}