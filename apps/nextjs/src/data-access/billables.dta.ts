"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { and, eq } from "@acme/db";
import { db } from "@acme/db/client";
import { StaffService } from "@acme/db/schema";

import { getAuthSession } from "~/lib/auth";
import { getBillableServices } from "./service.dta";
import { getStaffList } from "./staffs.dta";

export type BillableList = NonNullable<
  Awaited<ReturnType<typeof getBillables>>
>;
export type BillableForm = NonNullable<
  Awaited<ReturnType<typeof getBillableForm>>
>;

export async function getBillables() {
  const auth = await getAuthSession();
  const list = await db.query.StaffService.findMany({
    where: and(
      eq(StaffService.schoolId, auth.workspace.schoolId),
      eq(StaffService.termId, auth.workspace.termId),
    ),
    with: {
      staff: true,
      service: true,
      // staffTx: true,
    },
  });
  return list;
}
export async function getBillableForm() {
  const auth = await getAuthSession();
  const services = await getBillableServices();
  const staffs = await getStaffList();
  return {
    services,
    serviceId: null,
    staffs,
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
