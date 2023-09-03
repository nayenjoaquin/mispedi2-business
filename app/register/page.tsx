'use client'
import FormGroup from "@/components/formGroup"
import { useUser } from "@/hooks/useUser"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export interface RegisterErrorsState{
    [key: string]: string
}

export default function RegisterPgae(){
    const {loginWithGoogle, register} = useUser()
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<RegisterErrorsState>({
    })

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const validateInputs=()=>{
        const {username, email, password, confirmPassword} = newUser
        const errors: RegisterErrorsState = {}
        if(!username){
            errors.username = 'Ingresa tu nombre de usuario'
        }else if(username.length < 6){
            errors.username = 'El nombre de usuario debe tener al menos 6 caracteres'
        }else if(username.length > 20){
            errors.username = 'El nombre de usuario debe tener menos de 20 caracteres'
        }else if(!/^[a-zA-Z0-9]+$/.test(username)){
            errors.username = 'El nombre de usuario solo puede contener letras y números'
        }else{
            delete errors.username
        }
        if(!email){
            errors.email = 'Ingresa tu correo electrónico'
        }else if(!/\S+@\S+\.\S+/.test(email)){
            errors.email = 'Ingresa un correo electrónico válido'
        }else{
            delete errors.email
        }
        if(!password){
            errors.password = 'Ingresa tu contraseña'
        }else if(password.length < 6){
            errors.password = 'La contraseña debe tener al menos 6 caracteres'
        }else if(password.length > 20){
            errors.password = 'La contraseña debe tener menos de 20 caracteres'
        }else{
            delete errors.password
        }
        if(!confirmPassword){
            errors.confirmPassword = 'Confirma tu contraseña'
        }else if(confirmPassword !== password){
            errors.confirmPassword = 'Las contraseñas no coinciden'
        }else{
            delete errors.confirmPassword
        }
        setErrors(errors)
        return errors
    }


    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const newErrors = validateInputs()
        if(Object.keys(newErrors).length === 0){
            register(newUser)
        }

    }
    
    return(
        <main className="h-screen flex flex-col items-center justify-center gap-7 pt-nav">
            <ToastContainer/>
            <h1 className="text-2xl font-bold">Crea una cuenta</h1>
            <form className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg px-6 py-12 w-full max-w-lg gap-5 " onSubmit={handleSubmit}>
                <FormGroup label="Nombre de usuario" name="username" inputType="text" handleChange={handleChange} errors={errors}/>
                <FormGroup label="Correo electrónico" name="email" inputType="email" handleChange={handleChange} errors={errors}/>
                <FormGroup label="Contraseña" name="password" inputType="password" handleChange={handleChange} errors={errors}/>
                <FormGroup label="Confirmar contraseña" name="confirmPassword" inputType="password" handleChange={handleChange} errors={errors}/>
                <button className="bg-main-500 w-full text-white rounded-md py-2.5 text-sm font-semibold hover:bg-main-400 transition-all">Registrarse</button>
                <div className=" flex items-center w-full before:w-full before:flex-1 before:border-neutral-300 before:border-t after:flex-1 after:border-neutral-300 after:border-t">
                    <p className="mx-4 mb-0 text-center font-semibold ">o</p>
                </div>
                <div className="flex gap-2.5 w-full">
                    <button onClick={loginWithGoogle} className="bg-neutral-100 w-full text-neutral-700 rounded-md py-2.5 text-sm font-semibold hover:bg-neutral-200 flex items-center justify-center gap-2.5 transition-all"><Image src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0" alt="google logo" height={20} width={20}/>Continuar con Google</button>
                    <button className="bg-blue-600 w-full text-white rounded-md py-2.5 text-sm font-semibold flex items-center justify-center gap-2.5 hover:bg-blue-800 transition-all"><FontAwesomeIcon className="text-lg" icon={faFacebookF}/>Continuar con Facebook</button>
                </div>
            </form>
                <p className="py-5">¿Ya tienes una cuenta? <Link href="/login" className="text-main-500 font-bold hover:text-main-400">Inicia sesión</Link></p>
        </main>
    )
}