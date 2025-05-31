import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const session = await getServerSession(authOptions);
        console.log('session', JSON.stringify(session, null, 2));
        
        if(!session?.user?.githubUsername){
            return NextResponse.json({
                error: "no github username found"
            }, {status: 401}
        );
        }

        //if found redirect

        const response= await fetch(
            `https://api.github.com/users/${session.user.githubUsername}/repos?sort=created&per_page=3`,
            {
                headers: {
                    Authorization:`Bearer ${process.env.GITHUB_SECRET}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        const repos = await response.json();
        return NextResponse.json(repos);
    }catch(error){
        return NextResponse.json(
            {error: "Error in fetching repos"},
            {status: 500}
        )

    }
}