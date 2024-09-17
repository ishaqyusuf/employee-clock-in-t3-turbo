"use client";

import { use } from "react";
import Link from "next/link";

import { Button } from "@acme/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@acme/ui/card";

import type { TransactionList } from "~/data-access/transactions.dta";
import Title from "../_components/header/title";
import { Table, TableBody, TableCell, TableRow } from "@acme/ui/table";

export default function PageClient({ loader }) {
  const items: TransactionList = use(loader);

  return (
    <div>
      <Title>Transactions</Title>
      <div className="fixed bottom-0 right-0 m-4 mb-12">
        <Button asChild size={"icon"}>
          <Link href="/transaction/create">+</Link>
        </Button>
      </div>
      <div className="space-y-4">
        {!items.length && <div>No Service</div>}
        <Table>
          <TableBody>
           
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Cell
            </TableCell>
            <CardHeader>
              <CardTitle>{item.studentTermSheet?.student?.firstName}</CardTitle>
              <CardDescription>
                <div className="inline-flex space-x-2">
                  <span>{item.amount}</span>
                  <span>{item.transactionType}</span>
                </div>
              </CardDescription>
            </CardHeader>
          </TableRow>
        ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
