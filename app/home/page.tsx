import SectionCard from "@/components/section-card"
import { faBox, faBoxOpen, faMoneyCheckDollar, faRectangleList, faStore } from "@fortawesome/free-solid-svg-icons"

export default function homePage(){
    const sections = [
        {name: 'Pedidos', ref: '/orders', icon:faRectangleList},
        {name: 'Productos', ref: '/products', icon:faBoxOpen},
        {name: 'Movimientos', ref: '/movements', icon:faMoneyCheckDollar},
        {name: 'Negocios', ref: '/businesses', icon:faStore},
    ]
    return(
        <section className="min-h-screen pt-nav grid place-content-center">
            <main className="grid grid-cols-2 grid-rows-2 gap-5 p-5 bg-white rounded-xl shadow-md">
                {sections.map((section, index) => (
                    <SectionCard key={index} section={section}/>
                ))}

            </main>
        </section>
    )
}