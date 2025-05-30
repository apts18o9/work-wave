'use client'
import { redirect, useRouter } from 'next/navigation';
import React, {FormEvent, useState}from 'react'
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()
    const [error ,setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    // handle submit btn

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
            
        })

        if(res?.error){
            setError(res.error as string)
            setIsLoading(false)
        }
        if(res?.ok){
            router.push("/dashboard/home");
            router.refresh()
        }
    }

    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900/60 to-purple-900/70 px-4">
            <div className="w-full max-w-md bg-black/80 backdrop-blur-md rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-2 text-center">Login</h2>
                <p className="text-gray-400 mb-8 text-center">
                    Welcome! Please enter your details to continue
                </p>

                 {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-9 text-gray-400 hover:text-blue-400 text-sm"
                            tabIndex={-1}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg shadow mt-2"
                    >
                        
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-blue-400   transition-colors duration-200 text-sm font-medium">
                        New User?
                    </p>

                    <button
                        className="relative inline-block px-5 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 font-semibold overflow-hidden"
                        type="button"
                        onClick={() => router.push("/signup")}
                    >
                        <span className="relative z-10">Sign up</span>
                        <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200 rounded-lg"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default page
