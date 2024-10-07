import { authRouter } from "./router/auth";
import { bootstrapRouter } from "./router/bootstrap";
import { postRouter } from "./router/post";
import { workSessionRouter } from "./router/work-session";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  bootstrap: bootstrapRouter,
  workSession: workSessionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
