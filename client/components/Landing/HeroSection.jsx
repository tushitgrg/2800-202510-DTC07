"use client";

import { useRef, useState, useEffect } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Check,
  ArrowRight,
  Brain,
  FileText,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

/**
 * HeroSection component
 *
 * This is the hero section of the homepage, featuring:
 * - Scroll-based animation
 * - Abstract animated background
 * - Animated text and icons
 * - Introduction to AI-powered learning features
 *
 * @returns {JSX.Element} The rendered hero section
 */
const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div></div>;
  return (
    <section
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
      ref={heroRef}
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl opacity-60"
          animate={{
            x: [0, -20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl opacity-60"
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/3 w-40 h-40 rounded-full bg-pink-600/20 blur-3xl opacity-60"
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Animated 3D grid */}
      <div className="absolute inset-0 -z-5 perspective-1000">
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [0, 5, 0],
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {/* Horizontal lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`h-line-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              style={{ top: `${10 + i * 8}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}

          {/* Vertical lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`v-line-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
              style={{ left: `${10 + i * 8}%` }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -30 - 10, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Abstract geometric shape */}
        <motion.div
          className="relative mb-12 w-32 h-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-purple-600"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-2 rounded-2xl bg-black"
            animate={{ rotate: -360 }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Sparkles className="size-10 text-primary" />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Badge
            className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            AI-Powered Learning
          </Badge>
        </motion.div>

        {/* Heading with animated text reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Learn Smarter
            </span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            with AI Superpowers
          </motion.h2>
        </div>

        {/* Description */}
        <motion.p
          className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Scholiast transforms how you study with AI-generated quizzes,
          flashcards, and summaries. Master any subject in half the time.
        </motion.p>

        {/* Animated cards */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { icon: <Brain className="size-6" />, label: "Smart Quizzes" },
            { icon: <Lightbulb className="size-6" />, label: "Flashcards" },
            { icon: <FileText className="size-6" />, label: "Summaries" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-full border border-white/10"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-primary">{item.icon}</div>
              <span className="font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link href="/dashboard">
            <Button
              size="lg"
              className="rounded-full h-14 px-8 text-base relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <span className="relative z-10 font-medium">Start Now!</span>
              <ArrowRight className="ml-2 size-5 relative z-10" />
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-14 px-8 text-base relative overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <span className="relative z-10 font-medium">Watch Demo</span>
          </Button>
        </motion.div>

        {/* Features list */}
        <motion.div
          className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {[
            "Upload or Paste Any Material",
            "Auto-Generate Learning Aids",
            "Study Smarter, Not Harder",
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Check className="size-4 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-center justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
