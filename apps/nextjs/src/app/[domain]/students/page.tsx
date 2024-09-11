import { Badge } from "@acme/ui/badge";

import { getStudentList } from "~/data-access/students.dta";
import { getAuthSession } from "~/lib/auth";
import Client from "./client";

export default async function ListstudentsPage({ params }) {
  const domain = params.domain?.split(".")[0];
  const studentList = await getStudentList();

  const auth = await getAuthSession();
  // const currentTerm = await db.query.AcademicTerm.findFirst({
  //   with: {},
  // });
  //   const studentByClass = await db.query.AcademicTerm
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Student List</h1>

      <Client data={studentList} />
    </div>
  );
}
