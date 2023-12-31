
import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UserProvider from '@/context/userProvider'
import BusinessProvider from '@/context/businessProvider'
import ProductsProvider from '@/context/productsProvider'
import { OrdersProvider } from '@/context/ordersProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LandingNavBar from '@/components/landing-navbar'
import { usePathname } from 'next/navigation'
import LoginToaster from '@/components/login-toaster'
import { useEffect } from 'react'
import DetectedUserProvider from '@/context/detectedUserProvider'
import NavBarContainer from '@/components/navbar-container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mis Pedi2',
  description: 'Recibe pedidos y administra tu negocio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
      <ProductsProvider>
      <BusinessProvider>
      <OrdersProvider>
      <UserProvider>
        <DetectedUserProvider>
      <body className={inter.className}>
        <ToastContainer />
        <NavBarContainer/>
        {children}
        <LoginToaster/>        
        </body>
        </DetectedUserProvider>
      </UserProvider>
      </OrdersProvider>
      </BusinessProvider>
      </ProductsProvider>
    </html>
  )
}
