'use client'
import { Button } from '@headlessui/react'
import { useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import Modal from '../Modal/Modal'
import { signIn } from 'next-auth/react'

export default function Login({buttonStyle, onClick}:{buttonStyle:string, onClick:()=>void}) {
  
  const [user, setUser] = useState<{email: string, password: string}>({email:'', password:''})
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string>("")

  const clearError = () => {
    setError("")
  }


const login = async () => {
    setLoading(true);
  
    try {
      // Validate user input (optional but recommended)
      if (!user.email || !user.password) {
        setError("Please fill all fields");
        setLoading(false);
        return;
      }
  
      // Perform sign-in using NextAuth
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });
      
      // Handle errors from NextAuth
      if (res?.error) {
        setError(res?.error === "CredentialsSignin"?"Invalid credentials":res?.error);
        setLoading(false);
        return
      }
      // console.log(res)
    setOpen(false); // Close login modal (if applicable)
    setUser({ email: '', password: '' }); // Clear user input
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError("An unexpected error occurred. Please try again."); // User-friendly error message
    } finally {
      setLoading(false); // Always set loading to false even on errors
    }
  };

  
  return (
    <Modal content="Log in" buttonStyle={buttonStyle} onClick={onClick} isOpen={open} setIsOpen={setOpen}>
        <h1 className='text-2xl md:text-[#FB6D48] text-white font-bold'>Log in</h1>
        <form onSubmit={(e)=>{

          e.preventDefault()
          login()
        //   createUser()
        }} className='flex flex-col gap-4 w-full'>
            <input value={user.email} onChange={(e)=>{
                clearError()
              setUser({...user, email: e.target.value})
            }} type="email" placeholder='Email' className='px-4 py-2 bg-white/10 rounded-lg focus:outline-none'/>
            <input value={user.password} onChange={(e)=>{
                clearError()
              setUser({...user, password: e.target.value})
            }} type="password" placeholder='Password' className='px-4 py-2 bg-white/10 rounded-lg focus:outline-none'/>
            <Button type='submit' className='bg-[#FB6D48] text-white rounded-lg py-2'>{loading?<span className="loading loading-spinner loading-xs"></span>:"Log in"}</Button>
            {error && <div className='bg-red-500 text-white rounded-lg py-2 flex items-center justify-center'>{error}</div>}
            <p className='text-center text-lg'>or</p>
            <Button onClick={async ()=>{
                await signIn("facebook", { callbackUrl: process.env.NEXTAUTH_URL! })
            }} className='bg-[#1877F2] text-white rounded-lg py-2 flex items-center gap-2 justify-center'>Log in with Facebook <FaFacebook /></Button>
        </form>
    </Modal>
  )
}
