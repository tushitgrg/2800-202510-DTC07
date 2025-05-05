import MainResources from '@/components/Resources/MainResources'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({params}) => {
  const {id} = await params
  if(!id){
    return redirect('/not-found')
  }
  let data = {}
  try{
    const response = await fetch(`http://localhost:3001/resources/${id}`)
    data = await response.json()
  }catch{
    return redirect('/not-found')
  }

console.log(data)

  return (

   <MainResources resourceData={data}/>
  )
}

export default page