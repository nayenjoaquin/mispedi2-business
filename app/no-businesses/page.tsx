'use client'
import gif from '@/assets/john-travolta.gif'
import businessman from '@/assets/businessman.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function NoBusinesses(){
    const router = useRouter()
    return(
        <section className="min-h-screen pt-nav flex flex-col gap-5 items-center justify-center">
            <main className="w-full md:max-w-2xl xl:max-w-4xl flex flex-col gap-5 justify-center items-center bg-white rounded-xl p-5 shadow-md">
                <Image className='rounded-md' src={gif} alt="john travolta gif"  height={500} width={500}/>
                <h1 className="text-2xl font-semibold text-center">Comienza creando tu primer negocio</h1>
                <div className="flex gap-5 justify-center">
                    <button onClick={e=>{
                        e.preventDefault()
                        router.push('/home')
                        router.push('/business/new')
                    }}className="bg-secondary-500 hover:bg-secondary-600 text-white rounded-md px-5 py-2.5">Crea un negocio</button>
                </div>
            </main>
        </section>
    )
}