import { UserContext } from "@/context/userProvider";
import { UserType } from "@/types";
import { useContext } from "react";
import {app, auth, db} from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { log } from "console";
import { useBusiness } from "./useBusiness";
import { useRouter } from "next/navigation";

export const useUser = () => {
    const { user, setUser } = useContext(UserContext);
    const {businesses, getUserBusinesses, resetBusinesses} = useBusiness();
    const router = useRouter();

    const login = (user: UserType) => {
        getUserBusinesses(user.id)

        setUser(user);
        router.push('/dashboard')

    }

    const mapUser = (user: any): UserType => {
        const { displayName, email, photoURL, uid } = user;
        return {
            id: uid,
            name: displayName,
            email: email,
            avatar: photoURL,
        }
    }

    const logout = () => {
        signOut(auth).then(() => {
            setUser(null);
            resetBusinesses();
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
    }
}
