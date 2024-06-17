'use client'
import FormGroup from "@/components/formGroup";
import ImgPicker from "@/components/imgPicker";
import { NewOptionProvider } from "@/context/newOptionsProvider";
import { useBusiness } from "@/hooks/useBusiness";
import { useProducts } from "@/hooks/useProducts";
import { NewProductType, OptionType, ProductType, RequiredImgType } from "@/types";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RequiredImgsProvider } from "@/context/newRequiredImgProvider";
import { useRouter } from "next/navigation";
import {AnimatePresence, motion} from "framer-motion"
import { OptionsSelector } from "@/components/options_selector";
import { NewOptionModal } from "@/components/new-option-modal";

export default function NewProductPage() {
    const {business} = useBusiness()
    const {addNewProduct} = useProducts()
    const router = useRouter()
    const [newOptionModal, setNewOptionModal] = useState(false)
    const [newProduct, setNewProduct] = useState<NewProductType>({
        name: "",
        price: 0,
        img: "",
        description: "",
        business: business!.id as string,
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
        if(business){
            toast.promise(addNewProduct(newProduct), {
                pending: "Creando producto...",
                success: "Producto creado",
                error: "Error al crear producto"
            },{
                position: "top-center",
                autoClose: 1000,
            })
        }else{
            toast.error("No se ha podido crear el producto")
        }
        
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
        <NewOptionProvider>
        <div className="pt-nav bg-white min-h-screen relative">
            <AnimatePresence>
            {
                newOptionModal?
                <motion.div 
                    onClick={()=>setNewOptionModal(false)}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="fixed p-5 bg-black bg-opacity-50 w-full min-h-screen  top-0 left-0 z-50 flex justify-center items-center"
                >
                        <NewOptionModal onClose={()=>setNewOptionModal(false)}/>
                </motion.div>
                :null
            }
            </AnimatePresence>
            <header className="flex flex-col md:flex-row justify-between md:items-center p-5 gap-5  m-2.5 rounded-xl bg-white">
                <h1 className="text-3xl font-semibold flex justify-center w-full">{newProduct.name ? newProduct.name : "Nuevo producto"}</h1>
            </header>
            <main className="bg-white w-full p-5 flex flex-col items-center">
                <form  className="flex flex-col bg-white gap-5 w-full max-w-6xl justify-center" onSubmit={handleSubmit}>
                    <section className="flex flex-col lg:flex-row gap-5 items-center  w-full">
                        <ImgPicker handleChange={handleImgChange} handleRemove={removeImg}/>
                        <div className="flex flex-col  gap-5 w-full lg:max-w-sm" >
                            <FormGroup label="Nombre" name="name" inputType="text" handleChange={handleChange} errors={{}}/>
                            <FormGroup label="Precio base" name="price" inputType="number" handleChange={handleChange} errors={{}}/>
                            <label htmlFor="description" className="">Descripción</label>
                            <textarea name="description" className="border border-gray-300 rounded w-full px-3 py-2 focus:border-main-500 focus:border-2 outline-none transition-all" onChange={handleChange}></textarea>
                            
                        </div>
                    </section>
                    <section className="flex flex-col gap-5 w-full">
                        <header>
                            <h2 className="text-3xl font-semibold flex w-full">Opciones</h2>

                        </header>
                        <div className="flex w-full items-center">
                            
                                <OptionsSelector onAddClick={()=>{
                                    setNewOptionModal(true)
                                }} handleOptionChange={handleOptionsChange}/>
                        </div>
                    </section>
                    <div className="flex gap-5 w-full justify-center">
                            <button type="button" onClick={e=>{
                                e.preventDefault()
                                router.replace("/products")
                            }}
                            className="border border-gray-300 bg-none px-5 py-2.5 w-60 rounded-md font-semibold transition-all hover:bg-neutral-200">Cancelar</button>
                            <button className="bg-secondary-500 px-5 py-2.5 w-60 rounded-md font-semibold text-white transition-all hover:bg-secondary-600" type="submit">Guardar</button>
                            
                        </div>
                </form>
            </main>
        </div>
        </NewOptionProvider>
    )
}