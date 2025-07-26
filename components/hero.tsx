"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { TypeAnimation } from "react-type-animation"

export function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToNext = () => {
    if (scrollRef.current) {
      const nextSection = document.getElementById("skills")
      nextSection?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
      ref={scrollRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4"
        >
          Hi, I'm{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500">Adam</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl font-medium text-muted-foreground mb-6"
        >
          <TypeAnimation
            sequence={["Software Developer", 1000, "Tech Entrepreneur", 1000, "AI Enthusiast", 1000]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-[600px] text-muted-foreground mb-8"
        >
          Crafting innovative web experiences that empower communities through technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white shadow-lg group"
            asChild
          >
            <a href="#projects">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">Let's Connect</a>
          </Button>
        </motion.div>
      </div>

      {/* Animated Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 mb-8 relative"
      >
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 p-1">
          <div className="w-full h-full rounded-full overflow-hidden bg-background flex items-center justify-center">
            <img src="/adam-pic.jpg?height=256&width=256" alt="Adam potrait photo" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-2">
          <div className="w-8 h-8 rounded-full bg-green-500 animate-pulse" />
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8"
      >
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </motion.div>
    </section>
  )
}
