import Image from "next/image";
import Hero from "./components/hero";
import { useEffect } from "react";
import useDataStore from "./lib/dataStore";
import PageLoader from "./components/page-loader";
import { supabase } from "./lib/supabaseClient";
import SignIn from "./components/signin";
import ResultSection from "./components/result-section";
import { RecommendationProvider } from "./context/RecommendationContext";
import { AnimatePresence, motion } from "motion/react";
import Footer from "./components/footer";

export default function Home() {
  /*Retrieve state values from zustand datastore*/
  const setLoading = useDataStore((state) => state.setLoading);
  const setSession = useDataStore((state) => state.setSession);
  const loading = useDataStore((state) => state.loading);
  const session = useDataStore((state) => state.session);

  const MIN_LOAD_TIME = 2000; // milliseconds
  const start = Date.now();

  /*Sign in logic on page load*/
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      const timeElapsed = Date.now() - start;
      const timeRemaining = MIN_LOAD_TIME - timeElapsed;

      setTimeout(
        () => {
          setLoading(false);
        },
        timeRemaining > 0 ? timeRemaining : 0
      );
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && <PageLoader />}

      {!loading && !session && (
        <motion.div
          key="signin"
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-50vw", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SignIn />
        </motion.div>
      )}

      {!loading && session && (
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
      )}
    </AnimatePresence>
  );
}
