export type FormGroupPropsType = {
    label: string;
    inputType: string;
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
type NavType= {
    name: string;
    ref: string;
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
}
export type BusinessContextType = {
    business: BusinessType | null;
    setBusiness: React.Dispatch<React.SetStateAction<BusinessType | null>>;
}
type Option = {
    option: string;
    values: string[];
}

export type ProductType = {
    business: string;
    name: string;
    price: number;
    id: string;
    description: string;
    img: string;
    extraImages?: string[];
    options?: Option[];
}
export type ProductContextType = {
    products: ProductType[] | null;
    setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
}