'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from '@/hooks'

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const DOT_COUNT = 72
const CONNECTION_DISTANCE = 120
const MOUSE_RADIUS = 180
const MOUSE_FORCE = 0.02
const SPEED = 0.18
const SEPARATION_DISTANCE = 30
const SEPARATION_FORCE = 0.05

export function Constellation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)
  const sizeRef = useRef({ w: 0, h: 0 })
  const reducedMotion = useReducedMotion()

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = []
    for (let i = 0; i < DOT_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * SPEED * (0.5 + Math.random() * 0.5),
        vy: Math.sin(angle) * SPEED * (0.5 + Math.random() * 0.5),
        radius: Math.random() * 1.5 + 0.8,
      })
    }
    dotsRef.current = dots
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      sizeRef.current = { w: rect.width, h: rect.height }
      if (dotsRef.current.length === 0) {
        initDots(rect.width, rect.height)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    if (reducedMotion) {
      const rect = canvas.getBoundingClientRect()
      const isDark = document.documentElement.classList.contains('dark')
      const dotColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'
      const lineColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'

      ctx.clearRect(0, 0, rect.width, rect.height)
      for (const dot of dotsRef.current) {
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.fill()
      }
      for (let i = 0; i < dotsRef.current.length; i++) {
        for (let j = i + 1; j < dotsRef.current.length; j++) {
          const dx = dotsRef.current[i].x - dotsRef.current[j].x
          const dy = dotsRef.current[i].y - dotsRef.current[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(dotsRef.current[i].x, dotsRef.current[i].y)
            ctx.lineTo(dotsRef.current[j].x, dotsRef.current[j].y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      return () => {
        window.removeEventListener('resize', resize)
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    const animate = () => {
      const { w, h } = sizeRef.current
      const isDark = document.documentElement.classList.contains('dark')
      const dotColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.18)'
      const lineColor = isDark ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,'

      ctx.clearRect(0, 0, w, h)

      const mouse = mouseRef.current
      const dots = dotsRef.current

      // Update dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        // Separation — push away from nearby dots
        for (let j = 0; j < dots.length; j++) {
          if (i === j) continue
          const sx = dot.x - dots[j].x
          const sy = dot.y - dots[j].y
          const sDist = Math.sqrt(sx * sx + sy * sy)
          if (sDist < SEPARATION_DISTANCE && sDist > 0) {
            const push = (SEPARATION_DISTANCE - sDist) / SEPARATION_DISTANCE
            dot.vx += (sx / sDist) * push * SEPARATION_FORCE
            dot.vy += (sy / sDist) * push * SEPARATION_FORCE
          }
        }

        // Mouse interaction
        const dx = mouse.x - dot.x
        const dy = mouse.y - dot.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          dot.vx += (dx / dist) * force * MOUSE_FORCE
          dot.vy += (dy / dist) * force * MOUSE_FORCE
        }

        // Clamp speed
        const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy)
        if (speed > SPEED * 2) {
          dot.vx = (dot.vx / speed) * SPEED * 2
          dot.vy = (dot.vy / speed) * SPEED * 2
        }
        // Gently return to base speed if too fast from mouse push
        if (speed > SPEED) {
          dot.vx *= 0.999
          dot.vy *= 0.999
        }

        dot.x += dot.vx
        dot.y += dot.vy

        // Wrap around edges
        if (dot.x < -10) dot.x = w + 10
        if (dot.x > w + 10) dot.x = -10
        if (dot.y < -10) dot.y = h + 10
        if (dot.y > h + 10) dot.y = -10

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.fill()
      }

      // Draw connections between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * (isDark ? 0.12 : 0.08)
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `${lineColor}${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Mouse connections
        const dx = mouse.x - dots[i].x
        const dy = mouse.y - dots[i].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS) {
          const opacity = (1 - dist / MOUSE_RADIUS) * (isDark ? 0.2 : 0.12)
          ctx.beginPath()
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `${lineColor}${opacity})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [initDots, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
