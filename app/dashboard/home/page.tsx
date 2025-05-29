'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function DashboardHome() {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/60 to-purple-900/70">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-white mb-6">
                    Welcome, {session.user?.name}
                </h1>
                {/* Dashboard content */}
            </div>
        </div>
    )
}