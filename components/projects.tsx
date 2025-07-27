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
        "Automate your school management with our comprehensive solution. Manage students, track performance, and generate report cards effortlessly.",
      image: "/student-using-esomero-system-by-bytebasetechnologies1.webp?height=400&width=600",
      tags: ["Featured", "Mobile App"],
      category: ["Web Apps", "SaaS", "Mobile"],
      techStack: ["React Native", "Firebase", "Node.js"],
      demoUrl: "https://youtu.be/TgDvh17cXlg?si=Q6BsCkbMszMK4YZ9",
      githubUrl: "https://github.com/AdamUzDel/eSomeroPlatform",
      caseStudyUrl: "https://www.bytebasetech.com/products/esomero",
    },
    {
      id: "sacco-app",
      title: "SACCO App",
      description: "Financial management platform for Savings and Credit Cooperative Organizations in East Africa.",
      image: "/sacco-app-flyer-bytebasetechnologies.webp?height=400&width=600",
      tags: ["New", "Fintech"],
      category: ["Web Apps", "Mobile", "SaaS", "Fintech"],
      techStack: ["Next.js", "TypeScript", "Supabase"],
      demoUrl: "https://saccos.vercel.app",
      githubUrl: "https://github.com/AdamUzDel/SACCOS",
      caseStudyUrl: "https://www.bytebasetech.com/products/sacco-app",
    },
    {
      id: "bytebills",
      title: "ByteBills",
      description: "The all-in-one solution for creating professional invoices, receipts, delivery notes, and tracking your business performance.",
      image: "/ByteBills-Screenshot-By_BytebaseTech.png?height=400&width=600",
      tags: ["Business", "SaaS", "Productivity"],
      category: ["Web Apps", "mobile", "Productivity", "Fintech", "SaaS"],
      techStack: ["React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/AdamUzDel/ByteBills",
      caseStudyUrl: "https://bytebills.bytebasetech.com/",
    },
    {
      id: "ask-rhona",
      title: "Ask Rhona",
      description: "Need More Time for What Matters Most? Hire a Family Personal Assistant!. Let us handle the details, so you can focus on what truly matters.",
      image: "/ask-rhona-screenshot.webp?height=400&width=600",
      tags: ["AI", "Concierge"],
      category: ["AI", "Web Apps"],
      techStack: ["Python", "TensorFlow", "Flutter"],
      caseStudyUrl: "https://ask-rhona.com",
    },
    {
      id: "kambo-autos",
      title: "Kambo Autos",
      description: "Vehicle marketplace and management system for auto dealers in Kenya.",
      image: "/Kambo-Auto-Screenshot-by_BytebaseTech.png?height=400&width=600",
      tags: ["E-commerce", "Web App"],
      category: ["Web Apps", "SaaS", "E-commerce"],
      techStack: ["Next.js", "Tailwind CSS", "Prisma"],
      demoUrl: "#",
      githubUrl: "https://github.com/AdamUzDel/KamboAutosV0",
      caseStudyUrl: "https://kamboautos-v0.vercel.app/",
    },
    {
      id: "elearning-platform",
      title: "eLearning Platform",
      description: "Comprehensive learning management system for schools and educational institutions.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Education", "Mobile", "Coming Soon"],
      category: ["Web Apps", "SaaS", "Mobile", "Education"],
      techStack: ["Next.js", "TypeScript", "Supabase"],
    },
    {
      id: "dclbox",
      title: "Decentralized Community Learning Box (DCLBox)",
      description: "Solar-powered, offline micro-learning server with AI tutoring, delivering localized education to remote African areas via Wi-Fi on smartphones, using Flutter apps and Linux edge devices.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Education", "Coming Soon"],
      category: ["Web Apps", "SaaS", "Mobile", "AI", "Education"],
      techStack: ["Flutter/Dart", "Flask/Python", "HTML/CSS", "Bash"],
      githubUrl: "https://github.com/AdamUzDel/DCLBox",
    },
    {
      id: "edka-safaris",
      title: "EdKaSafaris",
      description: "Edka Safaris and Adventure is a tours and adventure company based in Uganda, East Africa. We are strategically located in Kampala, the economic heart beat of Uganda but we also work with agents acr…",
      image: "/edkasafaris-screenshot-by_BytebaseTech.png?height=400&width=600",
      tags: ["Adventure", "Safaris", "Tours and Travel"],
      category: ["Web Apps", "Safaris"],
      techStack: ["Next.js", "TypeScript", "Supabase"],
      githubUrl: "https://github.com/AdamUzDel/DCLBox",
      caseStudyUrl: "https://edkasafaris.com/",
    },
    {
      id: "path-of-yasuke",
      title: "PathOfYasuke",
      description: "“Path of Yasuke” is a gamified self-mastery app that helps users build discipline, resilience, cultural knowledge, and personal excellence using the story, symbolism, and virtues of Yasuke.",
      image: "/path-of-yasuke-bytebasetech.png?height=400&width=600",
      tags: ["Lifestyle", "Productivity"],
      category: ["Web Apps", "SaaS", "Mobile", "AI", "Productivity"],
      techStack: ["Nextjs", "Typescript", "Gemini AI", "Firebase"],
      githubUrl: "https://github.com/AdamUzDel/DCLBox",
      caseStudyUrl: "https://pathofyasuke.vercel.app",
    },
    {
      id: "jua-market",
      title: "Jua Market",
      description: "Let’s not just digitize shopping — let’s revolutionize how people discover, trust, and interact with commerce. The goal is not just to build an Amazon clone, but to do what Amazon never could — ser…",
      image: "/jua-market-bytebasetech.png?height=400&width=600",
      tags: [ "E-commerce", "Productivity", "Coming Soon"],
      category: ["Web Apps", "SaaS", "Mobile", "AI", "E-commerce"],
      techStack: ["Nextjs", "Typescript", "Gemini AI", "Supabase"],
      githubUrl: "https://github.com/AdamUzDel/JuaMarket",
      caseStudyUrl: "https://juamarket.vercel.app/",
    },
    {
      id: "byte-tasks",
      title: "Byte Tasks",
      description: "Not your usual todo list or task manager, this one is targeted to improve work EFFICIENCY. Manage your tasks at work using an efficiency dashboard and AI-Powered analysis and recommendations.",
      image: "/byte-tasks-BytebaseTech.png?height=400&width=600",
      tags: ["Lifestyle", "Productivity"],
      category: ["Web Apps", "Mobile", "SaaS", "AI", "Productivity"],
      techStack: ["Nextjs", "Typescript", "Gemini AI", "Supabase"],
      githubUrl: "https://github.com/AdamUzDel/ByteTasks",
      caseStudyUrl: "https://byte-tasks-sigma.vercel.app/",
    },
    {
      id: "riyadh-barista-school",
      title: "Riyadh Barista School",
      description: "Join Riyadh Barista Training School and master the art of coffee in Uganda and beyond. Our expert-led courses will transform your passion into a thriving career.",
      image: "/riyadh-barista-school-bytebaseTech.png?height=400&width=600",
      tags: ["Education", "Web App"],
      category: ["Web Apps", "Education"],
      techStack: ["Nextjs", "Typescript", "Node Mailer"],
      caseStudyUrl: "https://riyadhbaristaschool.com",
    },
    {
      id: "mexus-holdings",
      title: "Mexus Holdings International",
      description: "A modern, responsive investment platform website built for Mexus Holdings International, facilitating investment opportunities across East Africa's key economic sectors.",
      image: "/mexus-holdings-screenshot-bytebaseTech.png?height=400&width=600",
      tags: ["Investment", "Business", "Web App"],
      category: ["Web Apps", "Investment"],
      techStack: ["Nextjs", "Typescript", "Formspree"],
      githubUrl: "https://github.com/AdamUzDel/MexusHoldings",
      caseStudyUrl: "https://www.mexusholdings.com/",
    },
    {
      id: "sauti-wallet",
      title: "Sauti Wallet",
      description: "SautiWallet is a clean, modern, and mobile-first user interface for a fintech app. SautiWallet is an AI-powered mobile wallet for underserved communities in Uganda and East Africa. It emphasizes vo…",
      image: "/sauti-wallet-BytebaseTech.png?height=400&width=600",
      tags: ["Fintech", "Mobile", "Web App", "AI"],
      category: ["Web Apps", "SaaS", "Mobile", "Fintech", "AI"],
      techStack: ["Nextjs", "Typescript", "GrokAI", "FlutterWave", "Gemini", "PLpgSQL"],
      githubUrl: "https://github.com/AdamUzDel/SautiWallet",
      caseStudyUrl: "https://sauti-wallet.vercel.app",
    },
    {
      id: "igourd-redesign",
      title: "iGourd Web Redesign",
      description: "Revolutionize Your Business with Our POS Solutions From hardware to software, we empower businesses of all sizes with cutting-edge tools to streamline operations and boost sales.",
      image: "/iGourd-POS-BytebaseTech.png?height=400&width=600",
      tags: ["Fintech", "Web App", "Multi-Lingual"],
      category: ["Web Apps", "Fintech", "E-commerce"],
      techStack: ["Nextjs", "Typescript"],
      githubUrl: "https://github.com/AdamUzDel/igourd-redesign",
      caseStudyUrl: "https://v0-igourd-idjwbii4nm7.vercel.app/zh",
    },
    {
      id: "kisowera-secondary-school",
      title: "Kisowera Secondary School",
      description: "Since our establishment in 1985, Kisowera Secondary School has been at the forefront of educational excellence in Uganda. What started as a small community school has grown into a prestigious institution, nurturing generations of leaders, innovators, and change-makers.",
      image: "/KisoweraSS-BytebaseTech.png?height=400&width=600",
      tags: ["Education", "Web App"],
      category: ["Web Apps", "Education"],
      techStack: ["Nextjs", "Typescript"],
      githubUrl: "https://github.com/AdamUzDel/KisoweraSecondarySchool",
      caseStudyUrl: "https://kisowera-secondary-school.vercel.app/",
    },
    {
      id: "natu-chefs",
      title: "Natu Chefs",
      description: "Hire a Personal Chef in Kampala. Experience authentic Ugandan cuisine in the comfort of your home",
      image: "/natuchefs-BytebaseTech.png?height=400&width=600",
      tags: ["Hotel", "Restaurant", "Hire a Chef"],
      category: ["Web Apps", "Productivity"],
      techStack: ["Nextjs", "Typescript", "Firebase"],
      githubUrl: "https://github.com/AdamUzDel/NatuChefs",
      caseStudyUrl: "https://natuchefs.bytebasetech.com/",
    },
    {
      id: "ssenyonga-happy-hevert",
      title: "Ssenyonga Happy Hevert",
      description: "Ssanyonga Happy Hervet Co. Ltd is one of Uganda’s leading agricultural companies dedicated to sustainable farming practices. We focus on cultivating high-quality crops and maintaining exceptional customer satisfaction.",
      image: "/ssenyonga-happy--hervet-BytebaseTech.png?height=400&width=600",
      tags: ["Agriculture", "Web Apps", "Sustainable Farming"],
      category: ["Web Apps", "Agriculture"],
      techStack: ["Nextjs", "Typescript"],
      caseStudyUrl: "https://ssanyongahappyhervet.com/",
    },
    {
      id: "black-jack-publishers",
      title: "Blackjack Publishers Ltd",
      description: "Blackjack Publishers Ltd was established in 2011 by Salome Akwi with a passion for Literature, technology and art. She wanted to share her interests with the rest of the Ugandan society and beyond by producing interesting storybooks, educational books, adult literature as well as promote local writers.",
      image: "/black-jack-publishers-BytebaseTech.png?height=400&width=600",
      tags: ["Publishing", "Web Apps", "Bookstore"],
      category: ["Web Apps", "Education", "Productivity"],
      techStack: ["HTML/CSS", "Javascript", "Bootstrap", "Firebase"],
      caseStudyUrl: "https://blackjackpublishers.com/",
    },
    {
      id: "mrcarrentalug",
      title: "Mr Car Rental UG",
      description: "Self drive experience. We make it possible for you to enjoy the East African trip with only capable vehicles",
      image: "/mr-car-rental-ug-BytebaseTech.png?height=400&width=600",
      tags: ["Safaris", "Web Apps", "Car Rental"],
      category: ["Web Apps", "Safaris"],
      techStack: ["HTML/CSS", "Javascript", "Bootstrap"],
      caseStudyUrl: "https://mrcarrental-uganda.web.app/",
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
