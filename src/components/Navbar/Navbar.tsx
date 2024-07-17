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
import Modal from '../Modal/Modal'
import { UploadButton } from "@/utils/uploadthing";
import { url } from 'inspector'


const Navbar = () => {
    const {data:session, update} = useSession()
    // signOut()
    console.log(session?.user)
    const [open, setOpen] = useState<boolean>(false)
    const [changeProfileOpen, setChangeProfileOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const paths = [{path:'/', name:"Home"}, {path: '/about', name: 'About'},{path: '/recipes', name: 'Recipes'}]
    const [visible, setVisible] = useState<boolean>(false)
    const pathname = usePathname()
    const hide = ()=>{
        setVisible(false)
        setOpen(false)
    } 
    useEffect(() => {
        if(open){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'unset'
        }
    }, [open])
  return (
    <div className='w-full min-h-16 flex items-center justify-between '>
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
            <Image src={session?.user?.image || User} alt="profile" width={36} height={36} className='rounded-full w-[36px] h-[36px]'/>
            <p>{session?.user?.name}</p>
            <div className={`w-64 z-40 h-28 bg-white absolute top-full right-0 hidden ${visible?"md:flex flex-col gap-2":"md:hidden"} items-center justify-center transition-all duration-500`}>
                {/* <Link href="/changeImage" className=' bg-[#FB6D48] text-white px-10 py-2 w-full rounded-full'>Change profile picture</Link> */}
                <Modal content="Change profile picture" buttonStyle="bg-[#FB6D48] text-white px-10 py-2 w-full rounded-full" onClick={hide} isOpen={changeProfileOpen} setIsOpen={setChangeProfileOpen}>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={async (res) => {
                            if(res){
                                // console.log(res)
                                const result = await fetch('/api/users', {
                                    method: 'PATCH',
                                    headers: {
                                    'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({image:res[0]?.url, email:session?.user?.email})
                                })
                                if(result.ok){
                                    try {
                                        setChangeProfileOpen(false)
                                        const imageURL = session?.user?.image
                                        await update({...session, user:{
                                            ...session?.user,
                                            image: res[0]?.url
                                        }})
                                        await fetch('/api/uploadthing', {
                                            method: 'DELETE',
                                            headers: {
                                            'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({url:imageURL})
                                        })
                                    } catch (error) {
                                        setError(error as string)
                                    }
                                }
                            }
                        //   console.log("Files: ", res);
                        //   alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                        // Do something with the error.
                        //   alert(`ERROR! ${error.message}`);
                        }}
                    />
                    {error && <p className='text-red-500 text-xl'>{error}</p>}
                </Modal>
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
                        <Image src={session?.user?.image || User} alt="profile" width={36} height={36} className='rounded-full w-[36px] h-[36px]'/>
                    </div>
                    <p>{session?.user?.name}</p>
                </div>}
                {session?.user && <Modal content="Change profile picture" buttonStyle="bg-[#FB6D48] text-white text-xl px-10 py-2 rounded-full" onClick={hide} isOpen={changeProfileOpen} setIsOpen={setChangeProfileOpen}>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={async (res) => {
                            if(res){
                                // console.log(res)
                                const result = await fetch('/api/users', {
                                    method: 'PATCH',
                                    headers: {
                                    'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({image:res[0]?.url, email:session?.user?.email})
                                })
                                if(result.ok){
                                    try {
                                        setChangeProfileOpen(false)
                                        const imageURL = session?.user?.image
                                        await update({...session, user:{
                                            ...session?.user,
                                            image: res[0]?.url
                                        }})
                                        await fetch('/api/uploadthing', {
                                            method: 'DELETE',
                                            headers: {
                                            'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({url:imageURL})
                                        })
                                    } catch (error) {
                                        setError(error as string)
                                    }
                                }
                            }
                        //   console.log("Files: ", res);
                        //   alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                        // Do something with the error.
                        //   alert(`ERROR! ${error.message}`);
                        }}
                    />
                    {error && <p className='text-red-500 text-xl'>{error}</p>}
                </Modal>
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