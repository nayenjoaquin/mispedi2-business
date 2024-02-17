import { useNewOption } from "@/hooks/useNewOption";
import { OptionType } from "@/types";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { OptionEditor } from "./option_editor";

interface OptionsSelectorProps {
    handleOptionChange: (options: OptionType[]) => void;
    onAddClick: () => void;
}

export const OptionsSelector = (props: OptionsSelectorProps) => {
    const { handleOptionChange, onAddClick} = props;

    const {options, addOption} = useNewOption()
    const [optionIndex, setOptionIndex] = useState<number>(0)



    return(
        <div className="flex flex-col gap-5 w-full">
            <header className="flex items-center justify-between w-full">
                <div className="flex items-end gap-2.5 overflow-auto">
                    {
                        options.length>0 ?
                         options.map((option,i) => (
                            <p onClick={e=>{
                                setOptionIndex(i)
                            }} className={`text-xl min-w-[50px] cursor-pointer hover:bg-gray-200 transition-all }${optionIndex==i ? 'border border-b-2 border-main-500' : ''} max-w-[150px] truncate`} key={option.id}>{option.name}</p>
                        ))
                        :
                        <p>Agrega opciones</p>
                    }
                </div>
                <button onClick={e=>onAddClick()} className=" " type="button">
                    <FontAwesomeIcon className="text-secondary-500 text-4xl p-2.5" icon={faPlusSquare}/>
                </button>
            </header>
            <div>
                {options.length>0 ?
                options.map((option,i) =>{
                    if(optionIndex == i){
                        return(
                            <OptionEditor key={option.id} option={option}/>
                        )
                    }else{
                        return <></>
                    }
                })
                : <></>
                }
            </div>
        </div>
    )
}