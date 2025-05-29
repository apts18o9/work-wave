'use client'
import { useRouter } from 'next/navigation';
import React, {useRef, useState} from 'react'
import Link from 'next/link';
import { register } from '@/actions/register';
const page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>();
    const ref = useRef<HTMLFormElement>(null)
    const router = useRouter()
     const [isLoading, setIsLoading] = useState(false);

    // const handleSubmit = async(formData: FormData) => {
    //     const reg = await register({
    //         email: formData.get("email"),
    //         password: formData.get("password"),
    //         name: formData.get("name")
    //     });

    //     ref.current?.reset();
    //     if(reg?.error){
    //         setError(reg.error)
    //         return 
    //     }
    //     else{
    //         return router.push("/login")
    //     }
    // }


    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(undefined);

        const formData = new FormData(event.currentTarget);
        const reg = await register({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            name: formData.get("name") as string
        });

        if(reg?.error) {
            setError(reg.error);
            setIsLoading(false);
            return;
        }

        router.push("/login");
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900/60 to-purple-900/70 px-4">
            <div className="w-full max-w-md bg-black/80 backdrop-blur-md rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-2 text-center">Sign Up</h2>
                <p className="text-gray-400 mb-8 text-center">
                    Welcome! Please enter your details to create your account.
                </p>

                 {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                <form ref={ref} onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                        />
                    </div>
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
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-blue-400   transition-colors duration-200 text-sm font-medium">
                        Already a user?
                    </p>

                    <button
                        className="relative inline-block px-5 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 font-semibold overflow-hidden"
                        type="button"
                        disabled={isLoading}
                        onClick={() => router.push("/login")}
                    >
                        <span className="relative z-10">Login</span>
                        <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200 rounded-lg"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default page
