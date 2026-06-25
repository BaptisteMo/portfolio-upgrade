'use client'

import { useEffect, useRef } from 'react'
import { slotText, type SlotOptions, type SlotTextController } from 'slot-text'
import 'slot-text/style.css'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import styles from './ContactGreeting.module.css'

const WORDS = ['Hey', 'Hello', 'Bonjour', 'Salut']
const EMOJIS = ['👋', '✌️', '🤘', '🤙'] // one per word — kept out of slot-text (it splits astral emoji)
const OPTS: SlotOptions = { direction: 'up', stagger: 48, duration: 340, bounce: 0.55, exitOffset: 40 }
const HOLD = 1700 // ms the word is held (static)

/**
 * "Me contacter" card. Idle = blank. On hover (or, on touch devices, when the
 * card scrolls into view) it cycles greetings with a slot-machine roll
 * (slot-text) and pops an emoji in after each word. On leave it rolls back to
 * blank. Reduced-motion shows a static word.
 */
export function ContactGreeting({ hovered, className }: { hovered: boolean; className?: string }) {
  const rollRef = useRef<HTMLSpanElement>(null)
  const emojiRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<SlotTextController | null>(null)
  const reduced = useReducedMotion()

  // mount the slot-text controller once. Start with a single space (not "") so a
  // slot always exists — otherwise slot-text "just builds" the first word with no
  // roll (empty container = instant). A space renders blank, so idle stays empty.
  useEffect(() => {
    const el = rollRef.current
    if (!el) return
    labelRef.current = slotText(el, ' ', OPTS)
    return () => {
      labelRef.current?.destroy()
      labelRef.current = null
    }
  }, [])

  // drive the cycle from the card's hover / in-view state
  useEffect(() => {
    const label = labelRef.current
    const emojiEl = emojiRef.current
    if (!label || !emojiEl) return

    const restart = (el: HTMLElement) => {
      el.style.animation = 'none'
      void el.offsetWidth
      el.style.animation = ''
    }

    // idle → roll back to blank (a space keeps a slot alive for the next roll-in)
    if (!hovered) {
      label.set(' ')
      emojiEl.textContent = ''
      emojiEl.classList.add(styles.rolling)
      return
    }

    // reduced motion → static greeting + emoji
    if (reduced) {
      label.set('Bonjour')
      emojiEl.textContent = EMOJIS[2]
      emojiEl.classList.remove(styles.rolling)
      return
    }

    let cycleId: number | undefined
    let emojiId: number | undefined

    const popEmoji = (idx: number) => {
      emojiEl.textContent = EMOJIS[idx]
      emojiEl.classList.remove(styles.rolling)
      restart(emojiEl)
    }

    const show = (idx: number, first: boolean) => {
      const word = WORDS[idx]
      const rollMs = OPTS.stagger! * Math.max(word.length, 1) + OPTS.duration!
      label.set(word)
      window.clearTimeout(emojiId)
      // first word: emoji pops in with it. Switches: emoji swaps a touch later.
      if (first) popEmoji(idx)
      else emojiId = window.setTimeout(() => popEmoji(idx), 220)
      cycleId = window.setTimeout(() => show((idx + 1) % WORDS.length, false), rollMs + HOLD)
    }
    show(0, true)

    return () => {
      window.clearTimeout(cycleId)
      window.clearTimeout(emojiId)
    }
  }, [hovered, reduced])

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 flex items-center justify-center', className)}
    >
      <span className={styles.greet}>
        <span ref={rollRef} className={styles.roll} />
        <span ref={emojiRef} className={styles.emoji} />
      </span>
    </div>
  )
}
