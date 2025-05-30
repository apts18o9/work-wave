'use client'

import { useSession, signOut, signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

export default function NavbarHome() {
    const { data: session, status } = useSession()
    const [search, setSearch] = useState("")

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (!session) {
        redirect('/login')
    }

    const handleGithubConnect = async() => {
        try{
            await signIn('github', {
                redirect: true,
                callbackUrl: '/dashboard/home'
            })
        }catch(error){
            console.error("github connection failed", error)
        }
    }

    const handleSubmit = () => {}

    return (
        <nav className="w-full bg-gradient-to-r from-black via-blue-950/70 to-black/80 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                
                <div className="flex-1 flex items-center">
                    <h2 className="text-2xl font-bold text-white tracking-wide ml-2">
                        Welcome, {session.user?.name || "Guest"}
                    </h2>

                    <button
                        onClick={handleGithubConnect}
                        className="flex ml-4 items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">

                        <FaGithub className="text-xl" />
                        <span>{session?.user?.githubUsername || "Connect GitHub"}</span>
                    </button>
                </div>

                
                <div className="flex-1 flex justify-center">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
                        <input
                            type="text"
                            className="w-full bg-gray-900 text-white border border-blue-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Search by username or GitHub ID"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                        >
                            Search
                        </button>
                    </form>
                </div>

                
                <div className="flex-1 flex justify-end">
                    <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}
