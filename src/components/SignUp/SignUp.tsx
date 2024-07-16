import { Button } from '@headlessui/react'
import { useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import Modal from '../Modal/Modal'
import { signIn } from 'next-auth/react'

export default function SignUp({buttonStyle, onClick}:{buttonStyle:string, onClick:()=>void}) {
  const [user, setUser] = useState<{name: string, email: string, password: string}>({name:'', email:'', password:''})
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  const clearError = () => {
    setError("")
  }

  const createUser = async () => {
    setLoading(true)
    try{
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if(res.status === 400){
        setError(await res.text())
      }
      if(res.ok){
        setOpen(false)
        await signIn("credentials", {
          email: user.email,
          password: user.password,
          redirect: false,
        });
        setUser({name:'', email:'', password:''})
        
      }
    }catch(error){
      console.log(error)
    }
    setLoading(false)
  }
  
  return (
    <Modal content="Sign up" buttonStyle={buttonStyle} onClick={onClick} isOpen={open} setIsOpen={setOpen}>
        <h1 className='text-2xl md:text-[#FB6D48] text-white font-bold'>Sign up</h1>
        <form onSubmit={(e)=>{

          e.preventDefault()
          createUser()
        }} className='flex flex-col gap-4 w-full'>
            <input value={user.name} onChange={(e)=>{
              clearError()
              setUser({...user, name: e.target.value})
            }} type="text" placeholder='Name' className='px-4 py-2 bg-white/10 rounded-lg focus:outline-none'/>
            <input value={user.email} onChange={(e)=>{
              clearError()
              setUser({...user, email: e.target.value})
            }} type="email" placeholder='Email' className='px-4 py-2 bg-white/10 rounded-lg focus:outline-none'/>
            <input value={user.password} onChange={(e)=>{
              clearError()
              setUser({...user, password: e.target.value})
            }} type="password" placeholder='Password' className='px-4 py-2 bg-white/10 rounded-lg focus:outline-none'/>
            <Button type='submit' className='bg-[#FB6D48] text-white rounded-lg py-2'>{loading?<span className="loading loading-spinner loading-xs"></span>:"Sign up"}</Button>
            {error && <div className='bg-red-500 text-white rounded-lg py-2 flex items-center justify-center'>{error}</div>}
            <p className='text-center text-lg'>or</p>
            <Button onClick={async ()=>{
                await signIn("facebook", { callbackUrl: process.env.NEXTAUTH_URL! })
            }} className='bg-[#1877F2] text-white rounded-lg py-2 flex items-center gap-2 justify-center'>Sign up with Facebook <FaFacebook /></Button>
        </form>
    </Modal>
  )
}
