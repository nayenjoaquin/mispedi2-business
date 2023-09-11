'use client'
import { OptionType, ProductType } from "@/types";
import { useContext, useEffect, useState } from "react";
import {app, db,auth, storage, } from "@/firebase/config";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { productContext } from "@/context/productsProvider";
import { get } from "http";
import { useBusiness } from "./useBusiness";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/navigation";

export const useProducts = () => {
    const {products, setProducts} = useContext(productContext);
    const router = useRouter();



    const addImg = async (img: string, productId: string) => {
        const storageRef = ref(storage, `products/${productId}`)
        const snapshot = await uploadString(storageRef, img, 'data_url')
        const url = await getDownloadURL(snapshot.ref)
        return url;
    }

    const addExtraImages= async (extraImages: string[], productId: string) => {
        const extraImagesURL: string[] = [];
        for( const img of extraImages){
            if(!img) continue;
            const storageRef = ref(storage, `products/${productId}-${extraImages.indexOf(img)}`)
            const snapshot = await uploadString(storageRef, img, 'data_url')
            const url = await getDownloadURL(snapshot.ref)
            extraImagesURL.push(url);
        }
        return extraImagesURL;
    }

    const addNewProduct = async (product: ProductType) => {
        console.log(product);
        product.img = await addImg(product.img, product.id);
        if(product.extraImages){
            product.extraImages = await addExtraImages(product.extraImages, product.id);
        }
        const docRef = doc(db, "products", product.id);
        await setDoc(docRef, product);
        setProducts(prev => {
            if(prev){
                return [...prev, product]
            }else{
                return [product]
            }
        })
        router.back();
    }

    const deleteProduct = async (productId: string) => {
        const docRef = doc(db, "products", productId);
        await deleteDoc(docRef);
        setProducts(prev =>{
            if(prev){
                return prev.filter(product => product.id !== productId)
            }else{
                return prev;
            }
        })
    }


    const initProducts =  (products: ProductType[]) => {
        setProducts(products);
    }

    return {
        products,
        initProducts,
        addNewProduct,
        deleteProduct,
        
    }

}