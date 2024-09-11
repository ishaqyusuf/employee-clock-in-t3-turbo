import { db } from "@acme/db/client";

export async function getAuthSession() {
  // const term = await db.query.AcademicTerm.findFirst({
  //   orderBy: (terms, { desc }) => [desc(terms.createdAt)],
  //   with: {},
  // });
  return {
    workspace: {
      termId: `c4c803f6-8288-4f1e-b99f-36524a453337`,
      domain: "daarul-hadith",
      schoolId: "3b74429f-149f-4ea3-a370-ff28eb0eb265",
      title: `1445/1446 1st Term`,
    },
  };
}
