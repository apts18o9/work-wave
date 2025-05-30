import { DefaultSession, Profile } from "next-auth"

// Define GitHub-specific profile properties
interface GitHubProfile extends Profile {
    login: string
    id: number
    avatar_url: string
    name: string
    email: string
}

declare module "next-auth" {
    interface Session {
        user: {
            id?: string
            name?: string | null
            email?: string | null
            githubUsername?: string | null
        }
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        githubUsername?: string
    }
}