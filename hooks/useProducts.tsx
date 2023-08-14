'use client'
import { OptionType, ProductType } from "@/types";
import { useContext, useEffect, useState } from "react";
import {app, db,auth, storage, } from "@/firebase/config";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { productContext } from "@/context/productsProvider";
import { get } from "http";
import { useBusiness } from "./useBusiness";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/navigation";

export const useProducts = () => {
    const {products, setProducts} = useContext(productContext);
    const router = useRouter();



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

    const addExtraImg = (extraImg: Array<{img:string, id: string }>, productId: string) => {
        extraImg.forEach((img, i) => {
            if(img.img){
                const storageRef = ref(storage, `products/${img.id}`)
                uploadString(storageRef, img.img, 'data_url').then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setDoc(doc(db, 'extraImages', img.id), {img: url, product: productId, id: img.id}).then((res) => {
                            console.log('extra img added')
                        })
                    })
                })
            }


        })
    }

    const addOptionValues = (optionValues: string[], optionId: string) => {
        optionValues.forEach((value, i) => {
            const id = optionId+'-'+value
            setDoc(doc(db, 'optionValues', id), {value: value, id, option: optionId}).then((res) => {
            })
        })
    }

    const addOptions= (options: OptionType[], productId: string) => {
        options.forEach((option)=>{
            option.id=productId+'-'+option.name
            setDoc(doc(db, 'options', option.id), {option: option.name, id: option.id, product: productId}).then((res) => {
                option.values && option.id && addOptionValues(option.values, option.id)
            })
        })
    }

    const addNewProduct = async (product: ProductType) => {
        const newProduct={
            name: product.name,
            description: product.description,
            price: product.price,
            business: product.business,
            img: product.img,
            id: product.id,
        }
        const storageRef = ref(storage, `products/${newProduct.id}`);
        uploadString(storageRef, product.img, 'data_url').then((snapshot) => {
            getDownloadURL(storageRef).then((url) => {
                newProduct.img = url;
                setDoc(doc(db, "products", newProduct.id), newProduct)
                .then(res=>{
                    product.extraImages && addExtraImg(product.extraImages.map((img, i) => {
                        return {img: img, id: newProduct.id + '-' + (i+1)}
                    }), newProduct.id)
                    product.options && addOptions(product.options, newProduct.id)
                    router.back()
                })

            });
        });
    }


    const initProducts =  (products: ProductType[]) => {
        setProducts(products);
    }

    return {
        products,
        getExtraImages,
        initProducts,
        addNewProduct
        
    }

}