import React from 'react'
import { getUser } from '@/lib/auth'
const page =async () => {
    let user = await getUser()
  return (
    <div><p>
      You are logged in  Mr {user.name} {user.email} 
      </p>
      <img src={user.avatar}></img>
      </div>
  )
}

export default page