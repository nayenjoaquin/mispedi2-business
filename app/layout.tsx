import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UserProvider from '@/context/userProvider'
import BusinessProvider from '@/context/businessProvider'
import ProductsProvider from '@/context/productsProvider'
import { OrdersProvider } from '@/context/ordersProvider'

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
      <body className={inter.className}>
        <Navbar navigation={[
          { name: 'Inicio', ref: '/home' },
          { name: 'Pedidos', ref: '/orders' },
          { name: 'Productos', ref: '/products' },
          { name: 'Movimientos', ref: '/movements' },
          { name: 'Negocios', ref: '/businesses' },
        ]}/>
        {children}
        </body>
      </UserProvider>
      </OrdersProvider>
      </BusinessProvider>
      </ProductsProvider>
    </html>
  )
}
