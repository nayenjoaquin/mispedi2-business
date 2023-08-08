'use client';
import { NavbarPropsType } from "@/types";
import { faBars, faXmark, faBell, faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import { useUser } from "@/hooks/useUser";
import BusinessSelector from "./businessSelector";
import { useProducts } from "@/hooks/useProducts";

export default function Navbar(props: NavbarPropsType) {
    const [sideBar, setSideBar] = useState(false);
    const {products} = useProducts();
    const { navigation } = props;
    const { user, loginWithGoogle, logout } = useUser();
    const mobileNavVariants = {
        hidden: {
            x: "-100vw",
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
        }
    }
    const sideBarBackdropVariants = {
        hidden: {
            opacity: 0,
            zIndex: -1,
        },
        visible: {
            opacity: 1,
        }
    }



    const toggleMobileMenu = () => {
        setSideBar(!sideBar);
    }
    return (
        <header className="z-50 absolute justify-between flex h-nav w-full items-center px-5 bg-white shadow-md">
            <div>
                <nav className="hidden md:flex gap-5 h-full">
                    {navigation.map((item, index) => (
                        <div key={index} className="h-nav hover:border-b-2 hover:border-main-500 flex items-center">
                            <Link href={item.ref} key={index} className="text-gray-500 hover:text-black transition-all font-medium">{item.name}</Link>
                        </div>
                    ))}
                </nav>
                
            </div>
            {user && <BusinessSelector />}
            <div className=" items-center gap-5 flex">
                {user && <Image src={user.avatar} alt="user avatar" className="rounded-full object-cover" height={50} width={50} />}
                {user === undefined && <div className="h-[50px] w-[50px] rounded-full bg-neutral-300 animate-pulse"></div>}
                {user===null&&<Link href='/login'><FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-200 transition-all hover:text-neutral-400 cursor-pointer" onClick={e=>setSideBar(false)} /></Link>}
            </div>
            <button onClick={toggleMobileMenu} className="absolute left-2.5 focus:border-2 rounded-lg focus:border-main-500">{sideBar ?
            <FontAwesomeIcon icon={faXmark} className="md:hidden h-8 w-8 text-neutral-300 transition-all hover:bg-neutral-100  hover:text-neutral-400 p-2.5 rounded cursor-pointer" />
            : <FontAwesomeIcon icon={faBars} className="md:hidden h-8 w-8 text-neutral-300 transition-all hover:bg-neutral-100  hover:text-neutral-400 p-2.5 rounded cursor-pointer" />}
            </button>
            <motion.div onClick={toggleMobileMenu} variants={sideBarBackdropVariants} animate={sideBar? "visible": "hidden"} className={`md:hidden absolute top-nav right-0  backdrop-blur-md bg-opacity-30 bg-black  w-full h-[calc(100vh-80px)] flex flex-col items-center py-5 ${sideBar? "":"pointer-events-none"}`}/>
            <motion.nav variants={mobileNavVariants} initial="hidden"animate={sideBar? "visible": "hidden"}className= "max-w-md flex flex-col items-center w-full h-[calc(100vh-80px)] shadow-md absolute top-nav left-0 bg-white py-5  md:hidden">
                {navigation.map((item, index) => (
                    <Link onClick={toggleMobileMenu} href={item.ref} key={index} className=" font-medium text-gray-500 hover:bg-neutral-100 transition-all hover:border-l-4 hover:border-neutral-400 w-full pl-2.5 py-2.5">{item.name}</Link>
                ))}
                <div className="w-full border-b border-neutral-200 my-2.5"></div>
                {user && <div className="flex justify-between items-center w-full p-2.5">
                    <div className="flex gap-2.5 items-center">
                        <Image src={user.avatar} alt="user avatar" className="rounded-full object-cover" height={50} width={50} />
                        <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faBell} className="text-2xl text-neutral-200 transition-all hover:text-neutral-400 cursor-pointer"/>

                </div>}
                <Link href="/profile" className="font-medium w-full pl-2.5 py-2.5 hover:bg-neutral-100 transition-all text-gray-500 hover:text-black">Tu perfil</Link>
                <Link href="/settings" className="font-medium w-full pl-2.5 py-2.5 hover:bg-neutral-100 transition-all text-gray-500 hover:text-black">Configuración</Link>
                <button onClick={logout} className="w-full flex text-start font-medium pl-2.5 py-2.5 hover:bg-red-100 transition-all text-red-500 ">Cerrar sesión</button>

            </motion.nav>

        </header>
    )
}


