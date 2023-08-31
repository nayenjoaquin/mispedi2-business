import { UserContext } from "@/context/userProvider";
import { BusinessType, UserType } from "@/types";
import { use, useContext, useEffect } from "react";
import {app, auth, db} from "@/firebase/config";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { log } from "console";
import { useBusiness } from "./useBusiness";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useUser = () => {
    const { user, setUser } = useContext(UserContext);
    const {selectBusiness} = useBusiness();
    const router = useRouter();

    const login = (user: any) => {
        getUserBusinesses(user.id).then((businesses) => {
            setUser({...user, businesses})
            if(businesses.length == 0){
                router.push('/no-businesses')
            }else{
                router.push('/home')
            }
        })

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
        const { displayName, email, photoURL, uid } = user;
        return {
            id: uid,
            name: displayName,
            email: email,
            avatar: photoURL,
        }
    }

    const detectUser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const currentUser = mapUser(user);
                login(currentUser);
            } else {
                setUser(null);
                router.push('/login')
            }
        })
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
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = mapUser(result.user);
                login(user);
            }).catch((error) => {
                console.log(error)
            });

    }


    return {
        user,
        loginWithGoogle,
        logout,
        getUserBusinesses,
        detectUser
    }
}
