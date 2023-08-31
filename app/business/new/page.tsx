'use client'
import FormGroup from "@/components/formGroup"
import { $NEW_BUSINESS } from "@/consts/Strings"
import { useBusiness } from "@/hooks/useBusiness"
import { useUser } from "@/hooks/useUser"
import { BusinessType } from "@/types"
import { faCameraAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export default function NewBusinessPage() {
    const {user} = useUser()
    const router = useRouter()
    const {createBusiness} = useBusiness()
    const [newBusiness, setNewBusiness] = useState<BusinessType>({
        name: "",
        logo: "",
        id: "",
        owner: "",
        description: "",
        url: ""

    })

    const handleChange = (e: any) => {
        const {name, value} = e.target
        setNewBusiness(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleImgChange = (e:any) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setNewBusiness(prevState => ({
                ...prevState,
                logo: reader.result as string
            }))
        }
    }

    const handleSubmit = async(e:any) => {
        e.preventDefault()
            user?
            setNewBusiness(prevState => {
                const newBusiness = {
                    ...prevState,
                    id: user.id +'-' + prevState.name,
                    owner: user.id
                }
            return newBusiness
            }):
            setNewBusiness(prevState => {
                const newBusiness = {
                    ...prevState,
                    id: 'guest-' + prevState.name,
                    owner: 'guest'
                }
            return newBusiness
            })
            await createBusiness(newBusiness)
            
    }

            



    const imgRef = useRef<HTMLInputElement>(null)
    return (
        <section className="min-h-screen pt-nav w-full flex flex-col items-center justify-center">
        <main className="w-full flex justify-center items-center">
            <form className="bg-white flex flex-col items-center w-full max-w-lg rounded-xl shadow-md p-5 gap-5" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold">{$NEW_BUSINESS}</h1>
                <div onClick={e=>{
                    imgRef.current?.click()
                }} className=" rounded-full bg-main-500  w-40 aspect-square flex items-center justify-center transition-all hover:bg-main-600 hover:text-main-500 cursor-pointer">
                    <input onChange={handleImgChange} type="file" className="absolute" ref={imgRef} hidden />
                    {newBusiness.logo ?<Image className=" aspect-square object-cover h-full rounded-full" src={newBusiness.logo} width={208} height={208} alt="business logo" />:
                    <FontAwesomeIcon icon= {faCameraAlt} className="text-7xl text-main-400 opacity-80"/>}
                </div>
                <FormGroup label="Nombre" name="name" handleChange={handleChange} inputType="text"  />
                <div className="w-full flex flex-col">
                    <label className=" font-semibold" htmlFor="description">Descripción</label>
                    <textarea onChange={handleChange} name="description" id="description" cols={10} className="w-full h-40 p-2 rounded-md border border-gray-300 outline-none focus:border-main-600 focus:border-2" />
                </div>
                <div className="flex justify-center gap-5">
                    <button onClick={e=>{
                        router.back()
                    }} type="button" className="border-gray-300 border bg-transparent px-5 py-2.5 rounded transition-all hover:bg-neutral-200"> Cancelar</button>
                    <button  type="submit" className="bg-secondary-500 text-white px-5 py-2.5 rounded transition-all hover:bg-secondary-600"> Crear Negocio</button>
                </div>
                
            </form>
        </main>
        </section>
    )
}