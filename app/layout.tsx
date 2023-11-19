import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/NavBar/NavBar'

const inter = Inter({ subsets: ['latin'] })
const SpaceGrtaesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'PriceScrapper',
  description: 'Practicing Web Scrtapping building a pricewise page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='max-w-10x1 mx-auto'>
          <Navbar />
          {children}
        </main>
        </body>
    </html>
  )
}
