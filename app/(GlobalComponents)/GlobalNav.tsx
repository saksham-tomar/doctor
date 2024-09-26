"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bell,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  X,
  LayoutDashboard,
  Calendar,
  MessageSquare,
  LogOut,
} from "lucide-react";

export default function GlobalNavbar() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // Add logic here to actually change the theme
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard" },
    { icon: Calendar, text: "Appointments" },
    { icon: MessageSquare, text: "Messages" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 lg:hidden"
                onClick={toggleMobileMenu}
              >
                <Menu className="h-6 w-6" />
              </Button>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <span className="text-2xl font-bold text-indigo-600">
                  eHealth
                </span>
              )}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-20" />
                </>
              ) : (
                <>
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.text}</span>
                    </Button>
                  ))}
                </>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </>
              ) : (
                <>
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === "light" ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </Button>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Notifications
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            You have 3 unread messages.
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <Avatar>
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="User"
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-br from-indigo-600 via-blue-700 to-teal-500 shadow-lg lg:hidden overflow-hidden"
          >
            <div className="p-4 h-full flex flex-col">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={toggleMobileMenu}
              >
                <X className="h-6 w-6" />
              </Button>
              <div className="mt-16 flex-grow">
                <nav className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/20"
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.text}
                      </Button>
                    </motion.div>
                  ))}
                </nav>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-auto"
              >
                <Button
                  variant="outline"
                  className="w-full justify-start text-white bg-white/10 hover:bg-white/30 transition-colors duration-200"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Log out
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
