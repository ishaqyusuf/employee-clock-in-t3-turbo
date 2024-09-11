"use client";

import React from "react";
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

export default function Dashboard() {
  const currentTerm = "";
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

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
