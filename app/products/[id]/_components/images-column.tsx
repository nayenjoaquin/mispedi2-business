import { faImage, faPen, faPlus, faPlusSquare, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { createRef, useEffect } from 'react';
import { ImgPicker } from './img-picker';

interface Props{
    images: string[];
    addImage: () => void;
    onImgChange: (img: string, i: number) => void;
    removeImage: (i: number) => void;
}

export const ImagesColumn = ({images, addImage, onImgChange, removeImage}: Props) => {

    const columnRef = createRef<HTMLDivElement>()

useEffect(() => {
    columnRef.current?.scroll(
        {
            top: columnRef.current.scrollHeight,
            behavior: 'smooth'
        }
    
    )
}, [images.length])

useEffect(() => {
    console.log('images', images)
}, [images.length])

    return(
        <div ref={columnRef} className="flex flex-col gap-2.5 max-h-[calc(100vh-80px)] overflow-y-scroll">
            {images.map((img, index) => (
                <ImgPicker key={index}i={index} img={img} onChange={onImgChange} removeImage={removeImage}/>
            ))}
            <div className='flex items-center justify-center aspect-square rounded-md'>
                <FontAwesomeIcon icon={faPlusSquare} className='text-7xl text-gray-300 hover:text-gray-400 hover:scale-105 transition-all cursor-pointer py-10' onClick={e=>{
                    //add the image slot and scroll to the bottom
                    addImage()

                }}/>
            </div>
        </div>
    )
}