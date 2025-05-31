'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Navbar from "@/app/dashboard/home/Navbar"
import { useState, useEffect } from "react"
import RecentRepos from '@/components/RecentRepos'

export default function DashboardHome() {
  const { data: session, status } = useSession()
  const [dailyUpdates, setDailyUpdates] = useState([])
  const [newUpdate, setNewUpdate] = useState("")
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDesc, setProjectDesc] = useState("")
  const [projectImg, setProjectImg] = useState("")
  const [comments, setComments] = useState<{ user: string; text: string }[]>([])
  const [commentText, setCommentText] = useState("")
  const [currentProject, setCurrentProject] = useState<any>(null)

  useEffect(() => {
    if (currentProject) {
      localStorage.setItem("currentProject", JSON.stringify(currentProject))
    }
  }, [currentProject])

  if (status === 'loading') return <div>Loading...</div>
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/60 to-purple-900/70">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-8">
          {/* Current Project Section */}
          <div className="bg-black/80 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full text-center">
              <p className="text-gray-300 mb-4">
                You haven't selected a current project yet.
              </p>
              <button
                className="bg-blue-600/50 text-white px-5 py-2 rounded-lg font-semibold shadow cursor-not-allowed"
                disabled
              >
                Add Project
              </button>
            </div>
          </div>

          {/* GitHub Projects Section */}
          <div className="bg-black/70 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Recent GitHub Projects</h3>
            <RecentRepos />
            {/* <p className="text-gray-400 italic">No projects available yet.</p> */}
          </div>

          {/* Comment Section */}
          <div className="bg-black/70 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-green-300 mb-4">Suggestions & Comments</h3>
            <div className="text-gray-400 italic mb-4">
              Comments feature coming soon!
            </div>
            <form className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none cursor-not-allowed"
                placeholder="Comments are disabled..."
                disabled
              />
              <button
                type="submit"
                className="bg-green-600/50 text-white px-4 py-1 rounded-lg font-semibold cursor-not-allowed"
                disabled
              >
                Post
              </button>
            </form>
          </div>
        </div>

        {/* Right Sidebar: Daily Updates */}
        <aside className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-black/80 rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-purple-300 mb-4">Daily Updates</h3>
            <p className="text-gray-400 italic mb-4">No updates yet.</p>
            <form className="mt-4 flex flex-col gap-2">
              <textarea
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none cursor-not-allowed"
                rows={2}
                placeholder="Updates are disabled..."
                disabled
              />
              <button
                type="submit"
                className="self-end bg-purple-600/50 text-white px-4 py-1 rounded-lg font-semibold transition cursor-not-allowed"
                disabled
              >
                Add Update
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  )
}