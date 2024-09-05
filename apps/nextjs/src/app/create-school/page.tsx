import { env } from "~/env";
import { addDomainToVercel } from "~/lib/domain";

export default async function CreateSchoolPage() {
  const domain = await addDomainToVercel(
    `${"daarulhadith"}.${env.SERVER_APP_ROOT_DOMAIN}`,
  );

  return (
    <>
      <div>Create School!</div>
    </>
  );
}
