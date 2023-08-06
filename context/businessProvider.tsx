'use client'
import { BusinessContextType, BusinessType } from "@/types";
import { createContext, useState } from "react";


export const businessContext = createContext<BusinessContextType>({
    businesses: null,
    setBusinesses: () => {}
});

export default function BusinessProvider({children}: {children: React.ReactNode}){
    const [businesses, setBusinesses] = useState<BusinessType[]>([]);

    return(
    <businessContext.Provider value={{ businesses, setBusinesses}}>
        {children}
    </businessContext.Provider>
    )
}