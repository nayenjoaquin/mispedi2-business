'use client';
import { NavbarPropsType } from "@/types";
import { faBars, faXmark, faBell, faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import { useUser } from "@/hooks/useUser";
import BusinessSelector from "./businessSelector";
import { useProducts } from "@/hooks/useProducts";
import UserAvatar from "./user-avatar";

export default function Navbar(props: NavbarPropsType) {
    const [sideBar, setSideBar] = useState(false);
    const {products} = useProducts();
    const { navigation } = props;
    const { user, loginWithGoogle, logout, detectUser } = useUser();
    useEffect(() => {
        detectUser();
    }, [])
    const mobileNavVariants = {
        hidden: {
            x: "-100%",
            scaleX: 0,
        },
        visible: {
            scaleX: 1,
            x: 0,
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
                {user && <UserAvatar user={user} />}
                {user === undefined && <div className="h-[50px] w-[50px] rounded-full bg-neutral-300 animate-pulse"></div>}
                {user===null&&<Link href='/login'><FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-200 transition-all hover:text-neutral-400 cursor-pointer" onClick={e=>setSideBar(false)} /></Link>}
            </div>
            <button onClick={toggleMobileMenu} className="absolute left-2.5 focus:border-2 rounded-lg focus:border-main-500">{sideBar ?
            <FontAwesomeIcon icon={faXmark} className="md:hidden h-8 w-8 text-neutral-300 transition-all hover:bg-neutral-100  hover:text-neutral-400 p-2.5 rounded cursor-pointer" />
            : <FontAwesomeIcon icon={faBars} className="md:hidden h-8 w-8 text-neutral-300 transition-all hover:bg-neutral-100  hover:text-neutral-400 p-2.5 rounded cursor-pointer" />}
            </button>
            <motion.div onClick={toggleMobileMenu} initial="hidden" variants={sideBarBackdropVariants} animate={sideBar? "visible": "hidden"} className={`md:hidden absolute top-nav right-0  backdrop-blur-md bg-opacity-30 bg-black  w-full h-[calc(100vh-80px)] flex flex-col items-center py-5 ${sideBar? "":"pointer-events-none"}`}/>
            <motion.nav variants={mobileNavVariants} initial="hidden"animate={sideBar? "visible": "hidden"}className= "max-w-md flex flex-col items-center w-full h-[calc(100vh-80px)] shadow-md absolute top-nav left-0 bg-white py-5  md:hidden">
                {navigation.map((item, index) => (
                    <Link onClick={toggleMobileMenu} href={item.ref} key={index} className=" font-medium text-gray-500 hover:bg-neutral-100 transition-all hover:border-l-4 hover:border-neutral-400 w-full pl-2.5 py-2.5">{item.name}</Link>
                ))}

            </motion.nav>

        </header>
    )
}


