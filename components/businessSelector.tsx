import { useBusiness } from "@/hooks/useBusiness";
import { useUser } from "@/hooks/useUser";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BusinessSelector() {
    const { business, selectBusiness} = useBusiness();
    const { user } = useUser();
    const [showBusinesses, setShowBusinesses] = useState(false);
    const selectorVariants = {
        hidden: {
            y: -100,
            opacity: 0,
            zIndex: -1,
        },
        visible: {
            y: -30,
            opacity: 1,
            zIndex: 1,

    }
    }
    const toggleBusinesses = () => {
        setShowBusinesses(!showBusinesses)
    }


    return (
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
                <motion.div animate={showBusinesses ? "visible" : "hidden"} initial="hidden" variants={selectorVariants}className={`absolute  bg-white w-full left-0 top-nav ${showBusinesses? "": "pointer-events-none"}`}>
                    {
                        user?.businesses.map((business, index) => (
                            <div onClick={e=>{
                                e.stopPropagation()
                                selectBusiness(business)
                                toggleBusinesses()
                            }} key={index} className="flex gap-2.5 items-center transition-all hover:bg-neutral-100">
                                <Image src={business.logo} alt="business logo" className="rounded-full object-cover aspect-square" height={50} width={50} />
                                <h4 className="font-medium">{business.name}</h4>
                            </div>
                        ))

                    }

                </motion.div>
            </>}
        </div>
    )
}