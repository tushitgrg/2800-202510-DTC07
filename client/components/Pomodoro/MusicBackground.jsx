"use client"

import { useEffect, forwardRef, useImperativeHandle, useRef } from "react"

// Link weather conditions to MP3 file paths
const musicFiles = {
  sunny: "/music/sunny.mp3",
  rainy: "/music/rainy.mp3",
  cloudy: "/music/cloudy.mp3",
  snowy: "/music/snowy.mp3",
}

// 
const MusicBackground = forwardRef(({ weatherCondition }, ref) => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = musicFiles[weatherCondition]
      audioRef.current.load()
    }
  }, [weatherCondition])

  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Playback failed:", err)
        })
      }
    },
    pauseMusic: () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    },
  }))

  return <audio ref={audioRef} loop hidden />
})

export default MusicBackground
