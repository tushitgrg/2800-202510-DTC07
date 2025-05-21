"use client";

import { useEffect, forwardRef, useImperativeHandle, useRef } from "react";

// Link weather conditions to MP3 file paths
const musicFiles = {
  sunny: "/music/sunny.mp3",
  rainy: "/music/rainy.mp3",
  cloudy: "/music/cloudy.mp3",
  snowy: "/music/snowy.mp3",
};

/**
 * MusicBackground component
 * Plays looping background music based on the current weather condition.
 * Exposes playMusic and pauseMusic methods to parent via ref.
 *
 * @component
 * @param {{weatherCondition: 'sunny'|'rainy'|'cloudy'|'snowy'}} props - The current weather condition key
 * @param {React.Ref} ref - Ref object to expose control methods
 * @returns {JSX.Element} Invisible looping audio element
 */
const MusicBackground = forwardRef(({ weatherCondition }, ref) => {
  // Create a ref for the HTMLAudioElement
  const audioRef = useRef(null);

  /**
   * Update the audio source whenever weatherCondition changes
   */
  useEffect(() => {
    if (audioRef.current) {
      // Point to the correct music file based on weather
      audioRef.current.src = musicFiles[weatherCondition];
      audioRef.current.load();
    }
  }, [weatherCondition]);

  /**
   * Expose play and pause methods to parent component via ref
   */
  useImperativeHandle(ref, () => ({
    /**
     * Play the audio, logging a warning if playback fails
     */
    playMusic: () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Playback failed:", err);
        });
      }
    },
    /**
     * Pause the audio
     */
    pauseMusic: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
  }));

  // Render a hidden, looping audio element
  return <audio ref={audioRef} loop hidden />;
});

export default MusicBackground;
