'use client'

import { useUser } from "@/hooks/useUser";
import {motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginToaster() {
    const { user, detectedUser, login } = useUser();
    const pathname = usePathname()

    const variants = {
        hidden: { opacity: 0,
        y: 50 },
        visible: { opacity: 1,
        y: 0, },
    }
    return (
        <div className="fixed z-100 top-0 left-0 h-screen w-screen pointer-events-none">
            {detectedUser && pathname=='/' &&  <motion.div className=" overflow-hidden p-2.5 absolute pointer-events-auto right-5 md:right-10 top-20 rounded-xl shadow-xl bg-white w-full max-w-sm flex flex-col gap-5 justify-center" variants={variants} initial='hidden' animate='visible'>
                <span className="text-md font-semibold text-center">Inicia sesión para continuar</span>
                <div className="w-full border-b-2 border-neutral-200 "></div>
                <div className="flex gap-2.5 items-center">
                    {detectedUser.avatar ?
                    <Image src={detectedUser.avatar} width={50} height={50} className="rounded-full" alt="user avatar"/>
                    : <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-800 text-2xl">
                        {detectedUser.name[0].toUpperCase()}
                    </div>}
                    <div className="flex flex-col">
                        <span className="text-md font-semibold">{detectedUser.name}</span>
                        <span className="text-md font-semibold">{detectedUser.email}</span>
                    </div>
                </div>
                <button onClick={e=>{
                    login(detectedUser)
                }} className="w-full bg-main-500 text-md text-white font-medium rounded-md p-2"> Continuar como {detectedUser.name}</button>

            </motion.div>}
                
        </div>
    )
}