"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Flashcard({ term, definition, index, total, flipped, setFlipped }) {
  return (
    <div
      className="relative w-full max-w-md h-64 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      {/* Counter */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground z-10">
        {index + 1} / {total}
      </div>

      <motion.div
        key={index}
        className="w-full h-full relative"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <Card
          className="absolute w-full h-full flex items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden", position: "absolute" }}
        >
          <div className="text-lg font-semibold">{term}</div>
        </Card>

        {/* Back */}
        <Card
          className="absolute w-full h-full flex items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute" }}
        >
          <div className="text-lg font-semibold">{definition}</div>
        </Card>
      </motion.div>
    </div>
  );
}