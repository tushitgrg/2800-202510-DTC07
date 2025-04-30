"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Flashcard({ term, definition }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full max-w-md h-64 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <Card
          className="absolute w-full h-full flex items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
            position: "absolute"
          }}
        >
          <div className="text-lg font-semibold">{term}</div>
        </Card>

        {/* Back Side */}
        <Card
          className="absolute w-full h-full flex items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute"
          }}
        >
          <div className="text-lg font-semibold">{definition}</div>
        </Card>
      </motion.div>
    </div>
  );
}