import MainResources from '@/components/Resources/MainResources'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({params}) => {
 
  try{
    const {id} = await params
    const response = await fetch(`http://localhost:3001/resources/${id}`)
    data = await response.json()
    return  <MainResources resourceData={data}/>
  }catch{
    return redirect('/not-found')
  }
}

export default page