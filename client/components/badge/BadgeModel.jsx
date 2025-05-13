"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, X, Star, XCircle, CloudRain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Success mode: Confetti particle
const SuccessParticle = ({ index }) => {
  // Generate random positions across the entire screen
  const randomX = Math.random() * window.innerWidth
  const randomY = Math.random() * window.innerHeight
  const randomEndX = randomX + (Math.random() * 200 - 100)
  const randomEndY = randomY + Math.random() * 300 + 100 // Mostly falling down
  const randomScale = Math.random() * 0.8 + 0.2
  const randomRotate = Math.random() * 360
  const randomDelay = Math.random() * 0.5
  const duration = 2 + Math.random() * 2

  // Color palette based on #2B7FFF
  const colors = [
    "bg-[#2B7FFF]", // Main secondary color
    "bg-blue-600",
    "bg-blue-500",
    "bg-blue-400",
    "bg-sky-500",
    "bg-slate-300",
    "bg-slate-200",
    "bg-white",
    "bg-[#1a65d4]", // Darker shade of #2B7FFF
    "bg-[#5599ff]", // Lighter shade of #2B7FFF
  ]

  const color = colors[index % colors.length]

  // Different shapes for some particles
  const isSquare = index % 8 === 0
  const isRect = index % 12 === 0
  const isLarge = index % 10 === 0

  return (
    <motion.div
      className={cn(
        "absolute",
        isSquare ? "w-3 h-3" : isRect ? "w-4 h-2" : isLarge ? "w-4 h-4" : "w-2 h-2",
        isSquare || isRect ? "" : "rounded-full",
        color,
      )}
      style={{
        top: randomY,
        left: randomX,
      }}
      initial={{ scale: 0, opacity: 1, rotate: 0 }}
      animate={{
        scale: [0, randomScale, randomScale * 0.8, 0],
        opacity: [0, 1, 1, 0],
        x: [0, randomEndX - randomX],
        y: [0, randomEndY - randomY],
        rotate: [0, randomRotate],
      }}
      transition={{
        duration: duration,
        delay: randomDelay,
        ease: "easeOut",
      }}
    />
  )
}

// Failure mode: Rain drop particle
const RainParticle = ({ index }) => {
  // Generate random positions across the entire screen
  const randomX = Math.random() * window.innerWidth
  const randomY = -20 - Math.random() * 100 // Start above the screen
  const randomEndY = window.innerHeight + 50 // End below the screen
  const randomWidth = Math.random() * 2 + 1
  const randomHeight = Math.random() * 10 + 5
  const randomDelay = Math.random() * 3
  const duration = 1 + Math.random() * 1.5
  const opacity = 0.3 + Math.random() * 0.7

  return (
    <motion.div
      className="absolute bg-slate-300/70 rounded-b-full"
      style={{
        top: randomY,
        left: randomX,
        width: `${randomWidth}px`,
        height: `${randomHeight}px`,
        opacity: opacity,
      }}
      initial={{ y: 0 }}
      animate={{ y: randomEndY }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: randomDelay,
        ease: "linear",
      }}
    />
  )
}

// Success Badge
const SuccessBadge = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center w-32 h-32 mb-4"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      }}
    >
      {/* Subtle pulsing glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#2B7FFF]/40 to-blue-600/30 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Badge background with #2B7FFF color */}
      <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-[#2B7FFF] to-blue-700 rounded-full shadow-lg border border-blue-400/20">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
          }}
        >
          <Award className="w-16 h-16 text-white drop-shadow-lg" />
        </motion.div>

        {/* Subtle shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
        />
      </div>

      {/* Subtle star accents */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div key={i} className="absolute" initial={{ rotate: i * 72, x: 60 }}>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
          >
            <Star className="w-4 h-4 text-blue-200 fill-blue-200" />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Failure Badge
const FailureBadge = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center w-32 h-32 mb-4"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      }}
    >
      {/* Subtle pulsing glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-gray-700/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Badge background with red color */}
      <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-red-600 to-gray-800 rounded-full shadow-lg border border-red-900/30">
        <motion.div
          animate={{
            scale: [1, 0.95, 1],
          }}
          transition={{
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
          }}
        >
          <XCircle className="w-16 h-16 text-white drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Rain cloud accents */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: i === 0 ? -40 : i === 1 ? -30 : -35,
            left: i === 0 ? -30 : i === 1 ? 30 : 0,
          }}
        >
          <motion.div
            animate={{
              y: [0, 3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          >
            <CloudRain className={`w-8 h-8 text-gray-500 ${i === 1 ? "opacity-70" : i === 2 ? "opacity-40" : ""}`} />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}


export default function BadgeEarnedModal({ success = true }) {
  const [isOpen, setIsOpen] = useState(false)
  const [particles, setParticles] = useState([])

  // Demo toggle for the modal
  const toggleModal = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setParticles(Array.from({ length: success ? 200 : 100 }, (_, i) => i))
    }
  }

  // Auto-show the modal on first render for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
      setParticles(Array.from({ length: success ? 200 : 100 }, (_, i) => i))
    }, 1000)

    return () => clearTimeout(timer)
  }, [success])

  return (


      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md",
              success ? "bg-black/80" : "bg-black/90",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Full-screen particles container */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {success
                ? particles.map((index) => <SuccessParticle key={index} index={index} />)
                : particles.map((index) => <RainParticle key={index} index={index} />)}
            </div>

            <motion.div
              className={cn(
                "relative w-full max-w-md p-6 overflow-hidden bg-gray-900 rounded-lg shadow-2xl",
                success ? "border border-[#2B7FFF]/30" : "border border-red-900/30",
              )}
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute text-gray-400 right-2 top-2 hover:text-white hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="flex flex-col items-center justify-center">
                {success ? <SuccessBadge /> : <FailureBadge />}

                <motion.div
                  className="mb-2 text-xl font-bold text-center text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  {success ? "Achievement Unlocked!" : "Challenge Failed"}
                </motion.div>

                <motion.div
                  className={cn(
                    "mb-6 text-2xl font-extrabold text-center text-transparent bg-clip-text",
                    success
                      ? "bg-gradient-to-r from-[#2B7FFF] via-blue-400 to-sky-400"
                      : "bg-gradient-to-r from-red-500 via-red-400 to-gray-400",
                  )}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 500 }}
                >
                  {success ? "Master Coder" : "Try Again"}
                </motion.div>

                <motion.p
                  className="mb-6 text-center text-gray-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {success
                    ? "You've completed 100 coding challenges! Your dedication to improving your skills is truly impressive."
                    : "You didn't complete the challenge this time. Don't worry, every attempt brings you closer to mastery."}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                  <Button
                    className={cn(
                      "font-bold text-white",
                      success ? "bg-[#2B7FFF] hover:bg-[#1a65d4]" : "bg-red-600 hover:bg-red-700",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {success ? "Awesome!" : "Try Again"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
  )
}
