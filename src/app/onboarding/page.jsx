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
      image: "/images/intro1.png",
      title: "Welcome to Creator Catalyst 🚀",
      text: "Your personal hub to grow faster with challenges, insights, and tools.",
    },
    {
      image: "/images/intro2.png",
      title: "Take on Challenges 🎯",
      text: "Push your creativity further with guided challenges every week.",
    },
    {
      image: "/images/intro3.png",
      title: "Track Your Progress 📊",
      text: "See how far you’ve come with analytics designed for creators.",
    },
    {
      image: "/images/intro4.png",
      title: "Collaborate & Connect 🤝",
      text: "Work with fellow creators, share ideas, and grow together.",
    },
    {
      image: "/images/intro5.png",
      title: "Ready to Begin? ✨",
      text: "Let’s get started on your creator journey!",
    },
  ];

  const captions = [
    "Let’s get started!",
    "You’re on the right track!",
    "Halfway there 🚀",
    "You’re almost there!",
    "Last step ✨",
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center relative">
      {/* Image */}
      <div className="relative w-64 h-64 mb-6">
        <Image
          src={pages[step].image}
          alt={pages[step].title}
          fill
          className="object-contain"
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        {pages[step].title}
      </h1>

      {/* Description */}
      <p className="text-gray-600 max-w-md mb-20">{pages[step].text}</p>

      {/* Floating Progress Bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border shadow-lg rounded-2xl py-4 px-6 w-[90%] max-w-[400px]">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 text-center">{captions[step]}</p>
      </div>

      {/* Buttons */}
      <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 flex gap-6">
        {/* First page => Spark button */}
        {step === 0 && (
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 transition"
          >
            Spark the Catalyst
          </button>
        )}

        {/* Middle pages => back + next FAB */}
        {step > 0 && step < pages.length - 1 && (
          <>
            <button
              onClick={handlePrev}
              className="p-4 rounded-full bg-gray-200 shadow-lg hover:bg-gray-300 transition"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="p-4 rounded-full bg-indigo-600 shadow-lg hover:bg-indigo-700 transition"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Last page => only Let's Do This button */}
        {step === pages.length - 1 && (
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 transition"
          >
            Let’s Do This
          </button>
        )}
      </div>
    </div>
  );
}
