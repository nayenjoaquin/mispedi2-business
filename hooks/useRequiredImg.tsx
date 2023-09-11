'use client'

import { RequiredImgsContext } from "@/context/newRequiredImgProvider"
import { RequiredImgType } from "@/types"
import { useContext } from "react"

export const useRequiredImg = () =>{
const {requiredImgs, setRequiredImgs} = useContext(RequiredImgsContext)

const addRequiredImg = () => {
    setRequiredImgs((prevState: RequiredImgType[]) => {
        const newRequiredImgs =JSON.parse(JSON.stringify(prevState))
        newRequiredImgs.push({
            message: "",
        })
        return newRequiredImgs
    })
}

const removeRequiredImg = (i: number) => {
    setRequiredImgs((prevState: RequiredImgType[]) => {
        const newRequiredImgs =JSON.parse(JSON.stringify(prevState))
        newRequiredImgs.splice(i,1)
        return newRequiredImgs
    })
}

const handleMessageChange = (e: any, i: number) => {
    const {value} = e.target
    setRequiredImgs((prevState: RequiredImgType[]) => {
        const newRequiredImgs =JSON.parse(JSON.stringify(prevState))
        newRequiredImgs[i].message = value
        return newRequiredImgs
    })
}
    return {
        addRequiredImg,
        removeRequiredImg,
        requiredImgs,
        handleMessageChange
    }
}