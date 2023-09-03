'use client'
import FormGroup from "@/components/formGroup";
import { useUser } from "@/hooks/useUser";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {

    const {user, loginWithGoogle, loginWithEmail} = useUser();
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginWithEmail(data)
    }

    return (
        <main className="h-screen flex flex-col items-center justify-center gap-7 pt-nav">
            <ToastContainer />
            <h1 className="text-2xl font-bold">Ingresa a tu cuenta</h1>
            <form className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg px-6 py-12 w-full max-w-md gap-5 " onSubmit={handleSubmit}>
                <FormGroup label="Correo electrónico" name="email" inputType="email" handleChange={handleChange} errors={{}}/>
                <FormGroup label="Contraseña" name="password" inputType="password" handleChange={handleChange} errors={{}} />
                <div className="flex justify-between w-full">
                    <div className="flex gap-2.5"><input className="w-4 h-4 checked:accent-main-500 peer" type="checkbox"/>
                    <label className="text-sm peer-checked:text-main-500">Recuérdame</label></div>
                    <Link href='/' className="text-sm text-main-500 font-bold hover:text-main-400">¿Olvidaste tu contraseña?</Link>
                </div>
                <button className="bg-main-500 w-full text-white rounded-md py-2.5 text-sm font-semibold hover:bg-main-400 transition-all">Ingresar</button>
                <div className=" flex items-center w-full before:w-full before:flex-1 before:border-neutral-300 before:border-t after:flex-1 after:border-neutral-300 after:border-t">
                    <p className="mx-4 mb-0 text-center font-semibold ">o</p>
                </div>
                <div className="flex gap-2.5 w-full">
                    <button onClick={loginWithGoogle} className="bg-neutral-100 w-full text-neutral-700 rounded-md py-2.5 text-sm font-semibold hover:bg-neutral-200 flex items-center justify-center gap-2.5 transition-all"><Image src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0" alt="google logo" height={20} width={20}/>Ingresar con Google</button>
                    <button className="bg-blue-600 w-full text-white rounded-md py-2.5 text-sm font-semibold flex items-center justify-center gap-2.5 hover:bg-blue-800 transition-all"><FontAwesomeIcon className="text-lg" icon={faFacebookF}/>Ingresar con Facebook</button>
                </div>
            </form>
                <p className="py-5">¿No tienes una cuenta? <Link href="/register" className="text-main-500 font-bold hover:text-main-400">Regístrate</Link></p>
        </main>
    )
}