'use client'
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRef, useState } from "react"

interface ImgInputProps {
    main:boolean
    i: number
    handleChange: (img:ArrayBuffer|string, i:number)=>void
    handleRemove: (i: number) => void
}

const ImgInput = (props: ImgInputProps) => {

    const [img, setImg] = useState<string | ArrayBuffer | null >("")
    const {main, i, handleChange, handleRemove}= props
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        inputRef.current?.click()
    }
    const handlePick = (e: any) => {
        const file = e.target.files[0]
        if(!file) return
        const reader = new FileReader()
        reader.onloadend = () => {
            setImg(reader.result)
            handleChange(reader.result as string, i)
        }
        reader.readAsDataURL(file)
    }
    const removeImg = (e:any) => {
        e.stopPropagation()
        handleRemove(i)
        setImg("")
    }

    
    return(
        <div onClick={handleClick} className={` relative flex flex-col items-center  h-full min-h-[200px] w-full justify-center gap-5 bg-main-400 ${main ? "col-span-2  md:row-span-2" : ""} rounded-lg transition-all hover:bg-main-500 cursor-pointer `}>
            {
                !img?
                <FontAwesomeIcon icon={faPlus} className="text-5xl text-main-200 opacity-50"/>:
                <div className="relative h-full w-full">
                    <Image src={img as string} alt="new product uploaded img" className="  object-cover rounded-lg h-full w-full max-h-[200px] md:max-h-full" width={200} height={200}/>
                    <FontAwesomeIcon onClick={removeImg} icon={faXmark} className="absolute top-2 right-2 text-neutral-300 text-2xl cursor-pointer transition-all hover:text-neutral-500"/>
                </div>}
                <span className="absolute left-2.5 bottom-0 text-2xl text-white font-semibold"> {i+1} </span>
            <input type="file" onChange={handlePick} ref={inputRef} hidden/>
        </div>
    )
}

interface ImgPickerProps {
    handleChange: (img: ArrayBuffer| string, i:number) => void
    handleRemove: (i:number)=>void
}


export default function ImgPicker(props: ImgPickerProps) {

    const {handleChange, handleRemove} = props
    return (
        <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-4 imgPickerGrid gap-5 md:grid-flow-col w-full place-items-center">
            {
                Array.from(Array(5).keys()).map((i) => (
                    <ImgInput key={i} main={i==0 ? true : false} i={i} handleChange={handleChange} handleRemove={handleRemove}/>
                ))
            }
        </div>
    )
}