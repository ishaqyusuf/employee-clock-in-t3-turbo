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
export {
  account as Account,
  session as Session,
  user as User,
} from "./schema/user-schema";

export {
  createStudentSchema as CreateStudentSchema,
  student as Student,
  StudentSessionSheet as StudentSessionSheet,
  studentTermSheet as StudentTermSheet,
  guardian as Guardian,
  StudentTermSheetRelation,
} from "./schema/student-schema";
export {
  BillableService,
  EmployeeService,
  EmployeeClassRole,
  EmployeeSubjectRole,
} from "./schema/employee-schema";

export {
  Assessment,
  AssessmentRelations,
  AssessmentResult,
  StudentAttendance,
  StudentDayAttendance,
  StudentDayAttendanceRelations,
} from "./schema/class-schema";

export {
  AccountRelations,
  SessionRelations,
  UserRelations,
  EmployeeClassRoleRelations,
} from "./schema/relations";
