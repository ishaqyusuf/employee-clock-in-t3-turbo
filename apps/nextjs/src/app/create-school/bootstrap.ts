"use server";

import { db } from "@acme/db/client";
import {
  AcademicClass,
  AcademicSession,
  AcademicTerm,
  ClassSubject,
  School,
  SessionClass,
  Student,
  StudentSessionSheet,
  StudentTermSheet,
  Subjects,
  User,
} from "@acme/db/schema";

import type useDataTransform from "../_components/exam-result/use-data-transform";
import { first } from "~/lib/lodash";
import { configs } from "../_components/exam-result/data";

type Data = ReturnType<typeof useDataTransform>["data"];
export async function bootstrapSchool(data: Data) {
  const school = await createSchool();
  // BillableService
  //   return school;
  const session = await createSession(`1445/1446`, school);
  //   return session;
  const firstTerm = await createSessionTerm(`First Term`, session);

  // create academic class
  const classes = await Promise.all(
    data.map(async (classData) => {
      // classData.className
      const academicClass = await createAcademicClass(
        classData.className,
        school,
      );
      //create sesson class
      const sessionClass = await createSessionClass(academicClass, session);
      // create subjects
      const subjects = await createSubjects(classData.subjects, {
        schoolId: school.id,
        academicClassId: academicClass.id,
        academicSessionId: session.id,
        sessionClassId: sessionClass.id,
      });
      // create students
      const students = await Promise.all(
        classData.results
          .filter((r) => r.firstName)
          .map(async (res) => {
            return await createStudentSessionData({
              firstName: res.firstName,
              otherName: res.otherName,
              schoolId: school.id,
              surname: res.surname,
              sessionClassId: sessionClass.id,
              academicTermId: firstTerm.id,
            });
          }),
      );
      return { academicClass, subjects, students };
    }),
  );

  return {
    school,
    firstTerm,
    session,
    classes,
    studentList,
  };
}
const studentList = {};
function checkStudent(data, index = 0) {
  const { firstName, otherName, surname } = data;
  const std = [firstName, surname, otherName].filter(Boolean).join(" ");
  const _ind = studentList[std];
  if (_ind) {
    index++;
    data.otherName = index;
    return checkStudent(data, index);
  }
  studentList[std] = (_ind || 0) + 1;
  return data;
}
async function createStudentSessionData({
  firstName,
  otherName,
  surname,
  schoolId,
  sessionClassId,
  academicTermId,
}) {
  const form = checkStudent({ firstName, otherName, surname });
  //   return;
  const student = first(
    await db
      .insert(Student)
      .values({
        firstName,
        otherName: form.otherName,
        surname,
        schoolId,
      })
      .onConflictDoUpdate({
        set: { updatedAt: new Date() },
        target: [
          Student.firstName,
          Student.schoolId,
          Student.otherName,
          Student.surname,
        ],
      })
      .returning(),
  );
  const sessionSheet = first(
    await db
      .insert(StudentSessionSheet)
      .values({
        schoolId,
        // sessionClassId,
        studentId: student.id,
      })
      .returning()
      .onConflictDoUpdate({
        set: {
          updatedAt: new Date(),
        },
        target: [
          StudentSessionSheet.studentId,
          // StudentSessionSheet.sessionClassId,
          StudentSessionSheet.schoolId,
        ],
      }),
  );
  const termSheet = first(
    await db
      .insert(StudentTermSheet)
      .values({
        sessionSheetId: sessionSheet.id,
        sessionClassId,
        studentId: student.id,
        termId: academicTermId,
      })
      .returning()
      .onConflictDoUpdate({
        set: {
          updatedAt: new Date(),
        },
        target: [
          StudentTermSheet.studentId,
          StudentTermSheet.sessionSheetId,
          StudentTermSheet.sessionClassId,
          StudentTermSheet.termId,
        ],
      }),
  );
  return { student, termSheet, sessionSheet };
}

async function createSubjects(
  subjects,
  { schoolId, academicClassId, academicSessionId, sessionClassId },
) {
  const _subjects = await db
    .insert(Subjects)
    .values(
      subjects.map((name) => ({
        name,
        schoolId,
      })),
    )
    .onConflictDoUpdate({
      target: [Subjects.name, Subjects.schoolId],
      set: {
        updatedAt: new Date(),
      },
    })
    .returning();
  const ls = await db.query.ClassSubject.findMany();
  const classSubjects = ls.length
    ? ls
    : await db
        .insert(ClassSubject)
        .values(
          _subjects.map((s) => ({
            schoolId,
            subjectId: s.id,
            sessionClassId,
            academicClassId,
            academicSessionId,
          })),
        )
        // .onConflictDoUpdate({
        //   target: [ClassSubject.academicSessionId, ClassSubject.subjectId],
        //   set: {
        //     updatedAt: new Date(),
        //   },
        // })
        .returning();
  return {
    classSubjects,
    _subjects,
  };
}
async function createSessionClass(_class, acadSession) {
  return first(
    await db
      .insert(SessionClass)
      .values({
        academicClassId: _class.id,
        academicSessionId: acadSession.id,
        schoolId: _class.schoolId,
      })
      .onConflictDoUpdate({
        target: [
          SessionClass.schoolId,
          SessionClass.academicClassId,
          SessionClass.academicSessionId,
        ],
        set: {
          updatedAt: new Date(),
        },
      })
      .returning(),
  );
}
async function createAcademicClass(name, school) {
  return first(
    await db
      .insert(AcademicClass)
      .values({
        name,
        schoolId: school.id,
      })
      .onConflictDoUpdate({
        target: [AcademicClass.schoolId, AcademicClass.name],
        set: {
          updatedAt: new Date(),
        },
      })
      .returning(),
  );
}
async function createSessionTerm(name, session) {
  return first(
    await db
      .insert(AcademicTerm)
      .values({
        name,
        academicSessionId: session.id,
        schoolId: session.schoolId,
      })
      .onConflictDoUpdate({
        target: [
          AcademicTerm.schoolId,
          AcademicTerm.academicSessionId,
          AcademicTerm.name,
        ],
        set: {
          updatedAt: new Date(),
        },
      })
      .returning(),
  );
}
async function createSession(name, school) {
  const session = first(
    await db
      .insert(AcademicSession)
      .values({
        name,
        schoolId: school.id,
      })
      .onConflictDoUpdate({
        target: [AcademicSession.schoolId, AcademicSession.name],
        set: {
          updatedAt: new Date(),
        },
      })
      .returning(),
  );
  return session;
}
async function createSchool() {
  const [school] = await db
    .insert(School)
    .values({
      name: configs.schoolName,
      subDomain: `daarul-hadith`,
      meta: {},
    })
    .onConflictDoUpdate({
      target: [School.name, School.subDomain],
      set: {
        updatedAt: new Date(),
      },
    })
    .returning();
  if (!school) throw new Error("Unable to create school");
  const [user] = await db
    .insert(User)
    .values({
      email: `ishaqyusuf024@gmail.com`,
      name: `Ishaq Yusuf`,
      role: "admin",
      schoolId: school.id,
    })
    .onConflictDoUpdate({
      target: [User.email, User.schoolId],
      set: {
        updatedAt: new Date(),
      },
    })
    .returning();
  return school;
}

export async function createSecondTerm() {}
