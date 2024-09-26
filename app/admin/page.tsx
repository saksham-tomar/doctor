"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, X as CloseIcon } from "lucide-react";
import AdminSettingsPage from "./(components)/Settings";
import UsersPage from "./(components)/UserPage"; // Import the UsersPage component
import Image from "next/image";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsiveLine } from "@nivo/line";
import ShineBorder from "@/components/magicui/shine-border";
import HospitalsPage from "./(components)/HospitalPage";
import { getDoctorNumber, getPatientNumber } from "./fetchData";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export default function EnhancedComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isHospitalOpen, setIsHospitalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen dark:from-gray-900 dark:to-indigo-900 transition-colors duration-500">
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] relative">
        <AnimatePresence>
          {(isMenuOpen || window.innerWidth > 1024) && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-gray-800 shadow-lg lg:shadow-none overflow-y-auto lg:relative"
            >
              <SidebarContent
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isSettingsOpen={isSettingsOpen}
                setIsSettingsOpen={setIsSettingsOpen}
                setIsMenuOpen={setIsMenuOpen}
                isHospitalOpen={isHospitalOpen}
                setIsHospitalOpen={setIsHospitalOpen}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex flex-col min-h-screen">
          <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex-grow items-center justify-center p-6 overflow-y-auto"
          >
            {currentPage === "dashboard" && <Dashboard />}
            {currentPage === "users" && <UsersPage />}
            {currentPage === "hospital" && <HospitalsPage />}
          </motion.div>
        </main>

        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
              onClick={() => setIsSettingsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full mx-4 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <AdminSettingsPage onClose={() => setIsSettingsOpen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SidebarContent({
  currentPage,
  setCurrentPage,
  isSettingsOpen,
  setIsSettingsOpen,
  setIsMenuOpen,
  isHospitalOpen,
  setIsHospitalOpen,
}: {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  isSettingsOpen: boolean;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHospitalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHospitalOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col h-full py-6 px-4">
      <div className="flex items-center justify-between mb-8 px-2">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <HospitalIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            eHealth
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <CloseIcon className="h-6 w-6" />
        </Button>
      </div>
      <nav className="space-y-2">
        <NavItem
          icon={LayoutDashboardIcon}
          text="Dashboard"
          active={currentPage === "dashboard"}
          onClick={() => {
            setCurrentPage("dashboard");
            setIsMenuOpen(false);
          }}
        />
        <NavItem
          icon={UsersIcon}
          text="Users"
          active={currentPage === "users"}
          onClick={() => {
            setCurrentPage("users");
            setIsMenuOpen(false);
          }}
        />
        <NavItem
          onClick={() => {
            setIsSettingsOpen((prev) => !prev);
            setIsMenuOpen(false);
          }}
          icon={SettingsIcon}
          text="Settings"
          active={isSettingsOpen}
        />
        <NavItem
          onClick={() => {
            setIsHospitalOpen(true);
            setCurrentPage("hospital");
            setIsMenuOpen(false);
          }}
          icon={HospitalIcon}
          text="
        Hospital"
          active={isHospitalOpen}
        />
      </nav>
    </div>
  );
}

function NavItem({
  icon: Icon,
  text,
  active,
  onClick,
}: {
  icon: React.ElementType;
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${
        active
          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
          : "text-gray-700 dark:text-gray-300"
      }`}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      {text}
    </button>
  );
}

function Header({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
        <div className="flex-1 lg:flex-initial">
          <Input type="search" placeholder="Search..." className="max-w-sm" />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard title="Registered Doctors" value="1,234" change="+5.2%" />
      <StatCard title="Total Patients" value="5,678" change="+3.1%" />
      <DoctorsTable />
      <UserManagement />
      <ReportingAnalytics />
      <SettingsConfigurations />
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div
          className={`text-sm ${
            change.startsWith("+") ? "text-green-600" : "text-red-600"
          }`}
        >
          {change} from last month
        </div>
        <LineChart props={{ title }} className="h-48 mt-4" />
      </CardContent>
    </Card>
  );
}

function DoctorsTable() {
  return (
    <Card className="col-span-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Doctors</CardTitle>
        <CardDescription>Manage doctors in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: "Dr. John Doe", id: "DOC001" },
              { name: "Dr. Jane Smith", id: "DOC002" },
              { name: "Dr. Michael Johnson", id: "DOC003" },
            ].map((doctor, index) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <Image
                    src={`/placeholder.svg`}
                    width="40"
                    height="40"
                    alt={`${doctor.name}'s avatar`}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.id}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function UserManagement() {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View and manage user accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {["Patients", "Doctors", "Administrators"].map((userType) => (
            <div key={userType} className="flex items-center justify-between">
              <span>{userType}</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ReportingAnalytics() {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Reporting and Analytics</CardTitle>
        <CardDescription>
          Generate reports and view analytics data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {["Patient Reports", "Doctor Reports", "Appointment Reports"].map(
            (reportType) => (
              <div
                key={reportType}
                className="flex items-center justify-between"
              >
                <span>{reportType}</span>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SettingsConfigurations() {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Settings and Configurations</CardTitle>
        <CardDescription>
          Manage app settings and configurations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {["General Settings", "Notifications", "Integrations"].map(
            (settingType) => (
              <div
                key={settingType}
                className="flex items-center justify-between"
              >
                <span>{settingType}</span>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

async function fetchDoctorData() {
  const data = await getDoctorNumber();
  return data;
}

async function fetchPatientData() {
  const data = await getPatientNumber();
  return data;
}

function LineChart(props: any) {
  const user = props.title;
  let Data;
  if (user === "Doctor") {
    Data = fetchDoctorData();
  } else {
    Data = fetchPatientData();
  }
  const data = [
    {
      id: props.title,
      data: Array.from({ length: 12 }, (_, i) => ({
        x: i + 1,
        y: Math.floor(Math.random() * 100) + 50,
      })),
    },
  ];

  return (
    <div {...props}>
      <ResponsiveLine
        data={data}
        xScale={{ type: "linear", min: 1, max: 12 }}
        yScale={{
          type: "linear",
          min: 0,
          max: Math.max(
            ...Data.map((d) => d.y),
            ...patientsData.map((p) => p.y)
          ),
        }}
        axisBottom={{
          tickValues: Array.from({ length: 12 }, (_, i) => i + 1),
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Registrations",
          legendOffset: -40,
          legendPosition: "middle",
        }}
      />
    </div>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function HospitalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
  );
}

function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
