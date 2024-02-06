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
        <motion.div initial='hidden' animate='visible' layoutId={option.id} exit='hidden'  variants={variants}  className=" relative flex flex-col gap-1 items-start">
            <FontAwesomeIcon icon={faXmark} className="absolute top-0 right-0 text-gray-400 cursor-pointer  p-2.5 rounded-full transition-all  hover:text-gray-600 text-xl" onClick={e=>{

                removeOption(option.id)}}/>
            <input onChange={e=>{
                handleNameChange(e, option.id)
            }} className="w-fit rounded text-lg  outline-none border-b-2 border-main-500" type="text" name={option.id}  id={option.id} placeholder={'nueva opción'}/>
            {
                option.values.length>0 &&
                <motion.div layout className="w-full flex gap-2.5 flex-col">
                {option.values.map((value,j) => {
                    return(
                        <NewOptionValue value={value} option={option} i={i} j={j} key={value.id}/>
                    )
                })}
                </motion.div>
            }
            <button type="button" onClick={e=>{
                addValue(option)
            }} className="bg-neutral-200 text-gray-600 w-fit rounded transition-all hover:bg-neutral-300 px-2">{$ADD_VALUE}</button>

        </motion.div>
    )
}