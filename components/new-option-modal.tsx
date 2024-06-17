import { useNewOption } from "@/hooks/useNewOption";
import { OptionType } from "@/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface NewOptionModalProps {
    onClose: () => void;
}

export const NewOptionModal = (props: NewOptionModalProps) => {
    const {onClose} = props
    const { addOption, addOptionValue, handleOptionNameChange, handleOptionValueChange, options} = useNewOption()
    const [newOption, setNewOption] = useState<OptionType>({
        name: "",
        values: [],
        id: ""
    })
    

    const newSizeOption = () => {
        const option = addOption()
        handleOptionNameChange("Talla", option.id)
        const values = ['XS', 'S', 'M', 'L', 'XL']
        values.forEach(value => {
            const valueId = addOptionValue(option)
            handleOptionValueChange(value, option.id, valueId)
        })
    }
    const newShoeSizeOption = () => {
        const option = addOption()
        handleOptionNameChange("Talla", option.id)
        const values = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44']
        values.forEach(value => {
            const valueId = addOptionValue(option)
            handleOptionValueChange(value, option.id, valueId)
        })
    }
    const presets = [
        {
            name: 'Tallas',
            function: newSizeOption,
        },
        {
            name: 'Tallas (calzado)',
            function: newShoeSizeOption,
        },
        {
            name: 'Personalizado',
            function: addOption,
        },

    ]

    return(
        <div className="w-full max-w-lg shadow-xl bg-white p-5 flex flex-col gap-5 rounded-xl"onClick={e=>{
            e.stopPropagation()
        }}>
            <header className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-semibold">Nueva opción</h1>
                <button onClick={props.onClose} className="text-2xl font-semibold"><FontAwesomeIcon icon={faXmark}/></button>
            </header>
            <main className="flex flex-col gap-5">
                <div className="flex flex-col gap-2.5">
                    <h3 className="text-xl">Crear desde plantilla:</h3>
                    <div className="flex gap-2.5">
                        {
                            presets.map((preset, i) => (
                                <button onClick={e=>{
                                    preset.function()
                                    onClose()
                                
                                }} key={i}className={` p-2.5 rounded-md bg-main-500 text-white`} type="button">{preset.name}</button>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2.5">
                    <h3 className="text-xl">Personalizado</h3>
                    <input onChange={e=>{
                        setNewOption(prevState => ({
                            ...prevState,
                            name: e.target.value
                        }))
                    }} className="w-full p-2.5 border-b-2 border-gray-300" type="text" placeholder="Nombre de la opción"/>
                    <div className="flex  gap-2.5">
                        <button onClick={e=>onClose()} className=" border border-gray-300 w-full p-2.5 rounded-md outline-none" type="button">Cancelar</button>
                        <button onClick={e=>{
                            if(newOption.name){
                                addOption(newOption)
                            }else{
                                addOption()
                                
                            }
                            
                            onClose()
                        }} className="text-white w-full bg-secondary-500 p-2.5 rounded-md" type="button">Agregar opción</button>
                    </div>
                </div>
            </main>
        </div>
    )
}