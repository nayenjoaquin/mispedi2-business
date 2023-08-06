import { businessContext } from "@/context/businessProvider";
import { use, useContext, useEffect, useState } from "react";
import { app, auth, db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BusinessType } from "@/types";

export const useBusiness = () => {
    const { businesses, setBusinesses } = useContext(businessContext);
    const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null);

    useEffect(() => {
        businesses && setSelectedBusiness(businesses[0])
    }, [businesses])

    const getUserBusinesses= (uid: string) => {
        const q = query(collection(db, 'business'), where('owner', '==', uid))
        getDocs(q).then((querySnapshot) => {
          const businesses:BusinessType[] = []
          querySnapshot.forEach((doc) => {
            businesses.push(doc.data() as BusinessType)
          })
          setBusinesses(businesses)
        })


    }
    const resetBusinesses = () => {
        setBusinesses(null)
    }

    const selectBusiness = (business: BusinessType) => {
        setSelectedBusiness(business)
    }

    return {businesses,
        getUserBusinesses,
        selectedBusiness,
        selectBusiness,
        resetBusinesses}

}