'use client'
import { OrderType } from "@/types";
import  { createContext, useState } from "react";

interface OrdersContext {
    orders: OrderType[];
    setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
}

export const ordersContext = createContext<OrdersContext>({
    orders: [],
    setOrders: () => {},
});

interface OrdersProviderProps {
    children: React.ReactNode;
}
export const OrdersProvider = ({ children}: OrdersProviderProps) => {
    const [orders, setOrders] = useState<OrderType[]>([]);
    return (
        <ordersContext.Provider value={{ orders, setOrders }}>
            {children}
        </ordersContext.Provider>
    );
}