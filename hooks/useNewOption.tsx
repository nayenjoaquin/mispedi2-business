import { newOptionContext } from "@/context/newOptionsProvider"
import { NewOptionValueType, OptionType, OptionValueType } from "@/types"
import { randomUUID } from "crypto"
import { use, useContext, useEffect, useId, useState } from "react"
import uuid from "react-uuid"

export const useNewOption = () => {
    const {options,setOptions} = useContext(newOptionContext)


    const addOption = (option?: OptionType) => {
        const optionId = uuid()
        const newOption:OptionType = option? {
            ...option,
            id: optionId
        } : {
            name: "nueva opción",
            values: [],
            id: optionId
        }

        setOptions(prevState => {
            const newOptions:OptionType[] = JSON.parse(JSON.stringify(prevState))
            newOptions.push(newOption)
            return newOptions
        })
        return newOption
    }
    const handleOptionNameChange = ( value: string, optionId: string) => {
        setOptions(prevState => {
            let newOptions:OptionType[]= JSON.parse(JSON.stringify(prevState))
            let i = newOptions.findIndex(option => option.id == optionId)
            newOptions[i].name = value
            newOptions[i].values.forEach((value, j) => {
                value.option = newOptions[i].name
            })
            return newOptions
        })
    }


    const addOptionValue = ( option:OptionType) => {
        const valueId = uuid()
        setOptions(prevState => {
            let i = prevState.findIndex(prevOption => prevOption.id == option.id)
            const newOptionValue:NewOptionValueType = {
                name: "valor "+(prevState[i].values.length+1),
                id: valueId,
                option: option.name,
                stock: 0
            }
            let newOptions = JSON.parse(JSON.stringify(prevState))
            newOptions[i].values.push(newOptionValue)
            return newOptions
        })
        return valueId
    }

    const handleOptionValueChange = (value: string, optionId: string, valueId: string) => {
        setOptions(prevState => {
            let i = prevState.findIndex(option => option.id == optionId)
            let j = prevState[i].values.findIndex(value => value.id == valueId)
            let newOptions:OptionType[] = JSON.parse(JSON.stringify(prevState))
            newOptions[i].values[j].name = value
            return newOptions
        })
    }
    const handleValuePriceChange = (e: any, optionId: string, valueId: string) => {
        const {value} = e.target
        setOptions(prevState => {
            let i = prevState.findIndex(option => option.id == optionId)
            let j = prevState[i].values.findIndex(value => value.id == valueId)
            let newOptions:OptionType[] = JSON.parse(JSON.stringify(prevState))
            newOptions[i].values[j].price = parseInt(value)
            return newOptions
        })
    }
    const removeOpotionValue = (optionId:string, valueId:string) => {
        setOptions(prevState => {
            let newOptions = JSON.parse(JSON.stringify(prevState))
            let i = newOptions.findIndex((option: OptionType) => option.id == optionId)
            let j = newOptions[i].values.findIndex((value: OptionValueType) => value.id == valueId)
            newOptions[i].values.splice(j,1)
            return newOptions
        })
    }

    const setOptionValueImg = (img: string, optionId: string, valueId: string) => {
        setOptions(prevState => {
            let newOptions = JSON.parse(JSON.stringify(prevState))
            let i = newOptions.findIndex((option: OptionType) => option.id == optionId)
            let j = newOptions[i].values.findIndex((value: OptionValueType) => value.id == valueId)
            newOptions[i].values[j].img = img
            return newOptions
        })
    }

    const removeOption = (id:string) => {
        setOptions(prevState => {
            let newOptions = JSON.parse(JSON.stringify(prevState))
            let i = newOptions.findIndex((option: OptionType) => option.id == id)
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
        removeOption,
        handleValuePriceChange,
        setOptionValueImg
    }

    
}