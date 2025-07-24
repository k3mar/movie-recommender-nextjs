"use client";
import Hero from "./components/Hero";
import ResultSection from "./components/ResultSection";
import { RecommendationProvider } from "./context/RecommendationContext";
import { AnimatePresence, motion } from "motion/react";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PromptSection from "./components/PromptSection";

const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ ease: "easeIn", duration: 0.8 }}
        >
          <RecommendationProvider>
            <Hero>
              <PromptSection />
            </Hero>
            <ResultSection />
            <Footer></Footer>
          </RecommendationProvider>
        </motion.div>
      </AnimatePresence>
    </QueryClientProvider>
  );
}
