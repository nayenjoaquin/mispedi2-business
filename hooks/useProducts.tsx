'use client'
import { ProductType } from "@/types";
import { useContext, useEffect, useState } from "react";
import {app, db,auth} from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { productContext } from "@/context/productsProvider";
import { get } from "http";
import { useBusiness } from "./useBusiness";

export const useProducts = () => {
    const {products, setProducts} = useContext(productContext);



    const getExtraImages = async (productId: string) => {
        const q = query(collection(db,"extraImages"), where("product", "==", productId));
         return getDocs(q).then((querySnapshot) => {
            const extraImages: string[] = [];
            querySnapshot.forEach((doc) => {
                extraImages.push(doc.data().url);
            });
            return extraImages;
        });
    }

    const initProducts =  (products: ProductType[]) => {
        setProducts(products);
    }

    return {
        products,
        getExtraImages,
        initProducts,
        
    }

}