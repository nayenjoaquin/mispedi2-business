'use client'
import { useBusiness } from "@/hooks/useBusiness"

export default function ProductCreated(){
    const {business} = useBusiness()
    return(
        <section>
            <header className="w-full max-w-4xl bg-white shadow-md rounded-xl">
                <h2 className="font-semibold text-2xl">Negocio creado</h2>
            </header>
        </section>
    )
}