import { db } from "@acme/db/client";
import { User } from "@acme/db/schema";

import { HydrateClient } from "~/trpc/server";
import Dashboard from "./_components/dashboard";

export const runtime = "edge";

export default async function HomePage({ params }) {
  // const schools = await db.query.School.findMany();
  // const [user] = await db
  //   .insert(User)
  //   .values({
  //     email: "ishaqyusuf024@gmail.com",
  //   })
  //   .returning();
  // console.log(user);

  // You can await this here if you don't want to show Suspense fallback below
  // void api.post.all.prefetch();

  return (
    <HydrateClient>
      <Dashboard />
    </HydrateClient>
  );
}
