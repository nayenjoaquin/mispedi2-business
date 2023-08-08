'use client'
import { BusinessContextType, BusinessType } from "@/types";
import { createContext, useState } from "react";


export const businessContext = createContext<BusinessContextType>({
    business: null,
    setBusiness: () => {}
});

export default function BusinessProvider({children}: {children: React.ReactNode}){
    const [business, setBusiness] = useState<BusinessType|null>(null);

    return(
    <businessContext.Provider value={{ business, setBusiness}}>
        {children}
    </businessContext.Provider>
    )
}