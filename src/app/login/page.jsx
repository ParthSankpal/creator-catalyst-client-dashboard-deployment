"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, startGoogle } from '../../api/authApi';
import { setLoading, setUser } from '../../store/slices/userSlice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const status = useSelector(s => s.user.status);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        dispatch(setLoading());
        const data = await getUser(); 
        if (!mounted) return;
        dispatch(setUser(data.user));
        router.replace('/dashboard');
      } catch {
        if (!mounted) dispatch(setUser(null));
      }
    })();
    return () => { mounted = false; };
  }, [dispatch, router]);

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
      {/* Left Branding Panel */}
      <section className="relative hidden lg:flex flex-col justify-between p-10 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1440 1024" fill="none">
            <circle cx="1200" cy="120" r="300" fill="#10b981" />
            <circle cx="180" cy="900" r="220" fill="#34d399" />
            <circle cx="1250" cy="900" r="120" fill="#059669" />
          </svg>
        </div>
        <header className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500 grid place-items-center font-bold">
            CC
          </div>
          <div>
            <h1 className="text-xl font-semibold">Creator Catalyst</h1>
            <p className="text-sm text-gray-300">Google × PING Network</p>
          </div>
        </header>
        <div className="relative z-10">
          <h2 className="text-4xl font-semibold leading-tight">
            Make your city discoverable.
            <span className="text-emerald-300 block">One Short at a time.</span>
          </h2>
          <ul className="mt-6 space-y-3 text-gray-200">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
              Track submissions, points & leaderboards in real time.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
              Learn via a structured 6-week bootcamp.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
              Earn badges, unlock rewards, and get discovered.
            </li>
          </ul>
        </div>
        <footer className="relative z-10 text-xs text-gray-400">
          © 2025 PING Network. All rights reserved.
        </footer>
      </section>

      {/* Right Login Panel */}
      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl shadow-gray-200/40 rounded-2xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Sign in
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Welcome to Creator Catalyst. Choose your sign-in method.
              </p>
            </div>

            {/* Role Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-6" role="tablist">
              {/* {["creator", "admin"].map((r) => (
                <button
                  key={r}
                  // onClick={() => setRole(r)}
                  className={`role-tab px-4 py-2.5 rounded-xl font-medium transition ${
                    role === r
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))} */}
            </div>

            {/* Method toggle */}
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-900">
                Sign in with email
              </label>
              {/* <button
                // onClick={() => setUseOtp(!useOtp)}
                className="text-sm text-emerald-700 hover:text-emerald-800"
                type="button"
              >
                {useOtp ? "Use Password" : "Use OTP"}
              </button> */}
            </div>

            <form  className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

             
              {/* {!useOtp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="mt-1 block w-full rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      Remember me
                    </label>
                    <a
                      href="#"
                      className="text-sm text-emerald-700 hover:text-emerald-800"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}

             
              {useOtp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    One-Time Passcode
                  </label>
                  <div className="mt-1 grid grid-cols-6 gap-2">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <input
                        key={idx}
                        maxLength="1"
                        className="block w-full rounded-xl border border-gray-300 py-2 text-center focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    ))}
                  </div>
                </div>
              )} */}

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs uppercase tracking-wider text-gray-400">
                    or
                  </span>
                </div>
              </div>

              {/* Google Sign-In */}
              <button
                type="button"
                onClick={() => startGoogle()}
                className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-gray-300 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Continue with Google
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold transition"
              >
                Sign in
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-emerald-700 hover:text-emerald-800 font-medium"
              >
                Create account
              </a>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <a className="hover:text-gray-700" href="/terms">
              Terms
            </a>
            <span className="mx-2">•</span>
            <a className="hover:text-gray-700" href="/privacy">
              Privacy
            </a>
            <span className="mx-2">•</span>
            <a className="hover:text-gray-700" href="/help">
              Help
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
