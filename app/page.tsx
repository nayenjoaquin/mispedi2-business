import Image from 'next/image'
import landingImg from '@/assets/landing page img mis pedi2.png'
import npMobile from '@/assets/new-product-mobile.png'
import npMobile2 from '@/assets/new-product-mobile-2.png'
import npDesktop from '@/assets/new-product-desktop.png'
import storeDesktop from '@/assets/store-desktop.png'
import Link from 'next/link'


export default function Home() {
  return (
    <main className='min-h-screen pt-nav flex flex-col bg-no-repeat bg-cover'
    style={{ backgroundImage: "url('/landing-background.svg')" }}
    >
      <section className='px-5 flex flex-col gap-5  items-center justify-center min-h-screen py-nav '>
          <h1 className='text-5xl font-semibold text-center text-white '>Recibe pedidos y administra tu negocio</h1>
          <Image src={landingImg} alt='Landing page image'  height={900} />
          <p className='text-3xl text-white max-w-3xl text-center'>
            Mis pedi2 es una plataforma que te permite recibir pedidos de tus clientes y administrar tu negocio de manera fácil y rápida desde cualquier dispositivo.
          </p>
          <Link href={'/register'}><button className='bg-white text-black rounded-3xl p-2.5 px-5'>Comienza ahora</button></Link>
      </section>
      <section className='bg-white px-5 flex flex-col items-center py-nav gap-20'>
        <div className='flex flex-col md:flex-row gap-10 items-center'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-3xl font-semibold max-w-sm text-start'>Maneja tus productos  y dale opciones a tus clientes</h2>
            <p className='text-xl text-gray-500 max-w-sm text-start'>
              Con la aplicación de Mis pedi2 puedes agregar tus preductos y darle a tus clientes diferentes opciones para que puedan personalizar sus pedidos.
            </p>
          </div>
          <div className='flex gap-2.5'>
            <Image className='w-full rounded-xl shadow-2xl ' src={npMobile} alt='Landing page image' height={100} width={100}/>
            <Image className='w-full rounded-xl shadow-2xl' src={npMobile2} alt='Landing page image'  height={100} width={100}/>
          </div>
        </div>
        <div className='flex flex-col-reverse md:flex-row gap-10 items-center'>
          <Image className='w-full rounded-xl shadow-2xl' src={storeDesktop} alt='Auto generated store image' width={200} height={100} />
          <div className='flex flex-col gap-5'>
            <h2 className='text-3xl font-semibold max-w-sm text-start'>Muestrale tu negocio a todo el mundo</h2>
            <p className='text-xl text-gray-500 max-w-sm text-start'>
              Mis pedi2 App genera un catalogo online de tus productos para que tus clientes puedan verlos y hacer pedidos desde cualquier dispositivo.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
