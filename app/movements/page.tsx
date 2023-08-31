'use client'

import { useOrders } from "@/hooks/useOrders";
import { useEffect } from "react";

export default function MovementsPage(){
    const {filteredOrders, getOrdersByStatus} = useOrders()
    useEffect(() => {
        getOrdersByStatus('Entregado')
    }, [])

    const getTotals = () =>{
        let total = 0
        filteredOrders?.map(order => {
            total += order.total
        })
        return total
    }


    return(
        <section className="min-h-screen pt-nav flex flex-col gap-5 items-center justify-center">
            <main className="w-full md:max-w-2xl xl:max-w-4xl flex flex-col justify-center items-center bg-white rounded-xl">
                <ul className="w-full">
                    {filteredOrders?.map(order => (
                        <li key={order.id} className="bg-white rounded-xl p-5 flex flex-col items-center gap-5">
                            <h1 className="text-lg font-semibold text-center">Pedido #{order.id}</h1>
                            <div className="flex gap-5 justify-center">
                                <button onClick={e=>{
                                    e.preventDefault()
                                }}className="bg-main-500 hover:bg-main-600 text-white rounded px-5 py-2.5">Visitar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
            <footer className="w-full max-w-2xl xl:max-w-4xl flex justify-center bg-white h-nav rounded-xl">
                <span className="text-2xl font-semibold text-center">Total: ${getTotals()}</span>
            </footer>
        </section>
    )

}