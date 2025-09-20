"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const pages = [
    {
      image: "/intro1.png",
      title: "Welcome to Creator Catalyst",
      text: "Get a bird’s-eye view of your growth as a creator. See active challenges, your progress, and quick stats—all in one place.",
    },
    {
      image: "/intro2.png",
      title: "Challenges",
      text: "Join structured challenges that help you stay consistent. Build habits, push creative limits, and track your progress step by step.",
    },
    {
      image: "/intro3.png",
      title: "Modules",
      text: "Access bite-sized learning modules packed with insights, strategies, and tools to sharpen your creator skills at your own pace.",
    },
    {
      image: "/intro4.png",
      title: "Leaderboard",
      text: "See where you stand among fellow creators. Climb the ranks, celebrate milestones, and let a little friendly competition fuel your journey.",
    },
    {
      image: "/intro5.png",
      title: "Rewards & Badges",
      text: "Unlock rewards and earn badges as you progress. Every win—big or small—gets recognized and keeps you motivated.",
    },
    {
      image: "/intro6.png",
      title: "Ready to Begin?",
      text: "You now know your way around Creator Catalyst. Time to dive in, spark momentum, and start growing your creator journey!",
    },
  ];

  const captions = [
    "Let’s get started!",
    "Explore your dashboard",
    "Challenge yourself",
    "Measure your growth",
    "Collaborate & connect",
    "Last step",
  ];

  const handleNext = () => {
    if (step < pages.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const progress = ((step + 1) / pages.length) * 100;

  return (
    <main
      className="min-h-screen w-screen flex flex-col relative"
      style={{
        background: "linear-gradient(to top, #9BD0FF 60%, #FFFFFF 95%)",
      }}
    >
      {/* Noise + gradient overlays */}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-7xl w-full">
          {/* Screenshot */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={pages[step].image}
              alt={pages[step].title}
              width={1200}
              height={800}
              className="rounded-2xl object-contain w-full h-auto"
            />
          </div>

          {/* Text content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-700 mb-3">
              {pages[step].title}
            </h1>
            <p className="text-gray-600 max-w-xl mb-20">{pages[step].text}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[400px]">
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className="bg-sky-500 h-1 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            {captions[step]}
          </p>
        </div>

        {/* Buttons */}
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* First button */}
          {step === 0 && (
            <button
              onClick={handleNext}
              className="backdrop-blur-2xl inline-flex items-center justify-center gap-2 rounded-4xl border border-white font-semibold text-gray-700 text-sm shadow-lg shadow-gray-100/50 hover:shadow-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "#ffffff6d",
                padding: "1rem 1.25rem",
              }}
            >
              Spark the Catalyst
            </button>
          )}

          {/* Middle buttons */}
          {step > 0 && step < pages.length - 1 && (
            <div className="flex gap-6">
              <button
                onClick={handlePrev}
                className="backdrop-blur-2xl inline-flex items-center justify-center gap-2 rounded-4xl border border-white font-semibold text-gray-700 text-sm shadow-lg shadow-gray-100/50 hover:shadow-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "#ffffff6d",
                  padding: "1.25rem 1.25rem",
                }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="backdrop-blur-2xl inline-flex items-center justify-center gap-2 rounded-4xl border border-white font-semibold text-gray-700 text-sm shadow-lg shadow-gray-100/50 hover:shadow-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "#ffffff6d",
                  padding: "1.25rem 1.25rem",
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Last button */}
          {step === pages.length - 1 && (
            <button
              onClick={handleNext}
              className="backdrop-blur-2xl w-40 sm:w-48 inline-flex items-center justify-center gap-2 rounded-4xl border border-white font-semibold text-gray-700 text-sm shadow-lg shadow-gray-100/50 hover:shadow-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "#ffffff6d",
                padding: "1rem 1.25rem",
              }}
            >
              Let’s Begin
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
