"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  id: string
  content: string
  author: string
  role: string
  company: string
  avatar?: string
}

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials: Testimonial[] = [
    {
      id: "1",
      content:
        "Adam's work on our e-learning platform transformed how we deliver education. The intuitive design and robust functionality have significantly improved student engagement and learning outcomes.",
      author: "Sarah Kamau",
      role: "Principal",
      company: "Loyola Secondary School",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      content:
        "BytebaseTech's SACCO App revolutionized our financial operations. The platform is secure, user-friendly, and has helped us grow our membership by 40% in just six months.",
      author: "John Mwangi",
      role: "Chairman",
      company: "Umoja SACCO",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      content:
        "Working with Adam on our e-commerce solution was a game-changer. His technical expertise and understanding of our market needs resulted in a platform that has doubled our sales in the first quarter.",
      author: "Grace Ochieng",
      role: "CEO",
      company: "Savanna Crafts",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setAutoplay(false)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoplay(false)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what our clients have to say about working with BytebaseTech.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted/50">
                    <CardContent className="p-8">
                      <Quote className="h-10 w-10 text-primary/40 mb-4" />
                      <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                          <AvatarFallback>
                            {testimonial.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setAutoplay(false)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background hidden md:flex"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background hidden md:flex"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
