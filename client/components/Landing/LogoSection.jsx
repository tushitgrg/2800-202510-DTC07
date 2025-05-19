"use client";
import { motion } from "framer-motion";

/**
 * LogoSection component
 * 
 * Displays a section with a message and logos of institutions/brands.
 * Animates logos into view using Framer Motion when they appear in the viewport.
 *
 * @returns {JSX.Element} The rendered logo section component
 */
const LogoSection = () => {
  let images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/BCIT_logo.svg/1200px-BCIT_logo.svg.png",
  ];
  return (
    <section className="w-full py-12 border-y border-white/10 bg-black/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by students at top universities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {images.map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <img src={i} alt="" className="w-32" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
