"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import {  AnimatePresence, motion } from "framer-motion"
import {

  ChevronRight,
  Menu,
  X,

} from "lucide-react"
import { Button } from "@/components/ui/button"
import AuthButton from "./AuthButton"


const Navbar = () => {
    const menuItems = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/community", label: "Community" },
        { href: "/pomodoro", label: "Pomodoro" },
        { href: "/about", label: "About Us" },
      ]
    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }
    
      const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }
      const [isScrolled, setIsScrolled] = useState(false)
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 10) {
            setIsScrolled(true)
          } else {
            setIsScrolled(false)
          }
        }
    
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
      }, [])
    
    
      useEffect(() => {
        if (mobileMenuOpen) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = "auto"
        }
        return () => {
          document.body.style.overflow = "auto"
        }
      }, [mobileMenuOpen])
  return (
    <header
    className={`sticky top-0 z-50 w-full flex flex-col items-center backdrop-blur-lg transition-all duration-300 ${
      isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
    }`}
  >
    <div className="container flex h-16 items-center justify-between">
      <a className="flex items-center gap-2 font-bold" href="/">
       <img src="/header-icon.svg" className="w-10 h-10"/>
        <span className="text-2xl">Scholiast</span>
      </a>
      <nav className="hidden md:flex gap-8">
       {menuItems.filter((i)=>!i.className).map((i)=> <Link
          href={i.href}
          key={`k${i.label}`}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {i.label}
        </Link>)}
      
      </nav>
      <div className="hidden md:flex items-center">
      
       <AuthButton/>
      </div>
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </div>
    {/* Mobile menu */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 md:hidden"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100vw", height: "100vh" }}
        >
          {/* Full screen backdrop with gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />

          {/* Animated gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black/50 to-purple-900/20"
          />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

          {/* Animated circles */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
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

          {/* Menu content - centered both vertically and horizontally */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center justify-center gap-8 text-center w-full max-w-sm px-4"
            >
              <a href="/">
              <motion.div variants={item} className="flex items-center gap-2 font-bold text-2xl mb-8" >
             
       <img src="/header-icon.svg" className="w-10 h-10"/>
        <span className="text-2xl">Scholiast</span>
      
              </motion.div>

              </a>
              {menuItems.map((link, i) => (
                <motion.div key={i} variants={item} className={link.className || ""} style={{ width: "100%" }}>
                  <Link
                    href={link.href}
                    className="py-3 text-xl font-medium block hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={item} className="mt-6 w-full">
                <AuthButton className="w-full text-lg px-8 py-6"/> 
             
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </header>
  )
}

export default Navbar