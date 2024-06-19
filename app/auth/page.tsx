'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

    router.push("/auth/login")
    
  return (
    <div>
      
    </div>
  )
}

export default page
