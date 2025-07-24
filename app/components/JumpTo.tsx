"use client";
import type { ReactNode } from "react";
import { AninmatedButton } from "@/components/animated/AnimatedComponents";

interface JumpToProps {
  children: ReactNode;
}

const JumpTo = ({ children }: JumpToProps) => {
  const scrollToSection = () => {
    document.getElementById("prompt")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex justify-center align-bottom">
      <AninmatedButton
        onClick={scrollToSection}
        className="hover:bg-blue-500/50 px-4 py-2 mt-5 ml-auto mr-auto rounded-full dark:bg-slate-950/50 bg-blue-800  text-base border-2 border-indigo-500/50 w-50 font-bold cursor-pointer"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        {children}
      </AninmatedButton>
    </div>
  );
};

export default JumpTo;
