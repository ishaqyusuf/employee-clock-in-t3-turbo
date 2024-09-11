import { db } from "@acme/db/client";

import { getAuthSession } from "~/lib/auth";

export default async function ListstudentsPage({ params }) {
  const domain = params.domain?.split(".")[0];

  const auth = await getAuthSession();
  // const currentTerm = await db.query.AcademicTerm.findFirst({
  //   with: {},
  // });
  //   const studentByClass = await db.query.AcademicTerm
  return (
    <div className="">
      <div>{auth.workspace.title}</div>
    </div>
  );
}
