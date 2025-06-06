"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  title: string
  description: string
  image: string
  link?: string
  status: "live" | "beta" | "coming-soon"
}

export function Products() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const products: Product[] = [
    {
      id: "e-somero",
      title: "e-Somero",
      description:
        "Digital marketplace connecting farmers directly to buyers, eliminating middlemen and ensuring fair prices.",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
      status: "live",
    },
    {
      id: "sacco-app",
      title: "SACCO App",
      description: "Financial management platform for Savings and Credit Cooperative Organizations in East Africa.",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
      status: "beta",
    },
    {
      id: "bytebills",
      title: "ByteBills",
      description: "Automated invoicing and payment tracking system for small businesses and freelancers.",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
      status: "live",
    },
    {
      id: "ai-chatbot",
      title: "AI Chatbot",
      description: "Intelligent virtual assistant for businesses to engage with customers and provide instant support.",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
      status: "beta",
    },
    {
      id: "elearning-platform",
      title: "eLearning Platform",
      description: "Comprehensive learning management system for schools and educational institutions.",
      image: "/placeholder.svg?height=300&width=400",
      status: "coming-soon",
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-500">
            Live
          </span>
        )
      case "beta":
        return (
          <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-500">
            Beta
          </span>
        )
      case "coming-soon":
        return (
          <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-500">
            Coming Soon
          </span>
        )
      default:
        return null
    }
  }

  return (
    <section id="products" className="py-20 md:py-32 bg-muted/30" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover BytebaseTech's suite of innovative products designed to solve real-world challenges.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative h-full bg-background/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg">
                  {getStatusBadge(product.status)}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    {product.link && (
                      <Button variant="outline" size="sm" className="group/btn" asChild>
                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                          Learn More{" "}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white shadow-lg"
            asChild
          >
            <a href="https://bytebasetech.com" target="_blank" rel="noopener noreferrer">
              Visit BytebaseTech <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
