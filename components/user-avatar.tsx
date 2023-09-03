import { useUser } from "@/hooks/useUser";
import { UserType } from "@/types";
import Image from "next/image";
import { useState } from "react";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface UserAvatarProps {
    user: UserType;
    }

export default function UserAvatar(props: UserAvatarProps) {
    const variants = {
        hidden: {
            opacity: 0,
            y: -300,
        },
        visible: {
            opacity: 1,
            y: 0,
            zIndex: 100,
        }
    }
    const [sideBar, setSideBar] = useState(false);
    const {logout} = useUser()
    const {user} = props
    return (
        <div className="relative flex items-center gap-5">
            <div onClick={e=>{
                setSideBar(!sideBar);
            }} className="h-[50px] w-[50px] rounded-full overflow-hidden cursor-pointer transition-all hover:scale-105">
                {user ?
                user.avatar ? <Image src={user.avatar} className="rounded-full aspect-square object-cover" objectFit="cover" alt="Avatar" height={50} width={50} />
                : <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-800 text-2xl">
                    {user.name[0].toUpperCase()}
                </div>
                : <div className="">
                    <FontAwesomeIcon icon={faUser} className="text-gray-800 text-2xl"/>
                </div>}
            </div>
            <AnimatePresence>
            {sideBar &&
            <motion.div exit="hidden" className="absolute top-nav right-0 flex flex-col gap-2.5 bg-white w-60 rounded-md shadow-md" variants={variants} initial="hidden" animate={sideBar ? "visible" : "hidden"}>
                <Link href="/profile" className="flex items-center gap-2 px-5 py-2 hover:bg-neutral-100 transition-all">
                    <span className="text-sm font-medium text-gray-800">Profile</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-2 px-5 py-2 hover:bg-neutral-100 transition-all">
                    <span className="text-sm font-medium text-gray-800">Settings</span>
                </Link>
                <button className="flex items-center gap-2 px-5 py-2 hover:bg-neutral-100 transition-" onClick={logout}>
                    <span className="text-sm font-medium text-red-500">Cerrar sesión</span>
                </button>
            </motion.div>}
            </AnimatePresence>
        </div>
    )
}