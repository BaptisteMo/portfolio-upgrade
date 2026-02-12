'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="relative overflow-hidden" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Passer en mode ${isDark ? 'clair' : 'sombre'}`}
      className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inline-flex"
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inline-flex"
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}
