import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        console.log('session', JSON.stringify(session, null, 2));

        if (!session?.user?.githubUsername) {
            console.error("no github username found");
            return NextResponse.json({
                error: "no github username found",
                sessionData: session?.user
            }, { status: 401 }
            );
        }

        //if found redirect to repos

        const response = await fetch(
            `https://api.github.com/users/${session.user.githubUsername}/repos?sort=created&per_page=3`,
            {
                headers: {
                    //changed from bearer to token
                    Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        if (!response.ok) {
            console.error('github api error: ', response.status, await response.text());
            return NextResponse.json({
                error: `github error api: ${response.status}`
            }, { status: response.status })
        }

        const repos = await response.json();
    
        if (!Array.isArray(repos)) {
            console.error('Invalid response format:', repos);
            return NextResponse.json({
                error: "Invalid response format from GitHub"
            }, { status: 500 });
        }

        //formatting response data
        const formattedRepos = repos.map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || '',
            html_url: repo.html_url,
            language: repo.language || '',
            stars_count: repo.stargazers_count || 0
        }));

        return NextResponse.json(formattedRepos);
    } catch (error) {
        return NextResponse.json(
            { error: "Error in fetching repos" },
            { status: 500 }
        )

    }
}