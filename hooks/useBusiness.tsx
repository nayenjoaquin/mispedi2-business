import { businessContext } from "@/context/businessProvider";
import { use, useContext, useEffect, useState } from "react";
import { app, auth, db, storage } from "@/firebase/config";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { BusinessType, ProductType } from "@/types";
import { useProducts } from "./useProducts";
import { productContext } from "@/context/productsProvider";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { $CLIENT_URL } from "@/consts/urls";
import { useRouter } from "next/navigation";

export const useBusiness = () => {
    const { business, setBusiness } = useContext(businessContext);
    const { initProducts } = useProducts();
    const router = useRouter()

    const getBusinessProducts = async (businessId: string) => {
      const q = query(collection(db,"products"), where("business", "==", businessId));
        const querySnapshot = await getDocs(q);
        let products: ProductType[] = [];
        querySnapshot.forEach((doc) => {
            products.push(doc.data() as ProductType)
        })
        return products;
  }


    const selectBusiness = async (business: BusinessType) => {
        getBusinessProducts(business.id).then((products) => {
            initProducts(products);
            setBusiness(business);
        })
    }

    const createBusiness = async (business: BusinessType) => {
        console.log(business)
        const storageRef = ref(storage, `logos/${business.id}`)
        const snapshot = await uploadString(storageRef, business.logo, 'data_url')
        const logoUrl = await getDownloadURL(snapshot.ref)
        const newBusiness = {
            ...business,
            logo: logoUrl,
            url: $CLIENT_URL+'store/'+business.id
        }
        console.log(newBusiness)
        await setDoc(doc(db, "business", newBusiness.id), newBusiness)
        await selectBusiness(newBusiness)

        router.push('/business/new/created')

    }



    return {business,
        selectBusiness,
        getBusinessProducts,
        createBusiness
        }

}