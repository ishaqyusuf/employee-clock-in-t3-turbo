"use server";

import { sql } from "@acme/db";
import { db } from "@acme/db/client";
import { Student } from "@acme/db/schema";

export type StudentsList = Awaited<ReturnType<typeof getStudentList>>;

export async function getStudentList() {
  const list = await db.query.StudentTermSheet.findMany({
    with: {
      student: {
        extras: {
          fullName:
            sql<string>`concat(${Student.firstName}, ' ', ${Student.surname}, ${Student.otherName})`.as(
              "full_name",
            ),
        },
      },
      sessionClass: {
        with: {
          classRoom: true,
        },
      },
    },
    // orderBy: (sheets,{asc}) => [asc(sheets.)]
  });
  return list;
}
