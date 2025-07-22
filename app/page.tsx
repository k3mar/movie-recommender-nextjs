"use client";
import Image from "next/image";
import Hero from "./components/hero";
import { useEffect } from "react";
import useDataStore from "./lib/dataStore";
import PageLoader from "./components/page-loader";
import { supabase } from "./lib/supabase/browserClient";
import SignIn from "./components/signin";
import ResultSection from "./components/result-section";
import { RecommendationProvider } from "./context/RecommendationContext";
import { AnimatePresence, motion } from "motion/react";
import Footer from "./components/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
            <Hero />
            <ResultSection />
            <Footer></Footer>
          </RecommendationProvider>
        </motion.div>
      </AnimatePresence>
    </QueryClientProvider>
  );
}
