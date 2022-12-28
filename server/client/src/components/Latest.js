import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Latest = () => {
    const [blog, setBlog] = useState([])
    useEffect(() => {
        getTitle()
    }, [])
    const getTitle = async () => {
        let res = await fetch("http://localhost:5000/recent-post", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            }
        })
        res = await res.json()
        setBlog(res)
        console.log(res)
    }
    return (


        <div> 
                <h3 className='text-center' id='heading-latest'>Latest Post</h3>
                {
                    blog.map((x,i)=>(
                        <>
                        <Link id='link' to={`/all-blogs/${x.slug}`} >
                        <h6 id='title-latest'>{i+1} : {x.title}</h6></Link> 
                       
                        </>
                    ))
                }
        </div>
    )
}

export default Latest