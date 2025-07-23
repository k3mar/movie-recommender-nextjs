"use client";
import { useRecommendation } from "@/context/RecommendationContext";
import Image from "next/image";
import SearchError from "../assets/search-error.svg";

const ResultHeader = () => {
  const { isError } = useRecommendation();
  return (
    <h2 className="flex justify-center gap-3  text-center text-3xl font-bold  mb-6 mt-4">
      {isError ? (
        <>
          <Image
            src="/svg/search-error.svg"
            alt="Clapper"
            width={40}
            height={40}
          />
          Trouble Casting Today’s Feature
        </>
      ) : (
        "RECOMMENDATIONS"
      )}
    </h2>
  );
};

export default ResultHeader;
