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
        <div className="flex flex-col gap-5 w-full">
            <div className="flex justify-between items-center w-full gap-5">
                <h2 className="text-2xl font-semibold">Opciones</h2>
                <button type="button" onClick={addOption} className="max-w-xs text-white bg-secondary-500 transition-all hover:bg-secondary-600 px-5 py-2.5 rounded">{$ADD_OPTION}</button>
            </div> 
            <motion.div layout>
                <AnimatePresence>
                {options.length>0 ?
                options.map((option,i) => (
                    <NewOptionItem option={option} i={i} key={option.id}/>
                ))
                :
                <p>Agrega una nueva opción...</p>

                }
                </AnimatePresence>
            </motion.div>
        </div>
    )
}