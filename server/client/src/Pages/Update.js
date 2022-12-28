import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const Update = () => {
    const [title,setTitle]=useState()
    const [description,setDescription]=useState()
    const [image,setImage]=useState()
    const params = useParams()
    const Navigate = useNavigate()

    const blogTitle =(e)=>{
        const {value} = e.target
        setTitle(value)
    }
    const blogDescription =(e)=>{
        const {value} = e.target
        setDescription(value)
    }
    const blogImg =(e)=>{
        setImage(e.target.files[0])
    }
    useEffect(() => {
        getBlogDetail()
    }, [])
    const getBlogDetail = async () =>{
        let result = await fetch(`http://localhost:5000/getblog/${params.id}`)
        result =await result.json()
        // console.log(result)
        setTitle(result.title)
        setDescription(result.description)
        setImage(result.image)

    }



    
const updateBlog = async (e) => {
    e.preventDefault();
    var formData = new FormData()
    formData.append('title',title);
    formData.append('description',description);
    formData.append('image',image);


  
    

    const config ={
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    
    const res = await axios.put(`http://localhost:5000/updateBlog/${params.id}`,formData,config)
        if(!image){
            Swal.fire(
                'Oops?',
                'PLease Select Image ?',
                'error'
            )
        }else{
            Swal.fire(
                'Updated!',
                'Blog Has Been Updated',
                'success'
                
              )  
              Navigate('/my-blogs')
        }
                

        //   console.log(res)

    
       

}










    
  return (
    <div className='container' id='addblog'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <h1 className='text-center'>Update Blog</h1>
                    <br/>
                    <br/>
                    <form>
                        <div><h5>Title</h5></div>
                        <div>
                        <input type='text'value={title} name='title' onChange={blogTitle} id='input-blog' />
                        </div>
                        <div><h5>Description</h5></div>
                        <div>
                        <textarea id='text-area' value={description} onChange={blogDescription} name='description' />
                        </div>
                        <div><h5>Image</h5></div>
                        <div>
                        <input type='File' name='image'  onChange={blogImg} id='input-blog' />
                        </div>
                        <button id='blog-btn' onClick={updateBlog} >Update</button>
                        
                        
                    </form>
                    
                </div>
                <div className='col-md-3'></div>
            </div>

        </div>
  )
}

export default Update