'use client'

import { useBusiness } from "@/hooks/useBusiness"
import { useUser } from "@/hooks/useUser"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function BusinessesPage() {
    const {user} = useUser()
    const {deleteBusiness} = useBusiness()
    const businesses = user?.businesses
    const router = useRouter()


    return (
        <section className="min-h-screen pt-nav px-5 flex flex-col gap-5 ">
            <header className="flex justify-between items-center bg-white rounded-xl p-5">
                <h1 className="text-2xl font-semibold text-center">Mis negocios</h1>
                <button onClick={e=>{
                    e.preventDefault()
                    router.push('/business/new')
                }} className="bg-secondary-500 hover:bg-secondary-600 text-white rounded-md px-5 py-2.5">Crear nuevo negocio</button>
            </header>
            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {businesses?.map(business => (
                        <div key={business.id} className="bg-white rounded-xl p-5 flex flex-col items-center gap-5">
                            <Image src={business.logo} width={200} height={200} className="rounded-full aspect-square object-cover" alt="business logo"/>
                            <h1 className="text-lg font-semibold text-center">{business.name}</h1>
                            <div className="flex gap-5 justify-center">
                                <button onClick={e=>{
                                    e.preventDefault()
                                    window.open(business.url, '_blank')
                                }}className="bg-main-500 hover:bg-main-600 text-white rounded px-5 py-2.5">Visitar</button>
                                <button onClick={e=>{
                                    e.preventDefault()
                                    deleteBusiness(business.id)
                                }} className="bg-red-500 hover:bg-red-600 text-white rounded px-5 py-2.5">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </section>
    )
}