"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ErrorAnimation from "../assets/error.json";
import { useRecommendation } from "@/context/RecommendationContext";

interface ErrorProps {}
const ErrorSection = ({}: ErrorProps) => {
  const { error } = useRecommendation();
  return (
    <div>
      <div className=" flex justify-center items-center flex-col">
        <DotLottieReact
          className=" w-200"
          data={ErrorAnimation}
          loop
          autoplay
        />
        {error?.status && (
          <div className="w-1/2 bg-amber-50/30 backdrop-blur-md p-4 rounded">
            <p className=" font-semibold">
              {error?.status == 400 ? error.data?.detail : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorSection;
