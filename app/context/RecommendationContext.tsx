"use client";

import usefetchRecommendation from "@/lib/UseFetchRecommendations";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";

type RecommendationContextType = ReturnType<typeof usefetchRecommendation>;

const RecommendationContext = createContext<
  RecommendationContextType | undefined
>(undefined);

export const RecommendationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const queryClient = useQueryClient();
  const mutation = usefetchRecommendation(queryClient);

  return (
    <RecommendationContext.Provider value={mutation}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendation = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error(
      "useRecommendation must be used within a RecommendationProvider"
    );
  }
  return context;
};
