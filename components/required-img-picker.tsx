import { useRequiredImg } from "@/hooks/useRequiredImg"
import { RequiredImgType } from "@/types"
import { useEffect } from "react"

interface props{
    handleChange: (requiredImgs: RequiredImgType[]) => void
}

export default function RequiredImgPicker(props:props) {
    const {addRequiredImg, removeRequiredImg, requiredImgs, handleMessageChange} = useRequiredImg()
    const {handleChange} = props

    useEffect(()=>{
       requiredImgs &&  handleChange(requiredImgs)
    },[requiredImgs])
    return (
        <div className="flex flex-col gap-5 px-5">
            <h2 className="text-2xl font-semibold">Imágenes requeridas</h2>
            {requiredImgs.length>0 ?
                <ul className="flex flex-col gap-5">
                    {requiredImgs.map((requiredImg,i) => (
                        <li key={i} className="flex gap-2.5">
                            <span>{i+1}.- </span>
                            <input type="text" onChange={e=>{
                                handleMessageChange(e,i)
                            }} placeholder="Dile al cliente qué debe subir aquí"  className="border border-neutral-300 outline-none w-full rounded px-2.5 py-2.5"/>
                            <button type="button" onClick={e=>removeRequiredImg(i)} className="text-white  bg-red-500 transition-all hover:bg-red-600 px-5 py-2.5 rounded">Eliminar</button>
                        </li>
                    ))}
                </ul>
                :
                <p>Agrega una nueva imagen requerida...</p>                
                }
            <button type="button" onClick={addRequiredImg} className="text-white bg-secondary-500 transition-all hover:bg-secondary-600 px-5 py-2.5 rounded">Agregar Imagen</button>
        </div>
    )
}