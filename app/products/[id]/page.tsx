'use client'

import Debugger from "@/components/debugger";
import { useProducts } from "@/hooks/useProducts"
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImagesColumn } from "./_components/images-column";
import { ProductType } from "@/types";

interface params{
    params: {
        id: string
    }
}

export default function MyProductPage({params}: params){
    const {id} = params;
    const {getProduct} = useProducts();
    const [product, setProduct] = useState<ProductType | null>(null);


    useEffect(()=>{
        getProduct(id).then((data) => {
            setProduct(data);
        })
    }, [id, ])

    const onImgChange = (img: string, i: number) => {
        setProduct((prev) => {
            if(prev == null) return null;
            const updatedProduct= JSON.parse(JSON.stringify(prev));
            if(i == 0){
                updatedProduct.img = img;
            }else{
                updatedProduct.extraImages[i-1] = img;
            }
            return updatedProduct ;
        })

    }

    const removeImgSlot = (i: number) => {
        setProduct((prev) => {
            if(prev == null) return null;
            const updatedProduct= JSON.parse(JSON.stringify(prev));
            updatedProduct.images.splice(i, 1);
            return updatedProduct ;
        })
    }



    const addImageSlot = () => {

        setProduct((prev) => {
            if(prev == null) return null;
            const updatedProduct= JSON.parse(JSON.stringify(prev));
            updatedProduct.extraImages.push('');
            return updatedProduct ;
        })
    }
    return(
        <section className="flex flex-col items-center  h-screen min-h-screen pt-nav">
            <main className="flex items-center justify-center bg-white w-full">
                <div className="flex gap-5 w-full">{
                    product !=null ? (
                        <div className='flex max-w-[150px]'>
                            <ImagesColumn onImgChange={onImgChange} images={product.images} addImage={addImageSlot} removeImage={removeImgSlot}/>
                        </div>
                    ) : (
                        null
                    )}
                    <div className="flex flex-col gap-5 w-full max-w-6xl justify-center">
                        <header className="flex flex-col md:flex-row justify-between md:items-center w-full p-5 gap-5  m-2.5 rounded-xl bg-white">
                        </header>
                    </div>
                
                </div>
            </main>
        </section>
    )
}