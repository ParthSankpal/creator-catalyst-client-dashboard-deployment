"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUser, startGoogle } from "../../api/authApi";
import { setLoading, setUser } from "../../store/slices/userSlice";
import Image from "next/image";
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const status = useSelector((s) => s.user.status);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Main gradient background from #68B8FF (bottom) to #FFFFFF (top) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, #9BD0FF 10%, #FFFFFF 85%)",
        }}
      ></div>

      {/* Additional subtle overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/30 via-transparent to-white/20 opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-sky-100/20 opacity-40"></div>

      {/* Enhanced noise texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch' seed='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      ></div>

      {/* Additional fine grain noise for texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineNoise'%3E%3CfeTurbulence type='turbulence' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineNoise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* Main Content Container - grows to fill space above footer */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="relative z-1000 w-full max-w-md mx-auto">
          <div className="bg-none rounded-3xl p-6 sm:p-8 flex flex-col justify-center align-middle">
            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={() => startGoogle()}
              className="mt-0 sm:mt-50 backdrop-blur-2xl w-60 sm:w-70 inline-flex items-center justify-center gap-2 sm:gap-2 rounded-4xl border border-white font-semibold text-gray-700 text-sm sm:text-base shadow-lg shadow-gray-100/50 hover:shadow-xl hover:cursor-pointer hover:shadow-gray-200/10 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2 mx-auto"
              style={{
                backgroundColor: "#ffffff6d",
                padding: "1.25rem 1.5rem",
              }}
            >
              <img
                src="https://www.svgrepo.com/show/503367/google.svg"
                alt="Google"
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
              <p className="font-medium">Continue with Google</p>
            </button>

            <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
              <a
                href="/terms"
                className="hover:text-gray-500 transition-colors duration-200 hover:cursor-pointer"
              >
                Terms
              </a>
              <span className="mx-3 text-gray-400">•</span>
              <a
                href="/privacy"
                className="hover:text-gray-500 transition-colors duration-200 hover:cursor-pointer"
              >
                Privacy
              </a>
              <span className="mx-3 text-gray-400">•</span>
              <a
                href="/help"
                className="hover:text-gray-500 transition-colors duration-200 hover:cursor-pointer"
              >
                Help
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex justify-center">
        <img
          src="/footer.png"
          className="w-full sm:w-[80%] h-auto block object-cover object-bottom opacity-50"
        />
      </div>
    </main>
  );
}
