
import { FormGroupPropsType } from "@/types";

export default function FormGroup(props: FormGroupPropsType){
    const {label, name, handleChange, inputType} = props
    return(
        <div className="flex flex-col w-full justify-center gap-2.5">
                    <label className=" font-semibold">{label}</label>
                    <input className="border border-gray-300 rounded w-full px-3 py-2 focus:border-main-500 focus:border-2 outline-none transition-all" type={inputType} onChange={handleChange} name={name}/>
                </div>
    )
}