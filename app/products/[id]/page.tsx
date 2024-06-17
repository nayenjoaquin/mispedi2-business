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
    }, [id, getProduct])

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
                            <ImagesColumn images={[product.img, ...product.extraImages??[]]} addImage={addImageSlot}/>
                        </div>
                    ) : (
                        null
                    )
                }
                </div>
            </main>
        </section>
    )
}