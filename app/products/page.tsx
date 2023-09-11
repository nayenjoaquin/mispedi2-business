'use client'
import Debugger from "@/components/debugger";
import { useBusiness } from "@/hooks/useBusiness";
import { useProducts } from "@/hooks/useProducts";
import { ProductType } from "@/types";
import { faEye, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function ProductsPage(){
    const {products, initProducts, deleteProduct} = useProducts();
    const {business} = useBusiness();


    

    return(
        <section className="flex flex-col items-center  h-screen min-h-screen pt-nav px-5">
            <header className="flex flex-col md:flex-row justify-between md:items-center w-full p-5 gap-5  m-2.5 rounded-xl bg-white">
                <h1 className="text-3xl font-semibold text-center md:text-start">Mis Productos</h1>
                <div className="flex items-center gap-5 justify-center">
                    <button onClick={e=>{
                        business && window.open(business.url)
                    }} className="btn btn-primary bg- p-2.5 rounded transition-all hover:bg-neutral-200 flex gap-2.5 items-center text-xs md:text-base font-medium border">Visitar Tienda
                    <FontAwesomeIcon icon={faEye}/>
                    </button>
                    <Link href="/products/new"><button className="btn btn-primary bg-secondary-500 p-2.5 rounded transition-all hover:bg-secondary-600 flex gap-2.5 items-center text-xs md:text-base font-medium text-white">Agregar Producto
                    <FontAwesomeIcon icon={faPlus}/></button></Link>
                </div>
            </header>
            <main className="flex items-center justify-center bg-white w-full rounded-xl ">
                <ul className=" flex flex-col py-5 w-full gap-2.5">
                    {products && products.map((product) => (
                        <li key={product.id} className="flex items-center justify-between gap-5 transition-all hover:bg-neutral-200 px-5 cursor-pointer">
                            <div className="flex items-center gap-5">
                                <Image src={product.img} className="aspect-square object-cover rounded" alt="product img" width={50} height={50} />
                                <p className="">{product.name}</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <p className="">${product.price}</p>
                                <div className="flex items-center gap-2.5">
                                    <button onClick={e=>{
                                        toast.promise(deleteProduct(product.id), {
                                            pending: 'Eliminando producto...',
                                            success: 'Producto eliminado',
                                            error: 'Error al eliminar producto'
                                        },{
                                            position: 'top-center',
                                            autoClose: 1000,
                                        })
                                    }
                                    } className="bg-red-500 rounded px-2.5 py-2 text-white transition-all hover:bg-red-600">
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    )
}