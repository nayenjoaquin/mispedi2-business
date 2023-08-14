import { useNewOption } from "@/hooks/useNewOption"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useId } from "react"

export default function NewOptionValue(props: {
    value: string,
    j: number,
    i: number,
}) {
    const {
        handleOptionValueChange: handleValueChange,
        removeOpotionValue: removeValue,
    } = useNewOption()
    const {value, j, i} = props
    const variants = {
        hidden: {
            opacity: 0,
            y: 100
        },
        visible: {
            opacity: 1,
            y: 0,
        }
    }

    return(
        <motion.div variants={variants} initial='hidden' animate='visible'  className="flex items-center relative bg-gray-300 rounded-3xl px-5">
            <input onChange={e=>{handleValueChange(e,i,j)}} className=" outline-none w-24 bg-transparent " placeholder={value} />
            <FontAwesomeIcon icon={faXmark} className="absolute right-2 text-gray-400 cursor-pointer  p-1 rounded-full transition-all  hover:text-gray-600 text-xl" onClick={e=>{removeValue(i,j)}}/>
        </motion.div>
    )
}