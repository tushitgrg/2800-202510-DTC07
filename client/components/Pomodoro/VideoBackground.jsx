"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const videoFiles = {
  sunny: "/videos/sunny.mp4",
  rainy: "/videos/rainy.mp4",
  cloudy: "/videos/cloudy.mp4",
  snowy: "/videos/snowy.mp4",
};

export default function DirectVideoBackground({ weatherCondition }) {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  // Background overlay colors to enhance readability
  const overlayColors = {
    sunny: "bg-yellow-500/20",
    rainy: "bg-slate-800/30",
    cloudy: "bg-slate-500/30",
    snowy: "bg-black/50",
  };

  // Fallback background colors if video fails to load
  const fallbackColors = {
    sunny: "bg-gradient-to-b from-sky-400 to-amber-300",
    rainy: "bg-gradient-to-b from-slate-700 to-slate-900",
    cloudy: "bg-gradient-to-b from-slate-400 to-slate-600",
    snowy: "bg-gradient-to-b from-slate-200 to-slate-400",
  };

  useEffect(() => {
    if (!videoRef.current) return;

    const videoSrc = videoFiles[weatherCondition];

    if (!videoSrc) {
      setIsLoading(false);
      return;
    }

    // Update video source when weather condition changes
    videoRef.current.src = videoSrc;
    videoRef.current.load();

    const handleCanPlay = () => {
      setIsLoading(false);
      videoRef.current?.play();
    };

    const handleError = () => {
      console.error("Video failed to load:", videoSrc);
      setIsLoading(false);
    };

    videoRef.current.addEventListener("canplay", handleCanPlay);
    videoRef.current.addEventListener("error", handleError);

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("canplay", handleCanPlay);
        videoRef.current.removeEventListener("error", handleError);
      }
    };
  }, [weatherCondition, videoFiles]);

  return (
    <div
      className="absolute inset-0 overflow-hidden w-screen h-screen"
      style={{
        background: fallbackColors[weatherCondition],
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute w-full h-full"
        autoPlay
        loop
        muted
        playsInline
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
          objectFit: "cover",
          objectPosition: "center center",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-white text-lg">
            Loading video...
          </div>
        </div>
      )}

      {/* Overlay for better text readability */}
      <div
        className={cn("absolute inset-0 z-0", overlayColors[weatherCondition])}
      />
    </div>
  );
}
