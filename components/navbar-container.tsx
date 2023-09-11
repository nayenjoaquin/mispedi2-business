'use client'

import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import LandingNavBar from "./landing-navbar"


export default function NavbarContainer() {
    const pathname = usePathname()

    return (
        <>
        {
            pathname== '/' ? <LandingNavBar/> : <Navbar
            navigation={
                [
                    { name: 'Inicio', ref: '/home' },
                    { name: 'Pedidos', ref: '/orders' },
                    { name: 'Productos', ref: '/products' },
                    { name: 'Movimientos', ref: '/movements' },
                    { name: 'Negocios', ref: '/businesses' },
                ]
            }
            />
        }
        </>
    )
}