import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import '../styles/globals.css'; 
export default function Home() {
  return (
    <div className="min-h-screen bg-black bg-gradient-to-br  from-black via-blue-900/60 to-purple-900/70">
      <Navbar />

      <section className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto mt-20 px-6">
        {/* Text Content */}
        <div className="flex-1 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Show Your <span className="text-blue-400">Journey</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-md">
            Showcase your current ongoing project to world, ask for help, suggestions and many more.
          </p>
        </div>

        {/* Progress Image */}
        <div className="flex-1 flex justify-center items-center relative mt-10 md:mt-0">
          <Image
            src="/images/career-4-35.png"
            width={250}
            height={250}
            alt="Progress illustration"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-20 text-white">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-500 p-4 rounded-full mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Progress</h3>
            <p className="text-gray-300">Track your projects live and stay updated with instant notifications.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-500 p-4 rounded-full mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Seamless Collaboration</h3>
            <p className="text-gray-300">Work together effortlessly with your team from anywhere in the world.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-500 p-4 rounded-full mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-300">Your data is protected with industry-leading security standards.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">It's time to show your skills</h2>
        </div>
      </section>
    </div>
  );
}
