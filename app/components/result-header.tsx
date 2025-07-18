"use client";
import { useRecommendation } from "@/context/RecommendationContext";
import SearchError from "../assets/search-error.svg";

interface ResultHeaderProps {}

const ResultHeader = ({}: ResultHeaderProps) => {
  const { isError } = useRecommendation();
  return (
    <h2 className="flex justify-center gap-3  text-center text-3xl font-bold  mb-6 mt-4">
      {isError ? (
        <>
          <img src={SearchError} alt="movie clapper" className="w-10" />
          Trouble Casting Today’s Feature
        </>
      ) : (
        "RECOMMENDATIONS"
      )}
    </h2>
  );
};

export default ResultHeader;
