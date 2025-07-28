"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NowBuilding() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

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
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 1
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  // Auto-minimize on mobile after 5 seconds
  useEffect(() => {
    if (isMobile && isVisible && !isMinimized) {
      const timer = setTimeout(() => {
        setIsMinimized(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isMobile, isVisible, isMinimized])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: isMobile ? 0 : -100, y: isMobile ? 100 : 0, opacity: 0 }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
        }}
        exit={{
          x: isMobile ? 0 : -100,
          y: isMobile ? 100 : 0,
          opacity: 0,
        }}
        className={`
          fixed z-40
          ${isMobile ? "bottom-20 left-4 right-4" : "top-1/2 left-4 -translate-y-1/2 w-80"}
          ${isMinimized && isMobile ? "bottom-20 left-4 right-auto w-auto" : ""}
        `}
      >
        <div
          className={`
          bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg
          ${isMinimized && isMobile ? "p-3" : "p-4"}
          transition-all duration-300
        `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="relative">
                <Code2 className="h-5 w-5 text-primary mr-2" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              {(!isMinimized || !isMobile) && <h3 className="font-medium text-sm">Now Building</h3>}
            </div>

            <div className="flex items-center gap-1">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsVisible(false)}
                aria-label="Close"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Content - Hidden when minimized on mobile */}
          <AnimatePresence>
            {(!isMinimized || !isMobile) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-3"
              >
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">eLearning Platform</span>
                    <span className="text-muted-foreground">{progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Currently working on a comprehensive eLearning platform for schools in East Africa.
                  </p>

                  {/* Additional project info for desktop */}
                  {!isMobile && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>Next.js</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Supabase</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span>TypeScript</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimized state indicator for mobile */}
          {isMinimized && isMobile && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium">{progress}%</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
