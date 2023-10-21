import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DataProvider } from '@/components/providers/content-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Farm360',
  description: 'Boosting farmers accessibitlity to tools, warehouses and modern farming terminologies with the help of AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <DataProvider>
            {children}
          </DataProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
