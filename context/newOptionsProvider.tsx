'use client'
import { NewOptionContextType, OptionType } from "@/types";
import { createContext, useState } from "react";

export const newOptionContext = createContext<NewOptionContextType>({
    options: [],
    setOptions: () => {},
});

export const NewOptionProvider = (props: any) => {
    const { children } = props;
    const [options, setOptions] = useState<Array<OptionType>>([]);

    return (
        <newOptionContext.Provider value={{ options, setOptions }}>
            {children}
        </newOptionContext.Provider>
    );
}