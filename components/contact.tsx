"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, MessageSquare, Twitter, CheckCircle, AlertCircle } from "lucide-react"

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear any previous status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully! I'll get back to you soon.",
        })
        setFormState({ name: "", email: "", subject: "", message: "" })

        // Clear success message after 8 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" })
        }, 8000)
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
      })

      // Clear error message after 8 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" })
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/in/adamssemakula",
      color: "hover:bg-blue-600",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com/adamssemakula",
      color: "hover:bg-sky-500",
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/adamssemakula",
      color: "hover:bg-gray-800",
    },
    {
      name: "WhatsApp",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "https://wa.me/256700000000", // Replace with your actual WhatsApp number
      color: "hover:bg-green-600",
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out directly or through the form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center">
                  <div className="mr-4 p-2 rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">adamssemakula@gmail.com</p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 font-medium">Connect on social media</p>
                  <div className="flex space-x-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full bg-muted hover:text-white transition-colors ${link.color}`}
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-muted-foreground">
                    Based in Nairobi, Kenya. Available for remote work and collaborations worldwide.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="focus-visible:ring-primary"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="focus-visible:ring-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="focus-visible:ring-primary"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="min-h-32 focus-visible:ring-primary"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2 p-3 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      )}
                      <p className="text-sm">{submitStatus.message}</p>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
