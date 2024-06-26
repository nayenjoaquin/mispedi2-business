'use client'

import { faImage, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import React, { useEffect, useRef } from "react"
import { useState } from "react"

interface props{
    img: string,
    onChange: (img: string,i: number) => void,
    i: number,
    removeImage: (i: number) => void
}


export const ImgPicker = ({img, onChange,i, removeImage}: props) => {
    const [selectedImg, setSelectedImg] = useState(img)

    useEffect(() => {
        if(img.includes('data:image')){
            //base 64 to file
            fetch(img)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'img', {type: 'image/png'})
                const reader = new FileReader()
                reader.onloadend = () => {
                    setSelectedImg(reader.result as string)
                }
                reader.readAsDataURL(file)
            })
        }}, [img])

    const inputRef = React.createRef<HTMLInputElement>()

    const changeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file){
            const reader = new FileReader()
            reader.onloadend = () => {
                onChange(reader.result as string, i)
            }
            reader.readAsDataURL(file)
        }
    }


    return(
        <div className="relative flex items-center justify-center w-full aspect-square rounded-md">
            <label className="absolute bg-black px-2 rounded-sm bottom-1 right-1 font-extrabold text-white">{i+1}</label>
            <FontAwesomeIcon icon={faTrash} className='absolute top-1 right-1 text-red-500 z-10 text-2xl cursor-pointer' onClick={e=>{
                removeImage(i)
            }}/>
            <input type="file" ref={inputRef} className='hidden' onChange={changeImg}/>
            {selectedImg == '' ?
                <div onClick={e=>{
                    inputRef.current?.click()
                }} className='aspect-square cursor-pointer w-full flex justify-center items-center bg-gray-200 rounded-md'>
                    <FontAwesomeIcon icon={faImage} className='text-5xl text-gray-500'/>
                </div>
                :<>
                <Image src={selectedImg} alt='img' height={500} width={500} className='aspect-square object-cover'/>
                <div onClick={e=>{
                    inputRef.current?.click()
                }} className='absolute flex cursor-pointer justify-center items-center top-0 left-0 bg-black rounded-md w-full h-full opacity-0 hover:opacity-25 transition-all'>
                    <FontAwesomeIcon icon={faPen} className='text-white text-3xl'/>
                </div>
                </>
            }
        </div>
    )
}