"use client"
import { motion } from "framer-motion"


const LogoSection = () => {
  return (
    <section className="w-full py-12 border-y border-white/10 bg-black/50">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <p className="text-sm font-medium text-muted-foreground">Trusted by students at top universities</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="h-8 w-24 bg-white/10 rounded-md flex items-center justify-center text-white/30 text-xs">
                LOGO {i}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
  )
}

export default LogoSection