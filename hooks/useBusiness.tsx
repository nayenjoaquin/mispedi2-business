import { businessContext } from "@/context/businessProvider";
import { use, useContext, useEffect, useState } from "react";
import { app, auth, db, storage } from "@/firebase/config";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { BusinessType, ProductType } from "@/types";
import { useProducts } from "./useProducts";
import { productContext } from "@/context/productsProvider";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export const useBusiness = () => {
    const { business, setBusiness } = useContext(businessContext);
    const { getExtraImages, initProducts } = useProducts();

    const getBusinessProducts = async (businessId: string) => {
      const q = query(collection(db,"products"), where("business", "==", businessId));

      return getDocs(q).then((querySnapshot) => {
          const newProducts: ProductType[] = [];
          querySnapshot.forEach((doc) => {
              const {id, name, description, price, business, img} = doc.data()
              let product: ProductType = {
                  id,
                  name,
                  description,
                  price,
                  business,
                  img,
              };
              getExtraImages(id).then((extraImages) => {
                  product.extraImages = extraImages;
              });
              newProducts.push(product);
          });
          return newProducts;
      })
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
        uploadString(storageRef, business.logo, 'data_url').then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setDoc(doc(db, 'business', business.id), {...business, logo: url}).then((res) => {
                    selectBusiness(business)
                })
            })
        })
    }



    return {business,
        selectBusiness,
        getBusinessProducts,
        createBusiness
        }

}