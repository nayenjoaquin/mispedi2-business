
import { FormGroupPropsType } from "@/types";

export default function FormGroup(props: FormGroupPropsType){
    const {label, name, handleChange, inputType, errors, required} = props
    return(
        <div className="flex flex-col w-full justify-center gap-2.5">
                    <label className=" ">{label}</label>
                    <input className={`border border-gray-300 rounded w-full px-3 py-2 focus:border-main-500 focus:border-2 outline-none transition-all${errors[name] ? "border-2 border-red-500" : ""}`} type={inputType} onChange={handleChange} name={name} required={required}/>
                    {errors[name] && <span className="text-red-500 text-sm font-semibold">{errors[name]}</span>}
                </div>
    )
}