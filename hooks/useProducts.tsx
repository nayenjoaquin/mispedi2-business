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

    const addExtraImages= async (extraImages: string[], productId: string) => {
        const extraImagesURL: string[] = [];
        for( const img of extraImages){
            if(img == '') {
                extraImagesURL.slice(extraImagesURL.indexOf(img), 1);
                continue;
            }
            const storageRef = ref(storage, `products/${productId}-${extraImages.indexOf(img)}`)
            const snapshot = await uploadString(storageRef, img, 'data_url')
            const url = await getDownloadURL(snapshot.ref)
            extraImagesURL.push(url);
        }
        return extraImagesURL;
    }

    const addNewProduct = async (product: NewProductType) => {
        const collectionRef = collection(db, "products");

        let newDocRef;
        try{
             newDocRef = await addDoc(collectionRef, {});
        }catch(e){
            throw new Error('Error adding product')
        }

        
        const newProduct = {...product, id: newDocRef!.id}


        newProduct.img = await addImg(product.img, newProduct.id);
        if(product.extraImages){
            newProduct.extraImages = await addExtraImages(product.extraImages, newProduct.id);
        }
        try{
            await setDoc(doc(db, "products", newProduct.id), newProduct);
        }catch(e){
            throw new Error('Error adding product')
        }

        setProducts(prev => {
            if(prev){
                return [...prev, newProduct]
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
            return docSnap.data() as ProductType;
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