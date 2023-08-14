import { OptionType } from "@/types"
import {  use, useEffect, useState } from "react"
import { NewOptionItem } from "./newOptionItem"
import { NewOptionProvider } from "@/context/newOptionsProvider"
import { useNewOption } from "@/hooks/useNewOption"
import { $ADD_OPTION } from "@/consts/Strings"
import{ AnimatePresence, motion} from "framer-motion"



export default function OptionPicker (props: any) {
    const {handleOptionsChange} = props
    const {options, addOption} = useNewOption()

    useEffect(()=>{
        handleOptionsChange(options)
    },[options])



    return(
        <motion.div layout className="flex flex-col px-5 gap-5 max-w-xl w-full">
            <h2 className="text-2xl font-semibold">Opciones</h2>
            <motion.div layout>
                {options.length>0 ?
                options.map((option,i) => (
                    <NewOptionItem option={option} i={i} key={i}/>
                ))
                :
                <p>Agrega una nueva opción...</p>

                }
            </motion.div>
            <button type="button" onClick={addOption} className="text-white bg-secondary-500 transition-all hover:bg-secondary-600 px-5 py-2.5 rounded">{$ADD_OPTION}</button>
        </motion.div>
    )
}