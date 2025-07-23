"use client";
import { useRecommendation } from "@/context/RecommendationContext";
import SearchError from "../assets/search-error.svg";

const ResultHeader = () => {
  const { isError } = useRecommendation();
  return (
    <h2 className="flex justify-center gap-3  text-center text-3xl font-bold  mb-6 mt-4">
      {isError ? (
        <>
          <SearchError className="w-10 h-10" />
          Trouble Casting Today’s Feature
        </>
      ) : (
        "RECOMMENDATIONS"
      )}
    </h2>
  );
};

export default ResultHeader;
