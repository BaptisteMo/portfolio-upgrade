const rateMap = new Map<string, number[]>()
let lastCleanup = Date.now()
const CLEANUP_INTERVAL = 300_000 // 5 minutes

function cleanup(windowMs: number) {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [ip, timestamps] of rateMap) {
    const valid = timestamps.filter((t) => now - t < windowMs)
    if (valid.length === 0) {
      rateMap.delete(ip)
    } else {
      rateMap.set(ip, valid)
    }
  }
}

export function rateLimit(
  ip: string,
  limit = 5,
  windowMs = 60_000
): { success: boolean; remaining: number } {
  cleanup(windowMs)
  const now = Date.now()
  const timestamps = (rateMap.get(ip) ?? []).filter((t) => now - t < windowMs)

  if (timestamps.length >= limit) {
    rateMap.set(ip, timestamps)
    return { success: false, remaining: 0 }
  }

  timestamps.push(now)
  rateMap.set(ip, timestamps)
  return { success: true, remaining: limit - timestamps.length }
}
