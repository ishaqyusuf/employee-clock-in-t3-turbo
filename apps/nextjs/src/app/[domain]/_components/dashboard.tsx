import React from "react";
import Link from "next/link";
import {
  BarChart,
  BookOpen,
  DollarSign,
  GraduationCap,
  Menu,
  Users,
} from "lucide-react";

import { Button } from "@acme/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";

export default function Dashboard() {
  const [currentTerm, setCurrentTerm] = React.useState("Fall 2023");

  const navItems = [
    {
      href: "/students",
      label: "Students",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/payments",
      label: "Payments",
      icon: <DollarSign className="mr-2 h-4 w-4" />,
    },
    {
      href: "/classes",
      label: "Classes",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      href: "/teachers",
      label: "Teachers",
      icon: <GraduationCap className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              School Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <Select onValueChange={setCurrentTerm} defaultValue={currentTerm}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                  <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                  <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                </SelectContent>
              </Select>
              {/* Mobile Navigation Dropdown */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {navItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center">
                          {item.icon}
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          {/* Desktop Navigation Menu */}
          <nav className="mt-4 hidden md:block">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              {currentTerm} Overview
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Button variant="outline" className="mr-2">
              Export
            </Button>
            <Button>View Reports</Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +10.1% from last term
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Classes
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56</div>
              <p className="text-xs text-muted-foreground">+2 from last term</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Teachers
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">+5 from last term</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Payments
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$567,890</div>
              <p className="text-xs text-muted-foreground">
                +18.7% from last term
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-end justify-around sm:h-[300px]">
              {[40, 60, 45, 70, 55].map((height, index) => (
                <div
                  key={index}
                  className="w-[15%] bg-blue-500"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="mt-2 flex justify-around text-sm text-gray-600">
              <span>2019</span>
              <span>2020</span>
              <span>2021</span>
              <span>2022</span>
              <span>2023</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
