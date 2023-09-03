'use client'
import BorderBottomNavItem from "@/components/border-bottom-nav-item"
import OrderList from "@/components/order-list"
import { useBusiness } from "@/hooks/useBusiness"
import { useOrders } from "@/hooks/useOrders"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function OrdersPage() {
    const {filteredOrders, getOrdersByStatus} = useOrders()
    const [activeTab, setActiveTab, ] = useState('Nuevo')
    const {getBusinessOrders, business} = useBusiness()
    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }
    useEffect(() => {
        getOrdersByStatus(activeTab)
        business && getBusinessOrders(business.id)

    }, [activeTab])

    return(
        <section className="min-h-screen  pt-nav flex flex-col justify-center items-center gap-5 px-5">
            <h1 className="text-3xl font-bold">Mis Pedidos</h1>
            <header className="w-full max-w-2xl xl:max-w-4xl flex justify-center  bg-white h-nav rounded-xl">
                <nav>
                    <ul className="h-full flex items-center gap-5">
                        <AnimatePresence>
                        <BorderBottomNavItem key={"Nuevo"} label="Nuevo" onClick={handleTabClick} active={activeTab === 'Nuevo'} />
                        <BorderBottomNavItem key={"Confirmado"} label="Confirmado" onClick={handleTabClick} active={activeTab === 'Confirmado'} />
                        <BorderBottomNavItem key={"Rechazado"} label="Rechazado" onClick={handleTabClick} active={activeTab === 'Rechazado'} />
                        <BorderBottomNavItem key={"Entregado"} label="Entregado" onClick={handleTabClick} active={activeTab === 'Entregado'} />
                        </AnimatePresence>
                    </ul>
                </nav>

            </header>
            <main className="w-full md:max-w-2xl xl:max-w-4xl flex flex-col justify-center items-center bg-white rounded-xl overflow-hidden">
                <OrderList orders={filteredOrders}/>
            </main>
            <footer className="w-full max-w-2xl xl:max-w-4xl flex justify-center bg-white h-nav rounded-xl">

            </footer>
        </section>
    )
}