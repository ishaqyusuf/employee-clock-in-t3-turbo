import { db } from "@acme/db/client";
import { User } from "@acme/db/schema";

// import { User } from "@acme/db/schema";

export async function getAuthor() {
  let firstAuthor = await db.query.User.findFirst({});
  if (!firstAuthor)
    firstAuthor = (
      await db.insert(User).values({
        email: "ishaqyusuf024@gmail.com",
        name: "Ishaq Yusuf",
        password: `...`,
        role: "Admin",
        status: "active",
      })
    ).rows[0];
  return firstAuthor;
}
const promptList = [
  "?",
  "albums",
  "authors",
  "update-blog-schema",
  "update-blog",
] as const;
interface UpdateBlog {
  mediaIds: number[];
}
export async function telegramPrompt(p: (typeof promptList)[number]) {
  switch (p) {
    case "?":
      return promptList.join("\n");
      break;
  }
}
