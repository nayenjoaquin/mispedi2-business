import { UserContext } from "@/context/userProvider";
import { BusinessType, UserType } from "@/types";
import { use, useContext, useEffect, useState } from "react";
import {app, auth, db} from "@/firebase/config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from "firebase/auth";
import { log } from "console";
import { useBusiness } from "./useBusiness";
import { usePathname, useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { detectedUserContext } from "@/context/detectedUserProvider";


export interface DetectedUserType {
    id: string,
    name: string,
    email: string,
    avatar: string,
}
export const useUser = () => {
    const { user, setUser } = useContext(UserContext);
    const {detectedUser, setDetectedUser} = useContext(detectedUserContext);
    const {selectBusiness} = useBusiness();
    const router = useRouter();
    const pathname = usePathname()

    const login = (user: any) => {
        setDetectedUser(null)
        getUserBusinesses(user.id).then((businesses) => {
            setUser({...user, businesses})
            if(businesses.length == 0){
                router.push('/no-businesses')
            }else{
                router.push('/home')
            }
        })

    }

    const register = async ({email,password,username}:{email:string, password:string, username:string}) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName: username });

            const currentUser = mapUser(user);
            toast.success('Usuario creado correctamente',{
                position: 'top-center'
            })

            login(currentUser);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                toast.error('El correo electrónico ya está en uso',{
                    position: 'top-center'
                })
            } else {
                toast.error(errorMessage,{
                    position: 'top-center'
                })
            }
        }
    }

    const loginWithEmail = async ({email,password}:{email:string, password:string}) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            const currentUser = mapUser(user);
            login(currentUser);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                toast.error('Contraseña incorrecta',{
                    position: 'top-center'
                })
            } else {
                toast.error(errorMessage,{
                    position: 'top-center'
                })
            }
        }
    }


            


    const getUserBusinesses= (uid: string) => {
        const q = query(collection(db, 'business'), where('owner', '==', uid))
        return getDocs(q).then((querySnapshot) => {
          const businesses:BusinessType[] = []
          querySnapshot.forEach((doc) => {
            businesses.push(doc.data() as BusinessType)
          })
            businesses.length >0 && selectBusiness(businesses[0])
            return businesses
        })


    }

    const mapUser = (user: any) => {
        const { displayName, email, photoURL, uid, providerData } = user;
        const { providerId } = providerData[0];

        return {
            id: uid,
            name: displayName,
            email: email,
            avatar: photoURL,
            provider: providerId,
        }
    }

    const detectUser = async () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const currentUser = mapUser(user);
                if(pathname == '/'){
                    setDetectedUser({
                        ...currentUser,
                    })
                }else{
                    login(currentUser);
                }
            } else{
                setUser(null)
            }
        }
        );

    }

    const logout = () => {
        signOut(auth).then(() => {
            setUser(null);
            router.push('/login')
        }).catch((error) => {
            console.log(error);
        });
    }

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then((result) => {
            const user = mapUser(result.user);
            login(user);
        }).catch((error) => {
            console.log(error);
        });

    }


    return {
        user,
        loginWithGoogle,
        logout,
        getUserBusinesses,
        detectUser,
        register,
        loginWithEmail,
        detectedUser,
        login
    }
}
