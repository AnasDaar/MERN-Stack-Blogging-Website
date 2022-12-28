import React from 'react'
import { useEffect } from 'react'
import AllBlogs from '../components/AllBlogs'
import {useParams} from 'react-router-dom'

const Homepage = () => {
const user = async()=>{
  
  let token = localStorage.getItem("USER_TOKEN")
  const res = await fetch('http://localhost:5000/user',{
      method:"GET",
      headers:{
          "Content-Type":"application/json",
          "Authorization":token
      },

  })
  const data =await res.json()
  // console.log(data)
}

useEffect(()=>{
      user()
},[])
  return (
    <div>
        <AllBlogs />
    </div>
  )
}

export default Homepage