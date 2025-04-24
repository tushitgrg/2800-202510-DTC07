import React from 'react'
import { getUser } from '@/lib/auth'
const page =async () => {
    let userid = await getUser()
  return (
    <div>You are logged in ig {userid}</div>
  )
}

export default page