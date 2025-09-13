"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen w-screen flex flex-col relative"
      style={{
        background: "linear-gradient(to top, #9BD0FF 60%, #FFFFFF 95%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/30 via-transparent to-white/20 opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-sky-100/20 opacity-40"></div>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch' seed='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineNoise'%3E%3CfeTurbulence type='turbulence' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineNoise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "32px 32px",
        }}
      ></div>

      <nav className="relative z-20 w-full flex items-center justify-between px-6 sm:px-12 py-4">
        <div className="flex items-center">
          <img src="/cclogo.png" alt="Company Logo" className="h-10 w-auto" />
        </div>
        <div>
          <Link
            href="/login"
            className="backdrop-blur-2xl inline-flex items-center justify-center gap-2 rounded-3xl border border-white font-semibold text-gray-700 text-sm sm:text-base shadow-md shadow-gray-100/50 hover:shadow-lg hover:cursor-pointer hover:shadow-gray-200/10 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2 px-5 py-2"
            style={{ backgroundColor: "#ffffff6d" }}
          >
            Sign In
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl font-medium text-gray-600 mb-6 mt-20">
          Track all your progress and <br/>learn from modules
        </h1>

        <Link
          href="/login"
          className="backdrop-blur-2xl w-60 sm:w-70 inline-flex items-center justify-center gap-2 sm:gap-2 rounded-4xl border border-white font-semibold text-gray-700 text-sm sm:text-base shadow-lg shadow-gray-100/50 hover:shadow-xl hover:cursor-pointer hover:shadow-gray-200/10 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2 mx-auto"
          style={{
            backgroundColor: "#ffffff6d",
            padding: "1.25rem 1.5rem",
            marginTop: "1.5rem",
          }}
        >
          <p className="font-medium">Get Access</p>
        </Link>

        <div className="mt-12 w-full flex justify-center">
          <img
            src="/dashboard.png"
            alt="Dashboard Preview"
            className="w-full sm:w-[70%] rounded-2xl shadow-xl"
          />
        </div>
      </div>

      <footer className="relative z-10 w-full flex flex-col items-center text-center space-y-4 mt-12">
        <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-sm mb-6">
          <Link href="/about" className="hover:text-sky-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-sky-600">
            Contact
          </Link>
          <Link href="/address" className="hover:text-sky-600">
            Address
          </Link>
        </div>

        <img
          src="/footer.png"
          className="w-full sm:w-[80%] block object-cover object-bottom opacity-50 mt-4"
          alt="Footer Decoration"
        />
      </footer>
    </main>
  );
}
