import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface OptionValueImgPickerProps {
    handleChange: (img: string)=>void;
    img?: string;
}

export const OptionValueImgPicker = (props: OptionValueImgPickerProps) => {

    const {handleChange, img} = props
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e: any) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            handleChange(e.target!.result as string)
        }
        reader.readAsDataURL(file)
    }
    const handleClick = () => {
        input.click()
    }

    return(
        <>
        {
            img
            ?  <Image src={img} width={100} height={100} alt="option value img" className="rounded-md aspect-square object-cover w-full max-w-[50px]"/>
            :  <div className="grid place-content-center bg-gray-300 p-2.5 rounded-md cursor-pointer" onClick={handleClick}>
                <FontAwesomeIcon icon={faImage} className="text-white text-2xl"/>
            </div>
        }
        </>
    )
}