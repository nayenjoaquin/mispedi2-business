import { useNewOption } from "@/hooks/useNewOption"
import { OptionType } from "@/types"
import { faImage, faInfo, faInfoCircle, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OptionValueImgPicker } from "./option-value-img-picker"

interface OptionEditorProps{
    option: OptionType
}

export const OptionEditor = (props: OptionEditorProps) => {
    const {option} = props
    const {addOptionValue, removeOpotionValue, removeOption, handleOptionNameChange, handleOptionValueChange, setOptionValueImg} = useNewOption()
    return(
        <div className="w-full p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2.5 justify-between">
                <div className="flex flex-col ">
                    <label className="font-semibold flex items-center gap-2" htmlFor="option-name">Nombre Opción
                    <span className="">
                        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500"/>
                    </span>
                    </label>
                    <input onChange={e=>handleOptionNameChange(e.target.value, option.id)} name="option-name" className="w-full max-w-xs p-2.5 outline-none border-b-2 " type="text" placeholder="ej: Talla" value={option.name}/>
                </div>
            </div>
            <div className="flex flex-col gap-2.5 justify-between ">
                <h4 className="text-xl font-semibold">Valores</h4>
                <div className="flex flex-col gap-2.5 max-h-80 overflow-y-scroll">
                    {
                        option.values.map((value,i) => (
                            <div key={value.id} className="flex items-center gap-2.5">
                                <input onChange={e=>handleOptionValueChange(e.target.value,option.id, value.id)} className="w-full p-2.5 border border-gray-300 rounded-xl" type="text" value={value.name}/>
                                <OptionValueImgPicker handleChange={img=>{
                                    setOptionValueImg(img, option.id, value.id)
                                }} img={value.img}/>
                                <input type="number" className="w-20 p-2.5 border border-gray-300 rounded-xl" placeholder="Stock"/>
                                <button onClick={e=>removeOpotionValue(option.id, value.id)} className=" text-red-500 p-2.5 rounded-xl" type="button"><FontAwesomeIcon icon={faTrash}/></button>
                            </div>
                        ))
                    }
                </div>
                <button onClick={e=>{
                    if(option.values.length < 5){
                        addOptionValue(option)
                    }
                }} className="text-white bg-main-500 p-2.5 rounded-md" type="button">Agregar valor</button>
            </div>
            <div className='w-full flex justify-center col-span-2'>
                <button onClick={e=>removeOption(option.id)} className="text-white bg-red-500 p-2.5 w-full max-w-xs rounded-md " type="button">Eliminar opción</button>
            </div>
        </div>
    )

}
