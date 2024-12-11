import React from "react";
import { motion } from "framer-motion";

const Welcome = () => {
  const backgroundVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-600"
        variants={backgroundVariants}
        animate="animate"
      />

      <motion.h1
        className="text-2xl font-semibold text-white z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hi, You Are Welcome!
      </motion.h1>
      <motion.p
        className="text-lg text-white mt-2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Please login to start.
      </motion.p>
    </div>
  );
};

export default Welcome;
