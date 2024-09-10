import { db } from "@acme/db/client";

export default async function ListstudentsPage({ params }) {
  const domain = params.domain?.split(".")[0];

  const currentTerm = await db.query.AcademicTerm.findFirst({
    with: {},
  });
  //   const studentByClass = await db.query.AcademicTerm
  return (
    <div className="">
      <div>{domain}</div>
      <div>{JSON.stringify(currentTerm)}</div>
    </div>
  );
}
