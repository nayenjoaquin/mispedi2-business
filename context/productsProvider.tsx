'use client'

import { ProductContextType, ProductType } from "@/types";
import { createContext, useEffect, useState } from "react";

export const productContext = createContext<ProductContextType >({
    products: null,
    setProducts: () => {},
});

export default function ProductsProvider({children}:{children:React.ReactNode}){
    const [products, setProducts] = useState<ProductType[]|null>(null);

    return(
        <productContext.Provider value={{products, setProducts}}>
            {children}
        </productContext.Provider>
    )
}