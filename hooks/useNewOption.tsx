import { newOptionContext } from "@/context/newOptionsProvider"
import { OptionType } from "@/types"
import { use, useContext, useEffect, useId, useState } from "react"

export const useNewOption = () => {
    const {options,setOptions} = useContext(newOptionContext)

    const addOption = () => {
        const optionId = Math.random().toString(16).substring(2)
        setOptions(prevState => {
            let newOptions = JSON.parse(JSON.stringify(prevState))
            newOptions.push({
                name: "opción "+(prevState.length+1),
                values: [],
                id: optionId
            })
            return newOptions
        })
    }
    const handleOptionNameChange = (e: any, i: number) => {
        const {value} = e.target
        setOptions(prevState => {
            let newOptions = JSON.parse(JSON.stringify(prevState))
            newOptions[i].name = value
            return newOptions
        })
    }

    const addOptionValue = (i:number) => {
        setOptions(prevState => {
            let newOptions = JSON.parse(JSON.stringify(prevState))
            newOptions[i].values.push("valor "+(prevState[i].values.length+1))
            return newOptions
        })
    }

    const handleOptionValueChange = (e: any, i: number, j: number) => {
        const {value} = e.target
        setOptions(prevState => {
            let newOptions = JSON.parse(JSON.stringify(prevState))
            newOptions[i].values[j] = value
            return newOptions
        })
    }
    const removeOpotionValue = (i:number, j:number) => {
        setOptions(prevState => {
            let newOptions = JSON.parse(JSON.stringify(prevState))
            newOptions[i].values.splice(j,1)
            return newOptions
        })
    }

    const removeOption = (i:number) => {
        setOptions(prevState => {
            let newOptions = JSON.parse(JSON.stringify(prevState))
            newOptions= newOptions.filter((option:OptionType, index:number) => index!==i)
            return newOptions
        })
    }

    return {
        options,
        addOption,
        handleOptionNameChange,
        addOptionValue,
        handleOptionValueChange,
        removeOpotionValue,
        removeOption
    }

    
}