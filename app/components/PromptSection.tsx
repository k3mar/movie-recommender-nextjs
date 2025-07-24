import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import PromptInput from "./PromptInput";

const PromptSection = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 1000; // adjust for when to fully fade
      const newOpacity = Math.max(1 - scrollTop / maxScroll, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="text-center mt-5">
        <motion.h1 className="inline-block text-2xl font-josefin font-extrabold tracking-tight text-balance">
          Whats your mood?
        </motion.h1>
      </div>
      <div className="flex justify-center max-h-screen">
        <motion.div
          className="content  relative z-30 text-center text-white mt-6 mr-5 ml-5  rounded-3xl p-5 shadow-lg shadow-cyan-500/50 w-[50vh]  bg-[url('/images/movies.avif')] bg-cover bg-center mb-2 h-[70vh]"
          style={{ opacity }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <div className="absolute  inset-0 dark:bg-black/75 z-30 rounded-3xl" />
          <div className="relative  z-40 h-full  flex flex-col justify-around">
            <div>
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                Find the perfect movie to match it.
              </p>
            </div>
            <PromptInput></PromptInput>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PromptSection;
