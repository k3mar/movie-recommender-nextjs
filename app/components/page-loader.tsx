import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "motion/react";

function PageLoader() {
  return (
    <motion.div
      className="flex items-center h-screen w-screen justify-center bg-slate-700 dark:bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <DotLottieReact className="w-100 " src="/camera.lottie" loop autoplay />
    </motion.div>
  );
}

export default PageLoader;
