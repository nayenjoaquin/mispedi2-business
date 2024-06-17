import { faPen, faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

interface Props{
    images: string[];
    addImage: () => void;
}

export const ImagesColumn = ({images, addImage}: Props) => {

    return(
        <div className="flex flex-col gap-2.5 max-h-[calc(100vh-80px)] overflow-y-scroll">
            {images.map((img, index) => (
                img == '' ? 
                <div className='aspect-square bg-gray-200 rounded-md' key={img}>
                    <FontAwesomeIcon icon={faPen} className='text-5xl text-gray-500'/>
                </div>
                :
                <div key={index} className="relative w-full aspect-square rounded-md">
                    <Image className='aspect-square object-cover' src={img} alt='img' height={500} width={500}/>
                    <div className=" top-0 absolute flex items-center justify-center opacity-0 cursor-pointer w-full h-full bg-black hover:opacity-30 transition-all  p-1 rounded-md">
                        <FontAwesomeIcon icon={faPen} className='text-5xl text-white'/>
                    </div>
                </div>
                
            ))}
            <div className='flex items-center justify-center aspect-square rounded-md'>
                <FontAwesomeIcon icon={faPlusSquare} className='text-7xl text-gray-300 hover:text-gray-400 hover:scale-105 transition-all cursor-pointer py-10' onClick={e=>{
                    addImage();
                }}/>
            </div>
        </div>
    )
}