'use client'
import Debugger from "@/components/debugger";
import { useBusiness } from "@/hooks/useBusiness";
import { useProducts } from "@/hooks/useProducts";
import { ProductType } from "@/types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function ProductsPage(){
    const {products} = useProducts();

    return(
        <section className="flex flex-col items-center  h-screen min-h-screen pt-nav px-5">
            <header className="flex flex-col md:flex-row justify-between md:items-center w-full p-5 gap-5  m-2.5 rounded-xl bg-white">
                <h1 className="text-3xl font-semibold">Mis Productos</h1>
                <div className="flex items-center gap-5">
                    <button className="btn btn-primary bg-secondary-500 p-2.5 rounded transition-all hover:bg-secondary-600 flex gap-2.5 items-center text-md font-medium text-white">Agregar Producto
                    <FontAwesomeIcon icon={faPlus}/></button>
                </div>
            </header>
            <main className="flex items-center justify-center bg-white w-full rounded-xl ">
                <ul className=" p-5 w-full">
                    {products && products.map((product) => (
                        <li key={product.id} className="flex items-center justify-between gap-5">
                            <div className="flex items-center gap-5">
                                <Image src={product.img} alt="product img" width={50} height={50} />
                                <p className="">{product.name}</p>
                            </div>
                            <p>${product.price}</p>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    )
}