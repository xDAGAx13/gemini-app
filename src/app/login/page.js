"use client"
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function signUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e)=>{
    setLoading(true);
    e.preventDefault();
    const {error} = await supabase.auth.signInWithPassword({email,password});
    if(error)alert(error.message);
    router.push('/chat')
    setLoading(false);
  }
  return (
    <div className='bg-white'>
      <nav className='items-center bg-gray-300 shadow-lg p-2'>
        <h1 className='text-xl text-gray-700 font-bold mb-4 text-center '>Login Page</h1>
      </nav>
      <div className='min-h-screen mx-auto max-w-md p-6'>
        <h1 className='text-3xl font-semibold text-gray-600 text-center pb-5'>Gemini-Chatbot</h1>
        <form onSubmit={handleLogin} className='flex flex-col space-y-4 items-center border-3 border-gray-500 px-4 py-7 rounded-2xl'>
          <input
          className='w-full p-2 border rounded border-black text-gray-600'
          type='email'
          placeholder='Email'
          value = {email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          />

          <input
          className='w-full p-2 border rounded border-black text-gray-600'
          type='password'
          placeholder='Password'
          value = {password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          />

          <button className='font-bold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer' type='submit'>
            {loading?(
            <div className="flex justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ):(<span>Log-In</span>)}
          </button>
        </form>
        <p className='text-gray-700 font-semibold text-center pt-5'>Click <button className='underline cursor-pointer hover:text-gray-500' onClick={()=>router.push('/register')}>here</button> to go to the Sign-Up page</p>

      </div>
    </div>
  )
}
