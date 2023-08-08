import { businessContext } from "@/context/businessProvider";
import { use, useContext, useEffect, useState } from "react";
import { app, auth, db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BusinessType, ProductType } from "@/types";
import { useProducts } from "./useProducts";
import { productContext } from "@/context/productsProvider";

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

    return {business,
        selectBusiness,
        getBusinessProducts,
        }

}