import type { Metadata } from 'next'
import { fontVariables } from '@/lib/fonts'
import { ThemeProvider } from '@/components/shared'
import './globals.css'

export const metadata: Metadata = {
  title: 'Baptiste Morillon - Product Designer',
  description: 'Portfolio de Baptiste Morillon, Product Designer spécialisé B2B SaaS et Design Systems.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
