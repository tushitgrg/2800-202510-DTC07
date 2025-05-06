"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"



export default function VideoBackground({ weatherCondition, videoSources }) {
  const [isYouTubeReady, setIsYouTubeReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const playerRef = useRef(null)
  const containerRef = useRef(null)

  // Background overlay colors to enhance readability
  const overlayColors = {
    sunny: "bg-yellow-500/20",
    rainy: "bg-slate-800/30",
    cloudy: "bg-slate-500/30",
    snowy: "bg-slate-200/20",
  }

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        setIsYouTubeReady(true)
      }
    } else {
      setIsYouTubeReady(true)
    }

    return () => {
      // Clean up
      window.onYouTubeIframeAPIReady = () => {}
    }
  }, [])

  // Initialize or update YouTube player when ready or when weather condition changes
  useEffect(() => {
    if (!isYouTubeReady || !containerRef.current) return

    const videoId = getYouTubeId(videoSources[weatherCondition])
    if (!videoId) return

    setIsLoading(true)

    // If player exists, load new video
    if (playerRef.current) {
      playerRef.current.loadVideoById({
        videoId,
        startSeconds: 0,
      })
      return
    }

    // Create new player
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        loop: 1,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        mute: 1, // Mute by default to avoid conflicting with lofi music
      },
      events: {
        onReady: (event) => {
          event.target.playVideo()
          event.target.mute() // Ensure video is muted
          setIsLoading(false)
        },
        onStateChange: (event) => {
          // Loop the video when it ends
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo()
          }
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsLoading(false)
          }
        },
        onError: () => {
          console.error("YouTube player error")
          setIsLoading(false)
        },
      },
    })

    // Handle window resize to maintain full coverage
    const handleResize = () => {
      if (containerRef.current && playerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        const aspectRatio = 16 / 9

        let newWidth = width
        let newHeight = width / aspectRatio

        if (newHeight < height) {
          newHeight = height
          newWidth = height * aspectRatio
        }

        playerRef.current.setSize(newWidth, newHeight)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial sizing

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isYouTubeReady, weatherCondition, videoSources])

  // Add this useEffect to ensure proper sizing on all devices
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && playerRef.current) {
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        // Calculate dimensions to ensure the video covers the entire viewport
        // We'll make it larger than needed and center it
        const aspectRatio = 16 / 9
        let newWidth, newHeight

        // Calculate dimensions that will cover the viewport completely
        if (viewportWidth / viewportHeight > aspectRatio) {
          // Viewport is wider than video aspect ratio
          newWidth = viewportWidth
          newHeight = viewportWidth / aspectRatio

          // If height is not enough to cover viewport, adjust
          if (newHeight < viewportHeight) {
            newHeight = viewportHeight
            newWidth = viewportHeight * aspectRatio
          }
        } else {
          // Viewport is taller than video aspect ratio
          newHeight = viewportHeight
          newWidth = viewportHeight * aspectRatio

          // If width is not enough to cover viewport, adjust
          if (newWidth < viewportWidth) {
            newWidth = viewportWidth
            newHeight = viewportWidth / aspectRatio
          }
        }

        // Make it slightly larger to ensure no black edges
        newWidth *= 1.1
        newHeight *= 1.1

        // Apply the new dimensions
        playerRef.current.setSize(newWidth, newHeight)

        // Center the video
        if (containerRef.current) {
          containerRef.current.style.position = "absolute"
          containerRef.current.style.top = `${(viewportHeight - newHeight) / 2}px`
          containerRef.current.style.left = `${(viewportWidth - newWidth) / 2}px`
          containerRef.current.style.width = `${newWidth}px`
          containerRef.current.style.height = `${newHeight}px`
        }
      }
    }

    window.addEventListener("resize", handleResize)
    // Call once to set initial size
    setTimeout(handleResize, 500) // Slight delay to ensure player is ready

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isYouTubeReady])

  return (
    <div className="absolute inset-0 overflow-hidden w-screen h-screen">
      {/* YouTube container */}
      <div
        ref={containerRef}
        className="absolute pointer-events-none"
        style={{
          overflow: "hidden",
        }}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="animate-pulse text-white text-lg">Loading video...</div>
        </div>
      )}

      {/* Overlay for better text readability */}
      <div className={cn("absolute inset-0 z-0", overlayColors[weatherCondition])} />
    </div>
  )
}

