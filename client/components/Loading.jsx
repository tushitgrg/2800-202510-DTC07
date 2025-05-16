"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
const Loading = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center align-middle bg-black text-white">
      <div className="relative size-32 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/30"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="size-10 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
