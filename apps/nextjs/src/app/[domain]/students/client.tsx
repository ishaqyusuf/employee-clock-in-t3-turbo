"use client";

import { Badge } from "@acme/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui/table";

import type { StudentsList } from "~/data-access/students.dta";

interface Props {
  data?: StudentsList;
}
export default function Client({ data }: Props) {
  const PaymentStatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const colorMap = {
      Paid: "bg-green-500",
      Pending: "bg-yellow-500",
      Overdue: "bg-red-500",
    };
    return <Badge className={`${colorMap[status]} text-white`}>{status}</Badge>;
  };
  return (
    <>
      {/* Table for larger screens */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((student) => (
              <TableRow key={student.id}>
                <TableCell> {student.sessionClass?.classRoom?.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  {/* <PaymentStatusBadge status={student.paymentStatus} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Cards for smaller screens */}
      <div className="space-y-4 md:hidden">
        {data.map((student) => (
          <Card key={student.id}>
            <CardHeader>
              <CardTitle>{student.student?.fullName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">
                {student.sessionClass?.classRoom?.name}
              </p>
              {/* <PaymentStatusBadge status={student.paymentStatus} /> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
