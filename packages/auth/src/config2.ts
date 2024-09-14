import type { DefaultJWT, JWT } from "next-auth/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { DefaultSession, NextAuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { db } from "@acme/db/client";
import { User } from "@acme/db/schema";

import { env } from "../env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

interface Workspace {}
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number;
      workspace: Workspace;
      organization_id: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: Workspace;
  }
}

declare module "next-auth/adapters" {
  export interface AdapterUser {
    workspace: Workspace;
    organization_id?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface JWT extends DefaultJWT {
    id: number;
    // role: Workspace;
    workspace: Workspace;
    emailVerified: Date | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthConfig = {
  callbacks: {
    session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        // session.user.organization_id = token.organization_id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.picture; // replace 'image' with 'picture'
      }
      return session;
    },
    jwt: async ({ token }: { token: JWT }) => {
      const dbUser = await db.query.User.findFirst({
        where: eq(User.email, token.email ?? ""),
      });

      if (!dbUser) {
        console.log("No User");
        throw new Error("Unable to find user");
      }

      return {
        id: dbUser.id,
        // role: dbUser.role as UserRole,
        email: dbUser.email,
        // organization_id: dbUser.organization_id,
        emailVerified: dbUser.emailVerified,
        name: dbUser.name,
        picture: dbUser.image,
        sub: token.sub,
      };
    },

    // If Email provider is used, on the first call, it contains a verificationRequest: true property
    // to indicate it is being triggered in the verification request flow.

    signIn: async ({ user, email }) => {
      if (email?.verificationRequest) {
        // Query database to get user by email address (identifier)
        try {
          const dbUser = await db.query.User.findFirst({
            where: eq(User.email, user.email ?? ""),
          });

          console.log("signIn => dbUser", dbUser);

          if (!dbUser) {
            return false;
          }

          console.log("signIn => verificationRequest", dbUser.email);
        } catch (error) {
          console.log("error:", error);
        }
      }
      // if we dont find a user with the email, we throw an error
      // we dont want to send a magic link if user doesnt exist
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  // jwt: {
  //   secret: env.NEXTAUTH_SECRET,
  // },
  secret: env.AUTH_SECRET,
  adapter: DrizzleAdapter(db),

  pages: {
    signIn: "/login",
  },
  /**
   * ...add more providers here.
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */
  providers: [
    // EmailProvider({
    //   sendVerificationRequest,
    // }),
  ],
};

// /**
//  * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
//  *
//  * @see https://next-auth.js.org/configuration/nextjs
//  */
// export const getServerAuthSession = () => getServerSession(authOptions);

// import type { NextAuthConfig, Session as NextAuthSession } from "next-auth";
// import { skipCSRFCheck } from "@auth/core";
// import Credentials from "@auth/core/providers/credentials";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";

// import { eq } from "@acme/db";
// import { db } from "@acme/db/client";
// import { Account, Session, User } from "@acme/db/schema";

// import { env } from "../env";

// interface Workspace {
//   termId?: string;
//   sessionId?: string;
//   schoolId?: string;
//   title?: string;
// }
// interface Usr {
//   id: string;
// }
// declare module "next-auth" {
//   interface User {
//     user: {} & Usr;
//     workspace?: Workspace;
//     // workspace?: {
//     //   termId?: string;
//     //   sessionId?: string;
//     //   title?: string;
//     // };
//     // sessionId?: string;
//   }
//   interface Session {
//     user: Usr;
//     workspace?: Workspace;
//   }
// }

// const adapter = DrizzleAdapter(
//   db,
//   //   {
//   //   usersTable: User,
//   //   accountsTable: Account,
//   //   sessionsTable: Session,
//   // }
// );

// export const isSecureContext = env.NODE_ENV !== "development";

// export const authConfig = {
//   adapter,
//   // In development, we need to skip checks to allow Expo to work
//   ...(!isSecureContext
//     ? {
//         skipCSRFCheck: skipCSRFCheck,
//         trustHost: true,
//       }
//     : {}),
//   secret: env.AUTH_SECRET,
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "" },
//         password: { label: "Password", type: "password" },
//         domain: { label: "Domain", type: "text" },
//       },
//       async authorize(credentials, req) {
//         const term = await db.query.AcademicTerm.findFirst({
//           // where: eq(AcademicTerm.)
//           with: {
//             sheets: true,
//           },
//         });
//         return {
//           // id: "1",
//           user: {
//             id: "1",
//           },
//           workspace: {
//             sessionId: term?.AcademicSessionId,
//             termId: term?.id,
//             schoolId: term?.schoolId,
//           },
//           // termId: term?.id,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     session: (opts) => {
//       if (!("user" in opts))
//         throw new Error("unreachable with session strategy");

//       return {
//         ...opts.session,
//         user: {
//           ...opts.session.user,
//           id: opts.user.id,
//         },
//       };
//     },
//   },
// } satisfies NextAuthConfig;

// export const validateToken = async (
//   token: string,
// ): Promise<NextAuthSession | null> => {
//   const sessionToken = token.slice("Bearer ".length);
//   const session = await adapter.getSessionAndUser?.(sessionToken);
//   return session
//     ? {
//         user: {
//           ...session.user,
//         },
//         expires: session.session.expires.toISOString(),
//       }
//     : null;
// };

// export const invalidateSessionToken = async (token: string) => {
//   await adapter.deleteSession?.(token);
// };
