import { newOptionContext } from "@/context/newOptionsProvider"
import { NewOptionValueType, OptionType, OptionValueType } from "@/types"
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
    const handleOptionNameChange = (e: any, optionId: string) => {
        const {value} = e.target
        setOptions(prevState => {
            let newOptions:OptionType[]= JSON.parse(JSON.stringify(prevState))
            let i = newOptions.findIndex(option => option.id == optionId)
            newOptions[i].name = value
            newOptions[i].values.forEach((value, j) => {
                value.option = newOptions[i].name
            })
            console.log(newOptions)
            return newOptions
        })
    }

    const handleValuePriceSwitch = (e: any, optionId: string , valueId: string) => {
        const {checked} = e.target
        setOptions(prevState => {
            let newOptions:OptionType[] = JSON.parse(JSON.stringify(prevState))
            let i = newOptions.findIndex(option => option.id == optionId)
            let j = newOptions[i].values.findIndex(value => value.id == valueId)
            newOptions[i].values[j].changePrice = checked
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
                changePrice: false,
            }
            let newOptions = JSON.parse(JSON.stringify(prevState))
            newOptions[i].values.push(newOptionValue)
            return newOptions
        })
    }

    const handleOptionValueChange = (e: any, optionId: string, valueId: string) => {
        const {value} = e.target
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
        handleValuePriceSwitch,
    }

    
}