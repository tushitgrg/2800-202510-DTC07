import React from 'react'
import { getUser } from '@/lib/auth'
const page =async () => {
    console.log(await getUser())
  return (
    <div>You are logged in ig</div>
  )
}

export default page