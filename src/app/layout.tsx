
import { Poppins } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DS Web',
  description: 'Personal dashboard and archive by Denys Skachko',
  authors: [{ name: 'Denys Skachko' }],
  icons: {
    icon: '/favicon.png',
  },
}

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  )
}
