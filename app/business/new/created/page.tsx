'use client'
import { useBusiness } from "@/hooks/useBusiness"

export default function ProductCreated(){
    const {business} = useBusiness()
    return(
        <main className="min-h-screen bg-white pt-nav">
            <h1>Producto creado</h1>
            <h2>Nombre: {business?.name}</h2>
            <h2>url: {business?.url}</h2>
        </main>
    )
}