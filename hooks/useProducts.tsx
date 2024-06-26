'use client'
import { NewProductType, OptionType, ProductType } from "@/types";
import { useContext, useEffect, useState } from "react";
import {app, db,auth, storage, } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
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

    const uploadImages= async (images: string[], productId: string) => {
        const imagesURL: string[] = [];
        for( const img of images){
            if(img == '') {
                imagesURL.slice(imagesURL.indexOf(img), 1);
                continue;
            }
            const storageRef = ref(storage, `products/${productId}-${images.indexOf(img)}`)
            const snapshot = await uploadString(storageRef, img, 'data_url')
            const url = await getDownloadURL(snapshot.ref)
            imagesURL.push(url);
        }
        return imagesURL;
    }

    const addNewProduct = async (product: NewProductType) => {
        const collectionRef = collection(db, "products");
        const docRef = await addDoc(collectionRef, {});


        product.images = await uploadImages(product.images, docRef.id);
        try{
            await setDoc(doc(db, "products", docRef.id), product);
        }catch(e){
            throw new Error('Error adding product')
        }

        setProducts(prev => {
            if(prev){
                return [...prev, product as ProductType]
            }else{
                return prev
            }
        })
        router.push('/products');
        return
        
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
        return;
    }

    const getProduct = async (productId: string) => {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            return {
                ...docSnap.data(),
                id: docSnap.id
            } as ProductType
        }else{
            throw new Error('Product not found');
        }
    }
        
        


    const initProducts =  (products: ProductType[]) => {
        setProducts(products);
    }

    return {
        products,
        initProducts,
        addNewProduct,
        deleteProduct,
        getProduct
    }

}