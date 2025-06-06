"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: string[]
  techStack: string[]
  demoUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
}

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [filter, setFilter] = useState<string>("all")

  const projects: Project[] = [
    {
      id: "e-somero",
      title: "e-Somero",
      description:
        "A digital marketplace connecting farmers to buyers, eliminating middlemen and ensuring fair prices.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Featured", "Mobile App"],
      category: ["Web Apps", "Mobile"],
      techStack: ["React Native", "Firebase", "Node.js"],
      demoUrl: "#",
      githubUrl: "#",
      caseStudyUrl: "#",
    },
    {
      id: "sacco-app",
      title: "SACCO App",
      description: "Financial management platform for Savings and Credit Cooperative Organizations in East Africa.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["New", "Fintech"],
      category: ["Web Apps", "Fintech"],
      techStack: ["Next.js", "TypeScript", "Supabase"],
      demoUrl: "#",
      caseStudyUrl: "#",
    },
    {
      id: "bytebills",
      title: "ByteBills",
      description: "Automated invoicing and payment tracking system for small businesses and freelancers.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Business", "SaaS"],
      category: ["Web Apps", "SaaS"],
      techStack: ["React", "Node.js", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "ask-rhona",
      title: "Ask Rhona",
      description: "AI-powered health assistant providing accessible medical information to underserved communities.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["AI", "Healthcare"],
      category: ["AI", "Mobile"],
      techStack: ["Python", "TensorFlow", "Flutter"],
      demoUrl: "#",
    },
    {
      id: "kambo-autos",
      title: "Kambo Autos",
      description: "Vehicle marketplace and management system for auto dealers in Kenya.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["E-commerce", "Web App"],
      category: ["Web Apps", "E-commerce"],
      techStack: ["Next.js", "Tailwind CSS", "Prisma"],
      demoUrl: "#",
      caseStudyUrl: "#",
    },
    {
      id: "elearning-platform",
      title: "eLearning Platform",
      description: "Comprehensive learning management system for schools and educational institutions.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Education", "Coming Soon"],
      category: ["Web Apps", "Education"],
      techStack: ["Next.js", "TypeScript", "Supabase"],
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category.includes(filter))

  const categories = ["all", ...Array.from(new Set(projects.flatMap((project) => project.category))).sort()]

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
    <section id="projects" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">🚀 Projects That Speak Innovation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work building solutions that empower communities and businesses across East Africa and
            beyond.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="overflow-hidden h-full border border-border hover:border-primary/50 transition-all hover:shadow-lg group">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    {project.demoUrl && (
                      <Button size="sm" variant="secondary" className="mr-2" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="mr-1 h-4 w-4" /> Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1 h-4 w-4" /> Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {project.caseStudyUrl && (
                    <Button variant="link" size="sm" className="ml-auto" asChild>
                      <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                        Case Study <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
