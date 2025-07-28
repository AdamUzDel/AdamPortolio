"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Skill {
  name: string
  icon: string
  color: string
  description: string
}

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills: Skill[] = [
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "bg-black dark:bg-white",
      description: "React framework for production",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "bg-blue-400",
      description: "JavaScript library for building user interfaces",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "bg-blue-500",
      description: "Typed JavaScript at any scale",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "bg-green-600",
      description: "JavaScript runtime for server-side development",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "bg-red-500",
      description: "Object-oriented programming language",
    },
    {
      name: "Laravel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      color: "bg-red-600",
      description: "PHP framework for web artisans",
    },
    {
      name: "Firebase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      color: "bg-yellow-500",
      description: "App development platform",
    },
    {
      name: "Supabase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      color: "bg-green-500",
      description: "Open source Firebase alternative",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      color: "bg-cyan-500",
      description: "Utility-first CSS framework",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "bg-blue-700",
      description: "Programming language for AI & data",
    },
    {
      name: "Kotlin",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
      color: "bg-purple-600",
      description: "Modern programming language for Android",
    },
    {
      name: "Flutter",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      color: "bg-blue-400",
      description: "UI toolkit for building cross-platform apps",
    },
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

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of technologies I've mastered to build innovative solutions that solve real-world problems.
          </p>
        </motion.div>

        <TooltipProvider>
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div key={skill.name} variants={item}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                      <div className="w-16 h-16 mb-4 rounded-lg flex items-center justify-center bg-muted">
                        <img src={skill.icon || "/placeholder.svg"} alt={skill.name} className="w-10 h-10" />
                      </div>
                      <h3 className="font-medium">{skill.name}</h3>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{skill.description}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </motion.div>
        </TooltipProvider>
      </div>
    </section>
  )
}
