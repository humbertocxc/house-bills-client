import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Contas de casa',
  description: 'Created by Humberto Gessinger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute top-0 right-0 w-screen h-4/6 bg-gradient-to-b from-bgInit/40 to-white -z-50 filter opacity-50" />
        {children}
      </body>
    </html>
  )
}
