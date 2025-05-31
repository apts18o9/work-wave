'use client'

import { useEffect, useState } from "react"

interface Repo {
    id: number,
    name: string,
    description: string,
    html_url: string,
    language: string,
    stars_count: number
}

export default function RecentRepos() {
    const [repos, setRepos] = useState<Repo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('/api/github/repos')
                if (!response.ok) throw new Error("Failed to fetch repos")
                const data = await response.json()

                console.log("data", data);
                
                if (!Array.isArray(data)) {
                    console.log("received data", typeof data);
                    
                    throw new Error("Invalid data format received")
                }

                // Map the API response to match our Repo interface
                const formattedRepos = data.map((repo: any) => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description || '',
                    html_url: repo.html_url,
                    language: repo.language || '',
                    stars_count: repo.stars_count || 0
                }))

                setRepos(formattedRepos)


            } catch (error) {
                setError(error instanceof Error ? error.message : "Failed to fetch repositories")

            } finally {
                setLoading(false)
            }
        }

        fetchRepos()
    }, [])

    if (loading) return <p className="text-gray-400">Loading repositories...</p>
    if (error) return <p className="text-red-400">{error}</p>
    if (repos.length === 0) return <p className="text-gray-400 italic">No repositories found.</p>



    return (
        <div className="grid gap-4">
            {repos.map((repo) => (
                <div key={repo.id} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                        <h4 className="text-white font-medium">{repo.name}</h4>
                        <span className="text-sm text-gray-400">⭐ {repo.stars_count}</span>
                    </div>
                    {repo.description && (
                        <p className="text-gray-300 text-sm mt-2">{repo.description}</p>
                    )}
                    <div className="flex justify-between items-center mt-3">
                        {repo.language && (
                            <span className="text-sm text-blue-300">{repo.language}</span>
                        )}
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:text-blue-300"
                        >
                            View Repository →
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}