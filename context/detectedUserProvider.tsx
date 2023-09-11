'use client'

import { DetectedUserType } from "@/hooks/useUser"
import { createContext, useState } from "react"

interface DetectedUserContextType {
    detectedUser: DetectedUserType|null,
    setDetectedUser: React.Dispatch<React.SetStateAction<DetectedUserType|null>>
}


export const detectedUserContext = createContext<DetectedUserContextType>({
    detectedUser: null,
    setDetectedUser: () => {}
})

export default function DetectedUserProvider({children}:{children:React.ReactNode}) {
    const [detectedUser, setDetectedUser] = useState<DetectedUserType|null>(null)
    return (
        <detectedUserContext.Provider value={{detectedUser, setDetectedUser}}>
            {children}
        </detectedUserContext.Provider>
    )
}