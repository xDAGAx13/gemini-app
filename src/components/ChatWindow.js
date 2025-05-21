import { supabase } from '@/lib/supabaseClient';
import React from 'react'
import { FaHistory } from "react-icons/fa";

export default function ChatWindow({messages}) {

  

  return (
    <div className='flex flex-row justify-between bg-gray-100 p-4 rounded-lg'>
      
    <div className='flex flex-col'>
      {messages.map((msg,idx)=>(
        <div key={idx} className='mb-4'>
          <p className='text-gray-600'><strong>You: </strong>{msg.q}</p>
          <p className='text-gray-600'><strong>Gemini: </strong>{msg.a}</p>
        </div>
      ))}
      </div>
      <div>
      </div>
    </div>
  )
}
