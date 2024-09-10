import { db } from "@acme/db/client";

export async function getAuthSession() {
  const term = await db.query.AcademicTerm.findFirst({
    orderBy: (terms, { desc }) => [desc(terms.createdAt)],
    with: {},
  });
}
