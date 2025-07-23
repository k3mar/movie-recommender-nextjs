"use client";

import React, { useEffect, useRef } from "react";
import ResultHeader from "./result-header";
import Reason from "./reason";
import { ResultGrid } from "./results-grid";
import { LoadingGrid } from "./loading-grid";
import ErrorSection from "./error-section";
import { Toaster } from "./ui/sonner";
import { cn } from "@/lib/utils";
import { useRecommendation } from "@/context/RecommendationContext";
import JumpTo from "./jump-to";

const ResultSection = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { data, isError, isPending } = useRecommendation();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resultRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, isError, isPending]);

  if (isError || data || isPending)
    return (
      <section className="relative min-h-screen">
        <div className="w-full dark:bg-black/60 absolute inset-0 z-0 min-h-screen" />
        <div className="min-h-screen dark:bg-[url('/images/3d-cinema-theatre-room-with-seating.avif')] bg-[url('/images/movie-reel.avif')] bg-center bg-cover bg-no-repeat absolute inset-0 z-[-1]"></div>
        <div className={cn("p-8 text-white bg-fixed", className)} {...props}>
          <div className="relative" ref={resultRef}>
            <ResultHeader />
            {data && (
              <>
                <Reason reason={data.overall_reason} />
                <ResultGrid movies={data.recommendations} />
              </>
            )}
            {isPending && <LoadingGrid cardCount={8} />}
            {isError && <ErrorSection />}
            <Toaster position="bottom-right" richColors closeButton></Toaster>
            <JumpTo>
              {isError ? "Reset & Discover" : "Roll the Reel Again"}
            </JumpTo>
          </div>
        </div>
      </section>
    );
  else return <></>;
};

export default ResultSection;
