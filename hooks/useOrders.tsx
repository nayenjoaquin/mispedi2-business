import { ordersContext } from "@/context/ordersProvider";
import { db } from "@/firebase/config";
import { OrderType } from "@/types";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { useContext, useState } from "react";

export const useOrders = () => {
    const { orders, setOrders } = useContext(ordersContext);
    const [filteredOrders, setFilteredOrders] = useState<OrderType[]>(orders)


    const getOrdersByStatus = (status: string) => {
        const filteredOrders = orders.filter(order => order.status === status)
        setFilteredOrders(filteredOrders)
    }
    const initOrders = (orders: OrderType[]) => {
        setOrders(orders);
    }
    const acceptOrder = async (id: string, date:string) => {
            const docRef = doc(db, "orders", id);
            await updateDoc(docRef, {
                status: "Confirmado",
                deliveryDate: date
            });
            const newOrders = orders.map(order => {
                if(order.id === id){
                    order.status = "Confirmado"
                    order.deliveryDate = date
                }
                return order
            })
            setOrders(newOrders)

    }

    const rejectOrder = async (id: string) => {
        const docRef = doc(db, "orders", id);
        await updateDoc(docRef, {
            status: "Rechazado",
        });
        const newOrders = orders.map(order => {
            if(order.id === id){
                order.status = "Rechazado"
            }
            return order
        })
        setOrders(newOrders)
    }

    const deliverOrder = async (id: string) => {
        const docRef = doc(db, "orders", id);
        await updateDoc(docRef, {
            status: "Entregado",
        });
        const newOrders = orders.map(order => {
            if(order.id === id){
                order.status = "Entregado"
            }
            return order
        })
        setOrders(newOrders)
    }


    const getOrderById = (id: string) => {
        const order = orders.find(order => order.id === id)
        return order
    }
    return { 
        orders,
        initOrders,
        getOrdersByStatus,
        filteredOrders,
        getOrderById,
        acceptOrder,
        rejectOrder,
        deliverOrder
     };
}