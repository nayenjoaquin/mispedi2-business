'use client'
import FormGroup from "@/components/formGroup";
import ImgPicker from "@/components/imgPicker";
import OptionPicker from "@/components/optionPicker";
import { NewOptionProvider } from "@/context/newOptionsProvider";
import { useBusiness } from "@/hooks/useBusiness";
import { useProducts } from "@/hooks/useProducts";
import { NewProductType, OptionType, ProductType, RequiredImgType } from "@/types";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RequiredImgPicker from "@/components/required-img-picker";
import { RequiredImgsProvider } from "@/context/newRequiredImgProvider";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
    const {business} = useBusiness()
    const {addNewProduct} = useProducts()
    const router = useRouter()
    const [newProduct, setNewProduct] = useState<NewProductType>({
        name: "",
        price: 0,
        img: "",
        description: "",
        business: "",
        extraImages: ["","","",""],
        options: [],
        requiredImg: [],
    })

    const handleChange = (e: any) => {
        const {name, value} = e.target
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleImgChange = (img:ArrayBuffer |string, i:number) => {
        i==0? setNewProduct(prevState => ({
            ...prevState,
            img: img as string        
        })):

        setNewProduct(prevState => {
            let newExtraImages = prevState.extraImages
            newExtraImages?
            newExtraImages[i-1] = img as string:
            newExtraImages = ["","","",""]
            newExtraImages[i-1] = img as string
            return{
                ...prevState,
                extraImages: newExtraImages
            }
        })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setNewProduct(prevState => {
            if(business){
                const newProduct = {
                    ...prevState,
                    business: business.id,
                }
                toast.promise(addNewProduct(newProduct), {
                    pending: "Creando producto...",
                    success: "Producto creado",
                    error: "Error al crear producto"
                },{
                    position: "top-center"
                })

                return newProduct
            }else{
                return prevState
            }
        })
    }

    const removeImg = (i:number) => {
        setNewProduct(prevState => {
            let newExtraImages = prevState.extraImages
            newExtraImages ?
            newExtraImages[i-1] = "":
            newExtraImages = ["","","",""]

            return{
                ...prevState,
                extraImages: newExtraImages
            }
        })
    }
    const handleOptionsChange = (options: OptionType[]) => {
        setNewProduct(prevState => ({
            ...prevState,
            options
        }))
    }

    const handleRequiredImgChange = (requiredImgs: RequiredImgType[]) => {
        setNewProduct(prevState => ({
            ...prevState,
            requiredImg: requiredImgs
        }))
    }


        
    return(
        <section className="pt-nav bg-white min-h-screen">
            
            <header className="flex flex-col md:flex-row justify-between md:items-center p-5 gap-5  m-2.5 rounded-xl bg-white">
                <h1 className="text-3xl font-semibold flex justify-center w-full">{newProduct.name ? newProduct.name : "Nuevo producto"}</h1>
            </header>
            <main className="bg-white w-full">
                <form className="flex flex-wrap bg-white gap-5 w-full justify-center" onSubmit={handleSubmit}>
                    <ImgPicker handleChange={handleImgChange} handleRemove={removeImg}/>
                    <div className="flex flex-col   gap-5 w-full max-w-xl px-5" >
                    <NewOptionProvider><OptionPicker handleOptionsChange={handleOptionsChange}/></NewOptionProvider>
                    <RequiredImgsProvider><RequiredImgPicker handleChange={handleRequiredImgChange}/></RequiredImgsProvider>
                    <div className="flex flex-col   gap-5 w-full max-w-xl px-5" >
                        <FormGroup label="Nombre" name="name" inputType="text" handleChange={handleChange} errors={{}}/>
                        <FormGroup label="Precio base" name="price" inputType="number" handleChange={handleChange} errors={{}}/>
                        <label htmlFor="description" className="font-semibold">Descripción</label>
                        <textarea name="description" className="border border-gray-300 rounded w-full px-3 py-2 focus:border-main-500 focus:border-2 outline-none transition-all" onChange={handleChange}></textarea>
                        <div className="flex gap-5 w-full justify-center">
                            <button type="button" onClick={e=>{
                                e.preventDefault()
                                router.back()
                            }}
                            className="border border-gray-300 bg-none px-5 py-2.5 w-60 rounded-md font-semibold transition-all hover:bg-neutral-200">Cancelar</button>
                            <button className="bg-secondary-500 px-5 py-2.5 w-60 rounded-md font-semibold text-white transition-all hover:bg-secondary-600">Guardar</button>
                            
                        </div>
                    </div>
                    </div>
                </form>
            </main>
        </section>
    )
}