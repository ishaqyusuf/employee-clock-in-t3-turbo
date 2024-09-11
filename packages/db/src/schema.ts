export {
  account as Account,
  session as Session,
  user as User,
} from "./schema/user-schema";
export {
  school as School,
  academicClass as AcademicClass,
  createSchoolSchema as CreateSchoolSchema,
  academicSession as AcademicSession,
  academicTerm as AcademicTerm,
  classSubject as ClassSubject,
  sessionClass as SessionClass,
  subjects as Subjects,
  // academicTermRelations,
} from "./schema/school-schema";

export * from "./schema/student-schema";
export * from "./schema/employee-schema";
export * from "./schema/class-schema";
export * from "./schema/relations";
