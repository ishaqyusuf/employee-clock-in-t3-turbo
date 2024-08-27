import { env } from "~/env";

export default async function HomePage() {
  const tok = env.TELEGRAM_TOKEN;
  function href(local = false) {
    let url = !local
      ? `https://daarul-hadith-telegram.vercel.app/api`
      : `https://subDomain.ngrok-free.app/api/bot`;
    return `https://api.telegram.org/${tok}/setWebhook?url=${url}`;
  }
  return (
    <div className="">
      <a href={href(true)}>Local Webhook</a>
      <div className=""></div>
      <a href={href(false)}>Server Webhook</a>
    </div>
  );
}
