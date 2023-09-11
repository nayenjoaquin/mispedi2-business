import { useUser } from '@/hooks/useUser'
import {motion} from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
export default function LandingNavBar() {

    const {detectUser} = useUser()

    useEffect(()=>{
        detectUser()
    },[])

    const variants = {
        hidden: { opacity: 0,
        y: -100 },
        visible: { opacity: 1,
        y: 0, },
        }
    return(
        <motion.header variants={variants} initial='hidden' animate='visible' className=' fixed w-full flex justify-between items-center px-5 py-3 h-nav '>
            <h1 className='text-md md:text-2xl font-semibold text-white'>Mis pedi2</h1>
            <div className='flex gap-5 items-center text-white font-semibold text-sm md:text-md'>
            <Link href={'/login'} className='p-2.5 hover:scale-105 transition-all'>Iniciar sesión</Link>
                <Link href={'/register'}><button className="rounded-3xl bg-white p-2.5 text-black font-medium transition-all hover:bg-neutral-100 hover:scale-105">Comienza ahora</button></Link>
                
            </div>
        </motion.header>
    )
}