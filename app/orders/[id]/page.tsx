'use client'
import StatusChip from "@/components/status-chip";
import { useOrders } from "@/hooks/useOrders";
import { useRef, useState } from "react";

interface OrderProps {
    params: {
        id: string;
    },

}
interface inpuEvent {
    preventDefault: () => void;
    target: {
        value: string;
    }
}

export default function OrderPage({params}: OrderProps) {
    const {id} = params
    const {getOrderById, acceptOrder, rejectOrder, deliverOrder} = useOrders()
    const order = getOrderById(id)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const dateInputRef = useRef<HTMLInputElement>(null)

    const confirmOrder = () => {
        dateInputRef.current &&
        acceptOrder(id, dateInputRef.current.value)
        setShowDatePicker(false)
    }
    const declineOrder = () => {
        rejectOrder(id)
    }

    const openDatePicker = () => {
        setShowDatePicker(true)
    }
    return(
        <section className="h-screen pt-nav flex flex-col items-center justify-center gap-5">
            {showDatePicker && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-xl w-full max-w-2xl xl:max-w-5xl p-2.5">
                    <h1 className="text-2xl font-semibold text-center">Selecciona la fecha de entrega</h1>
                    <div className="flex flex-col gap-2.5">
                        <input type="date" ref={dateInputRef} className="border border-gray-300 rounded-xl px-2.5 py-1.5"/>
                        <div className="flex gap-5 ">
                        <button onClick={(e)=>{
                            e.preventDefault()
                            confirmOrder()
                        }} className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-5 py-2.5 w-full">Confirmar</button>
                        <button onClick={e=>setShowDatePicker(false)} className="bg-red-500 hover:bg-red-600 w-full text-white rounded-xl px-5 py-2.5">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            }
            {order &&
                <>
                <header className="bg-white rounded-xl w-full max-w-2xl xl:max-w-5xl p-2.5 flex justify-center items-center gap-5">
                    <h1 className="text-lg xl:text-2xl font-semibold text-center">Pedido Nro: {order.id}</h1>
                    <StatusChip status={order.status}/>
                </header>
                <main className="flex flex-col lg:flex-row bg-white w-full max-w-2xl xl:max-w-5xl rounded-xl p-2.5 gap-5">
                    <div>
                        <h3 className="text-xl font-medium">Información del cliente</h3>
                        <div className="flex flex-col gap-2.5">
                            <span className="">Nombre: {order.client}</span>
                            <span className="">Teléfono: {order.phone}</span>
                            <span className="">Dirección: {order.address}/{order.commune}/{order.region}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium">Productos</h3>
                        <ul className="flex flex-col gap-2.5">
                            {order.products.map((product,i) => <li key={i} className="flex items-center gap-2.5">
                                <span>{product.product.name}x{product.quantity}</span>
                                <span>${product.product.price* product.quantity}</span>
                            </li>)}
                            <li className="flex items-center gap-2.5">
                                <span className="font-medium">Total</span>
                                <span className="font-medium text-lg">${order.total}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium">Notas del cliente</h3>
                        <p>{order.notes}</p>

                    </div>
                </main>
                {order.status=="Nuevo" && 
                <footer className="flex gap-5">
                    <button onClick={e=>{
                        e.preventDefault()
                        openDatePicker()
                    }} className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-5 py-2.5">Confirmar pedido</button>
                    <button onClick={e=>{
                        e.preventDefault()
                        declineOrder()
                    }} className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-5 py-2.5">Rechazar pedido</button>

                </footer>}
                {order.status=="Confirmado" &&
                <footer className="flex gap-5">
                    <button onClick={e=>{
                        e.preventDefault()
                        deliverOrder(id)
                        
                    }} className="bg-blue-400 hover:bg-blue-500 text-white rounded-xl px-5 py-2.5">Marcar como entregado</button>
                </footer>}
                </>}
        </section>
    )
}
