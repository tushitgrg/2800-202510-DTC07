"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthButton from "./AuthButton";

/**
 * Navbar component
 * Renders the site header with logo, navigation links, authentication button,
 * and a responsive mobile menu with animations.
 *
 * @component
 * @returns {JSX.Element} The navigation header element
 */
const Navbar = () => {
  // List of top-level menu items
  const menuItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/community", label: "Community" },
    { href: "/pomodoro", label: "Pomodoro" },
    { href: "/about", label: "About Us" },
  ];

  // Framer Motion container variants for staggering
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Framer Motion item variants for fade-up animation
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // State to detect if page is scrolled down
  const [isScrolled, setIsScrolled] = useState(false);
  // State to toggle mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Effect to update isScrolled on window scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full px-3 flex flex-col items-center backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo linking to home */}
        <a className="flex items-center gap-2 font-bold" href="/">
          <img src="/header-icon.svg" className="w-10 h-10" />
          <span className="text-2xl">Scholiast</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex gap-8">
          {menuItems.map((i) => (
            <Link
              href={i.href}
              key={i.label}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth button */}
        <div className="hidden md:flex items-center">
          <AuthButton />
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop and animated overlays */}
            <motion.div className="absolute inset-0 bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black/50 to-purple-900/20"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            {/* Animated decorative circles */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Close button */}
            <div className="absolute top-4 right-4 z-50">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="size-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {/* Menu links and AuthButton in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center gap-8 text-center w-full max-w-sm px-4"
              >
                {/* Logo at top of menu */}
                <Link href="/">
                  <motion.div variants={item} className="flex items-center gap-2 font-bold text-2xl">
                    <img src="/header-icon.svg" className="w-10 h-10" />
                    <span>Scholiast</span>
                  </motion.div>
                </Link>
                {/* Menu items */}
                {menuItems.map((link, i) => (
                  <motion.div key={i} variants={item} className="w-full">
                    <Link
                      href={link.href}
                      className="py-3 text-xl font-medium block hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Auth button at bottom */}
                <motion.div variants={item} className="w-full mt-6">
                  <AuthButton className="w-full text-lg px-8 py-6" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
