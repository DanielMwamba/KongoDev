import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'


export default function Loader({ fullScreen = false }) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50"
    : "relative w-full h-full min-h-[200px]"

  return (
    <div className={`${containerClasses} flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm`}>
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 text-primary" />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-2 w-2 bg-secondary rounded-full" />
          </motion.div>
        </div>
        <motion.h2
          className="text-foreground text-xl font-bold mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Chargement...
        </motion.h2>
      </motion.div>
      <span className="sr-only">Chargement en cours</span>
    </div>
  )
}