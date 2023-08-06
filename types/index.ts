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
}
export type UserContextType = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}
export type BusinessType = {
    name: string;
    logo: string;
    id: string;
    owner: string;
    description: string;
}
export type BusinessContextType = {
    businesses: BusinessType[] | null;
    setBusinesses: React.Dispatch<React.SetStateAction<BusinessType[] | null>>;
}