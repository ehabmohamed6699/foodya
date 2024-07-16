'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { RiMenu3Fill } from 'react-icons/ri'
import SignUp from '../SignUp/SignUp'
import Login from '../Login/Login'
import { signOut, useSession } from 'next-auth/react'
import User from "@/assets/images/user.svg"
import Image from 'next/image'


const Navbar = () => {
    const {data:session} = useSession()
    // signOut()
    // console.log(session?.user)
    const [open, setOpen] = useState<boolean>(false)
    const paths = [{path:'/', name:"Home"}, {path: '/about', name: 'About'},{path: '/recipes', name: 'Recipes'}]
    const [visible, setVisible] = useState<boolean>(false)
    const pathname = usePathname()
    useEffect(() => {
        if(open){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'unset'
        }
    }, [open])
  return (
    <div className='w-full min-h-16 flex items-center justify-between relative'>
        <Link href={"/"} className='text-transparent bg-clip-text bg-gradient-to-r from-[#FB6D48]  to-[#FFAF45] font-extrabold text-3xl'>Foodya</Link>
        <ul className='md:flex items-center gap-6 hidden'>
            {paths.map((path, index) => <li key={index}><Link href={path.path} className={`${pathname === path.path && "text-[#FB6D48]"} transition-all duration-500`}>{path.name}</Link></li>)}
        </ul>
        {!session?.user && <div className='flex items-center gap-4'>
        <SignUp onClick={()=>{
                    setOpen(false)
                }} buttonStyle={'bg-[#FB6D48] text-white px-4 py-2 rounded-full transition-all duration-500 hidden md:block'}/>
        <Login onClick={()=>{
                    setOpen(false)
                }} buttonStyle={'text-[#FB6D48] px-4 py-2 rounded-full transition-all duration-500 hidden md:block'}/>
        </div>}
        {session?.user && <div onMouseEnter={()=>{
            setVisible(true)
        }} onMouseLeave = {()=>{
            setVisible(false)
        }} className='hidden md:flex items-center gap-2 cursor-pointer relative  px-20'>
            <Image src={session?.user?.image || User} alt="profile" width={36} height={36} className='rounded-full'/>
            <p>{session?.user?.name}</p>
            <div className={`w-64 z-40 h-28 bg-white absolute top-full right-0 hidden ${visible?"md:flex flex-col gap-2":"md:hidden"} items-center justify-center transition-all duration-500`}>
                <Link href="/changeImage" className=' bg-[#FB6D48] text-white px-10 py-2 w-full rounded-full'>Change profile picture</Link>
                <button onClick={()=>{
                    signOut()
                }} className="text-[#FB6D48] px-10 py-2 w-full rounded-full transition-all duration-500 mx-auto">Log out</button>
            </div>    
        </div>}
        <div className='md:hidden'>
            <button onClick={()=>{
                setOpen(true)
            }}>
                <RiMenu3Fill className='text-xl text-gray-900'/>
            </button>
            <div className={`w-full h-screen flex flex-col gap-10 items-center bg-white/5 backdrop-blur-2xl fixed top-0 ${open?"-right-0":"-right-96"} z-20 transition-all duration-300 ease-linear`}>
                <button onClick={()=>{setOpen(false)}} className='absolute top-10 left-10'>
                    <MdOutlineClose className='text-xl text-gray-900'/>
                </button>
                
                <ul className='flex flex-col items-center mt-24 gap-6 text-xl'>
                    {paths.map((path, index) => <li onClick={()=>{setOpen(false)}} key={index}><Link href={path.path} className={`${pathname === path.path && "text-[#FB6D48]"} transition-all duration-500`}>{path.name}</Link></li>)}
                </ul>
                {session?.user && <div className='flex items-center gap-2'>
                    <div>
                        <Image src={session?.user?.image || User} alt="profile" width={36} height={36} className='rounded-full'/>
                    </div>
                    <p>{session?.user?.name}</p>
                </div>}
                {session?.user && <Link onClick={()=>{
                    setOpen(false)
                }} href="/changeImage" className=' bg-[#FB6D48] text-white px-10 py-2 rounded-full'>Change profile picture</Link>
                }
                {session?.user && <button onClick={()=>{
                    setOpen(false)
                    signOut()
                }} className="text-[#FB6D48] px-10 text-xl py-2 rounded-full transition-all duration-500 mx-auto">Log out</button>}
                {!session?.user && <SignUp onClick={()=>{
                    setOpen(false)
                }} buttonStyle={'bg-[#FB6D48] text-white px-10 text-xl py-2 rounded-full transition-all duration-500 mx-auto'}/>}
                {!session?.user && <Login onClick={()=>{
                    setOpen(false)
                }} buttonStyle={'text-[#FB6D48] px-4 py-2 text-xl rounded-full transition-all duration-500'}/>}

            </div>
        </div>
        
    </div>
  )
}

export default Navbar