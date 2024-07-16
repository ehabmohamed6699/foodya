import { clientPromise, connectToDB } from "@/lib/utils";
import { User } from "@/lib/models";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { AuthOptions, NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import { Adapter } from "next-auth/adapters";
// const adapter = MongoDBAdapter(clientPromise() as Promise<MongoClient>) as Adapter;

// export const authOptions:AuthOptions = {
//   adapter: MongoDBAdapter(clientPromise() as Promise<MongoClient>) as Adapter,
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: {
//         email:{label:"Email", type:"email"},
//         password:{label:"Password", type:"password"}
//       },

//       async authorize(credentials) {
//         const { email, password } = credentials as {email:"string", password:"string"};

//         try {
//           await connectToDB();
//           const user = await User.findOne({ email });

//           if (!user) {
//             return null;
//           }

//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (!passwordsMatch) {
//             return null;
//           }

//           return user;
//         } catch (error) {
//           console.log("Error: ", error);
//         }
//       },
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID! as string,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET! as string
//     })
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
// };

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise() as Promise<MongoClient>) as Adapter,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email:{label:"Email", type:"email"},
        password:{label:"Password", type:"password"}
      },

      async authorize(credentials) {
        const { email, password } = credentials as {email:"string", password:"string"};

        try {
          await connectToDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID! as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET! as string
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },callbacks: {
    async jwt({token, user, trigger, session}) {
      if(trigger === "update"){
        return {...token, ...session.user}
      }
      return {...token, ...user}
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  }
  
});

export { handler as GET, handler as POST };
// export const GET = handler.handlers.GET;
// export const POST = handler.handlers.POST;