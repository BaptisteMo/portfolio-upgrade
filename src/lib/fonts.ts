import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
// import localFont from 'next/font/local'

/**
 * Font Configuration for Portfolio
 *
 * Currently using Google Fonts for all typefaces.
 * To use local Satoshi font:
 * 1. Download Satoshi from https://www.fontshare.com/fonts/satoshi
 * 2. Place .woff2 files in public/fonts/satoshi/
 * 3. Uncomment the localFont import and satoshiLocal config below
 * 4. Replace satoshi export with satoshiLocal
 */

// Satoshi replacement - Inter is geometrically similar
// TODO: Replace with local Satoshi when font files are available
export const satoshi = Inter({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
})

// Local Satoshi configuration (uncomment when font files are available)
// export const satoshiLocal = localFont({
//   src: [
//     {
//       path: '../../public/fonts/satoshi/Satoshi-Variable.woff2',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/satoshi/Satoshi-VariableItalic.woff2',
//       style: 'italic',
//     },
//   ],
//   variable: '--font-satoshi',
//   display: 'swap',
//   preload: true,
// })

// Fraunces - Display/Serif font for body content
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

// JetBrains Mono - Monospace font for code
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// Font CSS class string for root layout
export const fontVariables = `${satoshi.variable} ${fraunces.variable} ${jetbrainsMono.variable}`
