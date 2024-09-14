"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { and, eq } from "@acme/db";
import { db } from "@acme/db/client";
import { StaffService, Transaction, TransactionType } from "@acme/db/schema";

import { getAuthSession } from "~/lib/auth";
import { getBillableServices } from "./service.dta";
import { getStaffList } from "./staffs.dta";

export type TransactionList = NonNullable<
  Awaited<ReturnType<typeof getTransactions>>
>;
export type TransactionForm = NonNullable<
  Awaited<ReturnType<typeof getTransactionForm>>
>;

export async function getTransactions() {
  const auth = await getAuthSession();
  const list = await db.query.Transaction.findMany({
    where: and(
      eq(Transaction.schoolId, auth.workspace.schoolId),
      eq(Transaction.termId, auth.workspace.termId),
    ),
    with: {
      // staff: true,
      // service: true,
      // staffTx: true,
      staffTermSheet: {
        with: {
          user: true,
        },
      },
      studentTermSheet: {
        with: {
          student: true,
        },
      },
    },
  });
  return list;
}
export async function getTransactionForm() {
  const auth = await getAuthSession();
  // const services = await getBillableServices();
  // const staffs = await getStaffList();
  return {
    // services,
    transactionType: null as any as TransactionType,
    // staffs,
    selection: {},
  };
}
export async function createBillables(serviceId, amount, workerIds: any[]) {
  const auth = await getAuthSession();
  await db.insert(StaffService).values(
    workerIds.map((staffId) => ({
      schoolId: auth.workspace.schoolId,
      staffId,
      amount,
      serviceId,
      termId: auth.workspace.termId,
    })),
  );
}
