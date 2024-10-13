import { QueryProcedure } from "@trpc/server/unstable-core-do-not-import";

import { Company, EmployeeCompanyProfile, User } from "@acme/db/schema";

import type { DbType } from "../trpc";
import { AppRouter } from "../root";

export async function __getExampleSession(db: DbType) {
  // ctx.db
  const company = await getCompany(db);
  const user = await getUser(db);
  const profile = await getProfile(db, {
    companyId: company.id,
    employeeId: user.id,
  });
  return {
    company,
    // user: {},
    user,
    profile,
    // user,
    //     user: {
    //       name: "Is-haq2",
    //     },
  };
  //   db.query.User.findFirst()
  //     .then((usr) => {
  //       console.log(usr);
  //     })
  //     .catch((e) => {
  //       //
  //     });
  //   return db.query.User.findFirst();
}
export async function getCompany(db: DbType) {
  const [_company] = await db
    .insert(Company)
    .values({
      name: "GND Prodesk",
      slug: "gnd-prodesk",
    })
    .onConflictDoUpdate({
      target: [Company.name],
      set: {
        updatedAt: new Date(),
      },
    })
    .returning();
  if (!_company) throw new Error("company not found");
  return _company;
}
export async function getUser(db: DbType) {
  const [user] = await db
    .insert(User)
    .values({
      email: "ishaqyusuf024@gmail.com",
      name: "Ishaq Yusuf",
    })
    .onConflictDoUpdate({
      target: [User.email],
      set: {
        name: "Ishaq Yusuf",
        updatedAt: new Date(),
      },
    })
    .returning();
  if (!user) throw new Error("user not found");
  return user;
}
export async function getProfile(db: DbType, { companyId, employeeId }) {
  const [profile] = await db
    .insert(EmployeeCompanyProfile)
    .values({
      companyId,
      employeeId,
      title: "Developer",
    })
    .onConflictDoUpdate({
      target: [
        EmployeeCompanyProfile.companyId,
        EmployeeCompanyProfile.employeeId,
      ],
      set: {
        title: "Developer",
        updatedAt: new Date(),
      },
    })
    .returning();
  return profile;
}
