"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser, startGoogle } from "../api/authApi";
import { getCookie, removeCookie } from "../utils/cookieHandler";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  const handleLogin = async () => {
    const jwt = getCookie("jwt");
    const user = getCookie("user");

    if (jwt && user) {
      try {
        setChecking(true);

        const res = await getUser();
        const userData = res?.data;

        if (userData?.id) {
        
          router.push("/dashboard");
          return;
        } else {
          throw new Error("User validation failed");
        }
      } catch (err) {
        console.warn("JWT expired/invalid → fallback to Google login");
        removeCookie("jwt");
        removeCookie("user");
      } finally {
        setChecking(false);
      }
    }

    // ❌ No jwt or invalid → just trigger Google auth
    startGoogle();
  };

  if (checking) {
    return (
      <main
        className="min-h-screen w-screen flex flex-col items-center justify-center relative"
        style={{
          background: "linear-gradient(to top, #9BD0FF 60%, #FFFFFF 95%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/30 via-transparent to-white/20 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-sky-100/20 opacity-40"></div>

        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="w-14 h-14 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-base">Checking your session...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col relative"
      style={{
        background: "linear-gradient(to top, #9BD0FF 60%, #FFFFFF 95%)",
      }}
    >
      {/* background overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/30 via-transparent to-white/20 opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-sky-100/20 opacity-40"></div>

      <nav className="relative z-20 w-full flex items-center justify-between px-6 sm:px-12 py-4">
        <div className="flex items-center">
          <img src="/cclogo.png" alt="Company Logo" className="h-10 w-auto" />
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl font-medium text-gray-600 mb-6 mt-20">
          Track all your progress and <br />
          learn from modules
        </h1>

        <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-none rounded-3xl p-6 sm:p-8 flex flex-col justify-center align-middle">
              <button
                type="button"
                onClick={handleLogin}
                className="backdrop-blur-2xl w-60 sm:w-70 inline-flex items-center justify-center gap-2 rounded-4xl border border-white font-semibold text-gray-700 text-sm sm:text-base shadow-lg shadow-gray-100/50 hover:shadow-xl hover:cursor-pointer hover:shadow-gray-200/10 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2 mx-auto"
                style={{
                  backgroundColor: "#ffffff6d",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <img
                  src="/google.svg"
                  alt="Google"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
                <p className="font-medium">Continue with Google</p>
              </button>

              <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
                <a href="/terms" className="hover:text-gray-500">
                  Terms
                </a>
                <span className="mx-3 text-gray-400">•</span>
                <a href="/privacy" className="hover:text-gray-500">
                  Privacy
                </a>
                <span className="mx-3 text-gray-400">•</span>
                <a href="/help" className="hover:text-gray-500">
                  Help
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-0 sm:-mt-10 w-full flex justify-center">
          <img
            src="/dashboard.png"
            alt="Dashboard Preview"
            className="w-full sm:w-[90%] rounded-2xl mt-0"
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
