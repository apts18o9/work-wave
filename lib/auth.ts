import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import type { NextAuthOptions } from "next-auth"
import credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import GithubProvider from "next-auth/providers/github"
import { GitHubProfile } from "@/types/next-auth"
import crypto from 'crypto'

export const authOptions: NextAuthOptions = {


    providers: [

        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            authorization: {
                params: {
                    scope: 'read:user user:email repo' //to fetch
                }
            }
        }),

        credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await connectDB();

                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Please provide email and password");
                    }

                    const user = await User.findOne({
                        email: credentials.email
                    }).select("+password");

                    if (!user) {
                        throw new Error("Invalid email");
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isPasswordValid) {
                        throw new Error("Invalid password");
                    }

                    // Return only necessary user data
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name
                    };

                } catch (error) {
                    console.error("Authentication error:", error);
                    throw error;
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }: any) {
            if (account?.provider === 'github') {
                const { email, name } = user
                try {
                    await connectDB()

                    //checking if user exits
                    const userExists = await User.findOne({ email: user.email })
                    if (!userExists) {
                        await User.create({
                            email,
                            name,
                            githubId: user.id,
                            githubUsername: (profile as any).login,

                            password: crypto.randomBytes(32).toString('hex')

                        })
                    } else {
                        // Update existing user with GitHub info
                        await User.findOneAndUpdate(
                            { email: user.email },
                            {
                                githubId: user.id,
                                githubUsername: (profile as any).login
                            }
                        )
                    }
                    return true
                }
                catch (error) {
                    console.log("error saving user: ", error);
                    return false
                }
            }
            return true
        },

        async session({ session, token, user }) {
            if (session?.user) {
                const userData = await User.findOne({ email: session.user.email }) //to keep username same and only chnage github username 
                if (userData) {
                    session.user.githubUsername = userData.githubUsername || null
                    // Keep the original name if it exists
                    session.user.name = userData.name || session.user.name
                }
            }
            return session
        },
        async jwt({ token, account, profile }) {
            if (account?.provider === 'github') {
                const githubProfile = profile as GitHubProfile
                token.githubUsername = githubProfile.login
            }
            return token
        }
    },

    pages: {
        signIn: '/login',
    },

    session: {
        strategy: "jwt",
    }
};