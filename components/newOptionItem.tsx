import { $ADD_VALUE,  } from "@/consts/Strings"
import { useNewOption } from "@/hooks/useNewOption"
import { OptionType } from "@/types"
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useId } from "react"
import {AnimatePresence, motion, useAnimate, usePresence} from "framer-motion"
import NewOptionValue from "./newOptionValue"

export const NewOptionItem = (props: {
    option: OptionType,
    i: number,
    }) => {
    const {option, i} = props
    const {removeOption,
        addOptionValue: addValue,
        removeOpotionValue:removeValue,
        handleOptionValueChange: handleValueChange,
        handleOptionNameChange: handleNameChange,

    } = useNewOption()

    const variants = {
        hidden: {
            opacity: 0,
            x: -100,
        },
        visible: {
            opacity: 1,
            x: 0,
        }
    }

    return(
        <motion.div initial='hidden' animate='visible'  variants={variants}  className=" relative flex flex-col gap-1 items-start">
            <FontAwesomeIcon icon={faXmark} className="absolute top-0 right-0 text-gray-400 cursor-pointer  p-2.5 rounded-full transition-all  hover:text-gray-600 text-xl" onClick={e=>{

                removeOption(i)}}/>
            <input onChange={e=>{
                handleNameChange(e, i)
            }} className="w-fit rounded text-lg  outline-none border-b-2 border-main-500" type="text" name={`option-${i}`}  id={`option-${i}`} placeholder={option.name}/>
            {
                option.values.length>0 ?
                <motion.div layout className="flex gap-2.5 flex-wrap">
                {option.values.map((value,j) => {
                    return(
                        <NewOptionValue value={value} j={j} i={i} key={j}/>
                    )
                })}
                <FontAwesomeIcon icon={faPlus} className="text-gray-400 cursor-pointer bg-gray-300 p-2.5 rounded-full transition-all hover:bg-gray-400 hover:text-gray-500" onClick={e=>{ addValue(i)}}/>
                </motion.div>
                :
                <button type="button" onClick={e=>{
                    addValue(i)
                }} className="bg-neutral-200 text-gray-600 w-fit rounded transition-all hover:bg-neutral-300 px-2">{$ADD_VALUE}</button>

            }


        </motion.div>
    )
}