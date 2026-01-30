'use client'

import type { FuseResultMatch } from 'fuse.js'

interface HighlightMatchProps {
  text: string
  matches?: readonly FuseResultMatch[]
}

export function HighlightMatch({ text, matches }: HighlightMatchProps) {
  if (!matches || matches.length === 0) {
    return <>{text}</>
  }

  // Collect all matched character indices from the 'label' key
  const matchedIndices = new Set<number>()
  for (const match of matches) {
    if (match.key === 'label' && match.value === text) {
      for (const [start, end] of match.indices) {
        for (let i = start; i <= end; i++) {
          matchedIndices.add(i)
        }
      }
    }
  }

  if (matchedIndices.size === 0) {
    return <>{text}</>
  }

  // Build segments of highlighted and non-highlighted text
  const segments: { text: string; highlighted: boolean }[] = []
  let current = ''
  let currentHighlighted = matchedIndices.has(0)

  for (let i = 0; i < text.length; i++) {
    const isHighlighted = matchedIndices.has(i)
    if (isHighlighted !== currentHighlighted) {
      if (current) segments.push({ text: current, highlighted: currentHighlighted })
      current = text[i]
      currentHighlighted = isHighlighted
    } else {
      current += text[i]
    }
  }
  if (current) segments.push({ text: current, highlighted: currentHighlighted })

  return (
    <>
      {segments.map((segment, i) =>
        segment.highlighted ? (
          <mark key={i} className="bg-transparent text-primary font-semibold">
            {segment.text}
          </mark>
        ) : (
          <span key={i}>{segment.text}</span>
        )
      )}
    </>
  )
}
