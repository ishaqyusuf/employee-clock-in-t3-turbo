import { authRouter } from "./router/auth";
import { bootstrapRouter } from "./router/bootstrap";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  bootstrap: bootstrapRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
