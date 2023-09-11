import { RequiredImgType } from "@/types";
import { ReactNode, createContext, useState } from "react";

interface ContextType{
    requiredImgs: RequiredImgType[],
    setRequiredImgs: React.Dispatch<React.SetStateAction<RequiredImgType[]>>
}

export const RequiredImgsContext= createContext<ContextType>({
    requiredImgs: [],
    setRequiredImgs: () => {}
})

export const RequiredImgsProvider = ({children}:{children:ReactNode}) => {
    const [requiredImgs, setRequiredImgs] = useState<RequiredImgType[]>([])

    return(
        <RequiredImgsContext.Provider value={{requiredImgs, setRequiredImgs}}>
            {children}
        </RequiredImgsContext.Provider>
    )
}
