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
                try {
                    await connectDB();
                    const githubProfile = profile as GitHubProfile;

                    // Update or create user with GitHub info
                    await User.findOneAndUpdate(
                        { email: user.email },
                        {
                            $set: {
                                githubUsername: githubProfile.login,
                                githubId: githubProfile.id,
                                name: user.name || githubProfile.name,
                                email: user.email,
                                provider: 'github'
                            }
                        },
                        { upsert: true }
                    );
                    return true;
                } catch (error) {
                    console.error("Error in signIn callback:", error);
                    return false;
                }
            }
            return true;
        },

        async session({ session, token }) {
            if (session?.user) {
                // Get fresh user data from database
                const userData = await User.findOne({ email: session.user.email });

                // Add GitHub username to session
                session.user.githubUsername = userData?.githubUsername || null;

                // Debug log
                console.log('Session updated:', session);
            }
            return session;
        },

        async jwt({ token, account, profile }) {
            if (account?.provider === 'github') {
                const githubProfile = profile as GitHubProfile;
                // Store GitHub info in token
                token.githubUsername = githubProfile.login;
            }
            return token;
        }
    },

    pages: {
        signIn: '/login',
    },

    session: {
        strategy: "jwt",
    }
};