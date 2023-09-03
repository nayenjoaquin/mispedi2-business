import { RegisterErrorsState } from "@/app/register/page";

export type FormGroupPropsType = {
    errors: {
        [key: string]: string;
    }
    label: string;
    inputType: string;
    name: string;
    required?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
type NavType= {
    name: string;
    ref: string;
}
export type SelectedOptions = {
    [key: string]: OptionValueType;
}
export type CartItem={
    product: ProductType;
    selectedOptions: SelectedOptions;
    quantity: number;
}

export type OrderType = {
    business: string;
    products: CartItem[];
    status: string;
    total: number;
    client: string;
    address: string;
    phone: number;
    email: string;
    notes: string;
    region: string;
    commune: string;
    id: string;
    deliveryDate?: string;
}

export type NavbarPropsType = {
    navigation: Array<NavType>;
}
export type UserProviderPropsType = {
    children: React.ReactNode;
}
export type UserType={
    name: string;
    email: string;
    avatar: string;
    id: string;
    businesses: BusinessType[];
}
export type UserContextType = {
    user: UserType | null| undefined;
    setUser: React.Dispatch<React.SetStateAction<UserType | null |undefined>>;
}
export type BusinessType = {
    name: string;
    logo: string;
    id: string;
    owner: string;
    description: string;
    url: string;
}
export type BusinessContextType = {
    business: BusinessType | null;
    setBusiness: React.Dispatch<React.SetStateAction<BusinessType | null>>;
}

export type ProductType = {
    business: string;
    name: string;
    price: number;
    id: string;
    description: string;
    img: string;
    extraImages?: string[];
    options?: OptionType[];
}
export type ProductContextType = {
    products: ProductType[] | null;
    setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
}
export type OptionType={
    name: string;
    values: OptionValueType[];
    id: string;
}
export type OptionValueType = {
    name: string;
    id: string;
    option: string;
}

export type NewOptionContextType = {
    options: OptionType[];
    setOptions: React.Dispatch<React.SetStateAction<OptionType[]>>;
}