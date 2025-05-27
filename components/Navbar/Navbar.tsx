'use client'
import { redirect, useRouter } from "next/navigation";

const Navbar = () => {

    const router = useRouter()
  return (
    <nav className="w-full bg-gradient-to-r from-black via-blue-950/70 to-black/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <h2 className="text-2xl font-bold text-white tracking-wide">WorkWave</h2>
        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/signin")} className="px-5 py-2 rounded-md text-white border border-gray-500 hover:bg-gray-800 transition">
            Sign In
          </button>
          <button onClick={() => router.push("/login")} className="px-5 py-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
