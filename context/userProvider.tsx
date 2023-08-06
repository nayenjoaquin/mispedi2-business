'use client';
import { UserContextType, UserProviderPropsType, UserType } from "@/types";
import { createContext, useState } from "react";

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => null,
});

export default function UserProvider({ children }: UserProviderPropsType) {
    const [user,setUser] = useState<UserType|null>({
        id: "1",
        name: "John Doe",
        email: "johndoe@gmail.com",
        avatar: "https://th.bing.com/th/id/OIP.ysdd9pBlwnNdnxQoC8y4KQHaHa?pid=ImgDet&rs=1",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}


        