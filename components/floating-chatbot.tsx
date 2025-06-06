"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, X } from "lucide-react"
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hi there! I'm Adam's AI assistant. How can I help you learn more about BytebaseTech?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

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

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "BytebaseTech specializes in creating innovative software solutions for businesses and communities in East Africa.",
        "Our flagship products include e-Somero, SACCO App, and ByteBills.",
        "Adam is the founder and CEO of BytebaseTech, with expertise in UI/UX, full-stack development, and AI innovation.",
        "We're currently working on an eLearning platform to improve education access in underserved communities.",
        "Feel free to reach out through the contact form if you'd like to discuss a project or collaboration!",
      ]
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-4 w-80 md:w-96 h-96 bg-background border border-border rounded-lg shadow-lg z-50 flex flex-col"
          >
            <div className="p-3 border-b flex items-center justify-between bg-muted/50">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" alt="BytebaseTech AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">BytebaseTech Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about BytebaseTech..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg flex items-center justify-center z-50"
        aria-label="Chat with BytebaseTech AI"
      >
        <Bot className="h-6 w-6" />
      </motion.button>
    </>
  )
}
