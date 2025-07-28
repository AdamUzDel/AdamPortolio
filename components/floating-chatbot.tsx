"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, X, MessageCircle, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hi there! I'm Adam's AI assistant. How can I help you learn more about BytebaseTech?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(
      () => {
        const botResponses = [
          "BytebaseTech specializes in creating innovative software solutions for businesses and communities in East Africa. 🚀",
          "Our flagship products include e-Somero, SACCO App, and ByteBills. Each designed to solve real-world problems! 💡",
          "Adam is the founder and CEO of BytebaseTech, with expertise in UI/UX, full-stack development, and AI innovation. 👨‍💻",
          "We're currently working on an eLearning platform to improve education access in underserved communities. 📚",
          "Feel free to reach out through the contact form if you'd like to discuss a project or collaboration! 📧",
          "I can help you learn more about our projects, technologies we use, or how we can help your business grow! 🌟",
        ]
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

        const botMessage: Message = {
          id: Date.now().toString(),
          content: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay for more natural feel
  }

  const getChatPosition = () => {
    if (isMobile) {
      return isMinimized ? "bottom-4 right-4 w-auto h-auto" : "bottom-4 left-4 right-4 h-[70vh] max-h-96"
    }
    return isMinimized ? "bottom-4 right-4 w-auto h-auto" : "bottom-4 right-4 w-80 md:w-96 h-[32rem]"
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed z-50 ${getChatPosition()}`}
          >
            <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-xl flex flex-col h-full">
              {/* Header */}
              <div className="p-3 border-b flex items-center justify-between bg-muted/30 rounded-t-xl">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="BytebaseTech AI" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  {!isMinimized && (
                    <div>
                      <h3 className="font-medium text-sm">BytebaseTech Assistant</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-xs text-muted-foreground">Online</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Content - Hidden when minimized */}
              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3 max-w-[85%]">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about BytebaseTech..."
                      className="flex-1 text-sm"
                      disabled={isTyping}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim() || isTyping}
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen)
          setIsMinimized(false)
        }}
        className={`
          fixed z-50 h-12 w-12 md:h-14 md:w-14 rounded-full 
          bg-gradient-to-r from-purple-600 to-cyan-500 
          hover:from-purple-700 hover:to-cyan-600
          text-white shadow-lg flex items-center justify-center
          transition-all duration-200
          ${isMobile ? "bottom-4 right-4" : "bottom-4 right-4"}
        `}
        aria-label="Chat with BytebaseTech AI"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="h-5 w-5 md:h-6 md:w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </motion.button>
    </>
  )
}
