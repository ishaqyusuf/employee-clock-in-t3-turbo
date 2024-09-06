import Link from "next/link";

export default async function Layout({ children }) {
  return (
    <div>
      <div className="flex justify-center space-x-2">
        <Link href={"/list-students"}>List students</Link>
      </div>

      {children}
    </div>
  );
}
