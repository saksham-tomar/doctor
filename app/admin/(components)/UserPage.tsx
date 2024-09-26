"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  UsersIcon,
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  UserIcon,
  Stethoscope,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

// Expanded user data for pagination example
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    type: "patient",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    type: "doctor",
    status: "active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    type: "patient",
    status: "inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    type: "doctor",
    status: "active",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    type: "patient",
    status: "active",
  },
  {
    id: 6,
    name: "Eva Wilson",
    email: "eva@example.com",
    type: "doctor",
    status: "inactive",
  },
  {
    id: 7,
    name: "Frank Miller",
    email: "frank@example.com",
    type: "patient",
    status: "active",
  },
  {
    id: 8,
    name: "Grace Lee",
    email: "grace@example.com",
    type: "doctor",
    status: "active",
  },
  {
    id: 9,
    name: "Henry Taylor",
    email: "henry@example.com",
    type: "patient",
    status: "inactive",
  },
  {
    id: 10,
    name: "Ivy Chen",
    email: "ivy@example.com",
    type: "doctor",
    status: "active",
  },
  {
    id: 11,
    name: "Jack Brown",
    email: "jack@example.com",
    type: "patient",
    status: "active",
  },
  {
    id: 12,
    name: "Karen White",
    email: "karen@example.com",
    type: "doctor",
    status: "inactive",
  },
  // Add more users as needed
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTab === "all" || user.type === selectedTab)
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const router = useRouter();
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const doctorForm = () => {
    router.push("/doctor/doctorform");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <motion.div
        initial="initial"
        animate="animate"
        className="max-w-7xl mx-auto space-y-8"
      >
        <motion.div {...fadeInUp} className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Users
          </h1>
          <Button onClick={doctorForm}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add User
          </Button>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList>
                    <TabsTrigger value="all">All Users</TabsTrigger>
                    <TabsTrigger value="patient">Patients</TabsTrigger>
                    <TabsTrigger value="doctor">Doctors</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {currentUsers.map((user) => (
                        <motion.tr
                          key={user.id}
                          {...fadeInUp}
                          className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage
                                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                                  alt={user.name}
                                />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.type === "patient"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {user.type === "patient" ? (
                                <UserIcon className="w-3 h-3 mr-1" />
                              ) : (
                                <Stethoscope className="w-3 h-3 mr-1" />
                              )}
                              {user.type.charAt(0).toUpperCase() +
                                user.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <EditIcon className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit User</DialogTitle>
                                    <DialogDescription>
                                      Make changes to the user&apos;s
                                      information here.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {/* Add form fields for editing user */}
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm">
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastUser, filteredUsers.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredUsers.length}</span>{" "}
                  results
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </Button>
                  {Array.from(Array(totalPages).keys()).map((number) => (
                    <Button
                      key={number + 1}
                      variant={
                        currentPage === number + 1 ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
