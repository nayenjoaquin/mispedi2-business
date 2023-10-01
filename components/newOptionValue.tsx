import { useNewOption } from "@/hooks/useNewOption"
import { NewOptionValueType, OptionValueType } from "@/types"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useId, useRef, useState } from "react"

export default function NewOptionValue(props: {
    value: NewOptionValueType,
    j: number,
    i: number,
}) {
    const {
        handleOptionValueChange: handleValueChange,
        removeOpotionValue: removeValue,
        handleValuePriceChange,
        handleValuePriceSwitch,
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
    const inputRef = useRef<HTMLInputElement>(null)
    const [checked, setChecked] = useState(value.changePrice)

    return(
        <motion.div variants={variants} initial='hidden' animate='visible'  className="relative w-full flex justify-between items-center">
            <span>{j+1}.-</span>
            <div className="border-b-2 border-gray-200 flex items-center relative  rounded px-5">
                <input onChange={e=>{handleValueChange(e,i,j)}} className=" outline-none w-24 bg-transparent " placeholder="nuevo valor"/>
            </div>
            <div className="flex flex-col-reverse items-center">
                <input
                    ref={inputRef}
                    checked={value.changePrice}
                    onChange={e=>{
                        handleValuePriceSwitch(e,i,j)
                    }}
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-main-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-main-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault" />
                <label
                    className="inline-block pl-[0.15rem] "
                >Cambiar precio</label>
            </div>
            {
                value.changePrice &&
                <input
                    className="bg-transparent outline-none line-clamp-1 text-ellipsis border-b-2 border-gray-200 rounded px-5"
                    type="number"
                    name={`value-${i}-${j}`}
                    id={`value-${i}-${j}`}
                    placeholder="nuevo precio"
                    onChange={e=>{handleValuePriceChange(e,i,j)}}
                />
            }
            <FontAwesomeIcon icon={faXmark} className="top-0 right-0 text-gray-400 cursor-pointer  p-2.5 rounded-full transition-all  hover:text-gray-600 text-xl" onClick={e=>{
                removeValue(i,j)
            }}/>
            
            </motion.div>
    )
}