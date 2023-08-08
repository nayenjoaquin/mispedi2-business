'use client';
import { UserContextType, UserProviderPropsType, UserType } from "@/types";
import { createContext, useState } from "react";

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => null,
});

export default function UserProvider({ children }: UserProviderPropsType) {
    const [user,setUser] = useState<UserType|null|undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}


        