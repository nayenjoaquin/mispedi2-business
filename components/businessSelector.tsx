import { useBusiness } from "@/hooks/useBusiness";
import { useUser } from "@/hooks/useUser";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { $ADD_BUSINESS, $MY_BUSINESSES } from "@/consts/Strings";

export default function BusinessSelector() {
    const { business, selectBusiness} = useBusiness();
    const { user } = useUser();
    const [showBusinesses, setShowBusinesses] = useState(false);
    const selectorVariants = {
        hidden: {
            y: -180,
            scaleY: 0,
            opacity: 0,

            zIndex: -1,
        },
        visible: {
            scaleY: 1,
            y: -30,
            opacity: 1,
            zIndex: 1,

        }
    }
    const router = useRouter();
    const toggleBusinesses = () => {
        setShowBusinesses(!showBusinesses)
    }


    return (
        <div className="flex items-center   justify-center">
        <div onClick={e=>{
            e.stopPropagation()
            toggleBusinesses()
        }} className="relative flex justify-between items-center gap-5 px-5 w-60  rounded-md transition-all hover:bg-neutral-100 cursor-pointer">
            {business && <>
                <div className="flex gap-2.5 items-center">
                    <Image src={business.logo} alt="business logo" className="rounded-full object-cover aspect-square" height={50} width={50} />
                    <h4 className="font-medium">{business.name}</h4>
                </div>
                <FontAwesomeIcon icon={faChevronDown} className="text-2xl text-neutral-200 transition-all hover:text-neutral-400 cursor-pointer" />
                <motion.div animate={showBusinesses ? "visible" : "hidden"} initial="hidden" variants={selectorVariants}className={`absolute  bg-white w-full left-0 top-nav ${showBusinesses? "": "pointer-events-none "} shadow-md flex flex-col gap-2.5 py-2.5`}>
                    {
                        user?.businesses.map((business, index) => (
                            <div onClick={e=>{
                                e.stopPropagation()
                                selectBusiness(business)
                                toggleBusinesses()
                            }} key={index} className="flex gap-2.5 items-center px-5 transition-all hover:bg-neutral-100">
                                <Image src={business.logo} alt="business logo" className="rounded-full object-cover aspect-square" height={50} width={50} />
                                <h4 className="font-medium">{business.name}</h4>
                            </div>
                        ))
                        

                    }
                    <div className="flex w-full justify-center"><button onClick={e=>{
                        router.push('/business/new')
                    }} className="flex  justify-center items-center p-2.5 bg-neutral-200 rounded transition-all hover:bg-neutral-300"> <FontAwesomeIcon icon={faPlus}/>{$ADD_BUSINESS}</button></div>

                </motion.div>
            </>}
        </div>
        </div>
    )
}