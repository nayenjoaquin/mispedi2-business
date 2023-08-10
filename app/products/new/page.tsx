'use client'
import ImgPicker from "@/components/imgPicker";
import { ProductType } from "@/types";
import { useState } from "react";

export default function NewProductPage() {
    const [newProduct, setNewProduct] = useState<ProductType>({
        name: "",
        price: 0,
        img: "",
        description: "",
        business: "",
        id: "",
        extraImages: ["","","",""]
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
            newExtraImages[i] = img as string:
            newExtraImages = ["","","",""]
            newExtraImages[i] = img as string
            return{
                ...prevState,
                extraImages: newExtraImages
            }
        })
    }     


        
    return(
        <section className="pt-nav bg-white h-screen">
            <header className="flex flex-col md:flex-row justify-between md:items-center w-full p-5 gap-5  m-2.5 rounded-xl bg-white">
                <h1 className="text-3xl font-semibold">Nuevo Producto</h1>
            </header>
            <main>
                <form>
                    <ImgPicker handleChange={handleImgChange}/>
                </form>
            </main>

        </section>
    )
}