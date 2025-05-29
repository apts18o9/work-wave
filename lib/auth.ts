import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import type { NextAuthOptions } from "next-auth"
import credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"


export const authOptions: NextAuthOptions = {
    providers: [
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
    session: {
        strategy: "jwt",
    }
};