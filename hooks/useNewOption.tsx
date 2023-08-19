import { newOptionContext } from "@/context/newOptionsProvider"
import { OptionType, OptionValueType } from "@/types"
import { randomUUID } from "crypto"
import { use, useContext, useEffect, useId, useState } from "react"
import uuid from "react-uuid"

export const useNewOption = () => {
    const {options,setOptions} = useContext(newOptionContext)

    const addOption = () => {
        const optionId = uuid()
        setOptions(prevState => {
            let newOptions:OptionType[] = JSON.parse(JSON.stringify(prevState))
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
            let newOptions:OptionType[]= JSON.parse(JSON.stringify(prevState))
            newOptions[i].name = value
            return newOptions
        })
    }

    const addOptionValue = (i:number, option:OptionType) => {
        const valueId = uuid()
        setOptions(prevState => {
            const newOptionValue:OptionValueType = {
                id: valueId,
                name: "valor "+(prevState[i].values.length+1),
                option: option.name
            }
            let newOptions = JSON.parse(JSON.stringify(prevState))
            newOptions[i].values.push(newOptionValue)
            return newOptions
        })
    }

    const handleOptionValueChange = (e: any, i: number, j: number) => {
        const {value} = e.target
        setOptions(prevState => {
            let newOptions:OptionType[] = JSON.parse(JSON.stringify(prevState))
            newOptions[i].values[j].name = value
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
            newOptions.splice(i,1)
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