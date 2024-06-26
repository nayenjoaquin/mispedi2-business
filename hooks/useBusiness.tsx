import { businessContext } from "@/context/businessProvider";
import { use, useContext, useEffect, useState } from "react";
import { app, auth, db, storage } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { BusinessType, OrderType, ProductType, UserType } from "@/types";
import { useProducts } from "./useProducts";
import { productContext } from "@/context/productsProvider";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { $CLIENT_URL } from "@/consts/urls";
import { useRouter } from "next/navigation";
import { useOrders } from "./useOrders";
import { useUser } from "./useUser";
import { get } from "http";
import { UserContext } from "@/context/userProvider";

export const useBusiness = () => {
    const { business, setBusiness } = useContext(businessContext);
    const { initProducts } = useProducts();
    const {orders, initOrders} = useOrders();
    const {user,setUser} = useContext(UserContext)
    const router = useRouter()

    const getBusinessProducts = async (businessId: string) => {
      const q = query(collection(db,"products"), where("business", "==", businessId));
        const querySnapshot = await getDocs(q);
        let products: ProductType[] = [];
        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            } as ProductType)
        })
        return products;
  }
    const getBusinessOrders = async (businessId: string) => {
        const q = query(collection(db,"orders"), where("business", "==", businessId));
            const querySnapshot = await getDocs(q);
            let orders:OrderType[] = [];
            querySnapshot.forEach((doc) => {
                const {business, address, products, status, total, client, commune, region, email, phone, notes, deliveryDate} = doc.data()
                orders.push({
                    id: doc.id,
                    business,
                    address,
                    products,
                    status,
                    total,
                    client,
                    commune,
                    region,
                    email,
                    phone,
                    notes,
                    deliveryDate
                })
            })
            return orders;
        }




    const selectBusiness = async (business: BusinessType) => {
        getBusinessProducts(business.id).then((products) => {
            initProducts(products);
            setBusiness(business);
        })
        getBusinessOrders(business.id).then((orders) => {
            initOrders(orders);
        })
    }

    const createBusiness = async (business: BusinessType) => {
        const docRef = await addDoc(collection(db, "business"), {
            ...business,
            logo: "",
        });
        const storageRef = ref(storage, `logos/${docRef.id}`);
        await uploadString(storageRef, business.logo, 'data_url')
        const logoUrl = await getDownloadURL(storageRef)
        await setDoc(doc(db, "business", docRef.id), {
            ...business,
            logo: logoUrl,
            id: docRef.id,
            owner: user?.id,
            url: `${$CLIENT_URL}/store/${docRef.id}`
        });
        setUser((prev)=>{
            if(prev){
                return {...prev, businesses: [...prev.businesses, business]}
            }
            else return prev
        })
        if(user){
            business = {
                ...business,
                id: docRef.id,
                logo: logoUrl,
                owner: user.id,
                url: `${$CLIENT_URL}/store/${docRef.id}`
            }
            selectBusiness(business)

            return business
        }
        router.push('/business/new/created')
        

    }

    const deleteBusiness = async (businessId: string) => {

        await deleteDoc(doc(db, "business", businessId))
        const q1 = query(collection(db,"products"), where("business", "==", businessId));
        const querySnapshot = await getDocs(q1);
        querySnapshot.forEach(async (docRef) => {
            await deleteDoc(doc(db, "products", docRef.id))
        })
        const q2 = query(collection(db,"orders"), where("business", "==", businessId));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach(async (docRef) => {
            await deleteDoc(doc(db, "orders", docRef.id))
        })
        setUser((prev)=>{
            if(prev){
                return {...prev, businesses: prev.businesses.filter(b=>b.id!=businessId)}
            }
            else return prev
        })
    }



    return {business,
        selectBusiness,
        getBusinessProducts,
        createBusiness,
        deleteBusiness,
        getBusinessOrders
        }

}