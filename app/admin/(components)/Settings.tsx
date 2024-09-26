"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  X as CloseIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface AdminSettingsPageProps {
  onClose: () => void;
}

const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto"
    >
      <Card className="w-full">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <CloseIcon className="h-6 w-6" />
          </Button>
          <CardTitle className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
            Admin Settings
          </CardTitle>
          <CardDescription>
            Manage your account and application preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="help">Help</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <User className="w-16 h-16 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-semibold">Profile Picture</h3>
                    <p className="text-sm text-gray-500">
                      Click to upload a new image
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    <Label htmlFor="notifications">Enable Notifications</Label>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Receive notifications about new appointments, messages, and
                  system updates.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="security" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">
                    Two-Factor Authentication
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account by enabling
                  two-factor authentication.
                </p>
                <Button>Enable 2FA</Button>
              </div>
            </TabsContent>
            <TabsContent value="appearance" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <Switch
                    id="darkMode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Toggle between light and dark mode for the application
                  interface.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="help" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Need Assistance?</h3>
                </div>
                <p className="text-sm text-gray-500">
                  If you need help or have any questions, our support team is
                  here to assist you.
                </p>
                <Button>Contact Support</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button className="w-full sm:w-auto">Save Changes</Button>
        </CardFooter>
      </Card>
      <div className="mt-8 text-center">
        <Button
          variant="ghost"
          className="text-red-600 hover:text-red-800 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminSettingsPage;
