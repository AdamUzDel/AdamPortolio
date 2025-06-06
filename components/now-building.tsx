"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, X } from "lucide-react"

export function NowBuilding() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

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

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-background border border-border rounded-lg shadow-lg z-50"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Code2 className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Now Building</h3>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>eLearning Platform</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Currently working on a comprehensive eLearning platform for schools in East Africa.
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
