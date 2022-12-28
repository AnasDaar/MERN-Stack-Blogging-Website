import React from 'react'
import { useState,useRef } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
    const Navigate = useNavigate()
    const [title,setTitle]=useState()
    const [description,setDescription]=useState()
    const [slug,setSlug] = useState()
    const [image,setImage]=useState()

    const blogTitle =(e)=>{
        const {value} = e.target
        setTitle(value)
        const createSlug = e.target.value.trim().split(' ').join('-')
        setSlug(createSlug)
    }
    const blogDescription =(e)=>{
        const {value} = e.target
        setDescription(value)
    }
    const slugurl =(e)=>{
        const {value} = e.target
        setSlug(value)
    }
    const blogImg =(e)=>{
        setImage(e.target.files[0])
    }
    const addBlog =async(e)=>{
        e.preventDefault()
        var formData = new FormData()
        formData.append('title',title);
        formData.append('description',description);
        formData.append('slug',slug);
        formData.append('image',image);
        formData.append('user',localStorage.getItem("UserId"));

        const config ={
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const res = await axios.post('http://localhost:5000/addblog',formData,config)
        const data = res.data
        // console.log(data)
        if(!title||!description||!image){
            Swal.fire(
                'Oops?',
                'PLease Fill Required Info?',
                'error'
            )
        }else if(res.data.status===400||  !res.data){
            // console.log("error")


        } else{
            Swal.fire(
                'Good job!',
                'Blog Has Been Added!',
                'success'
              )
              Navigate("/my-blogs")
        }
        
    }
    return (
        <div className='container' id='addblog'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <h1 className='text-center'>Add Your Blog</h1>
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
                        
                        <div><h5>Post URL</h5></div>
                        <div>
                        <input type='text'id='input-blog' name='slug' onChange={slugurl} value={slug} placeholder='Post URL' />
                        </div>
                        <div><h5>Image</h5></div>
                        <div>
                        <input type='File' name='image' onChange={blogImg} id='input-blog'  />
                        </div>
                        <button id='blog-btn' onClick={addBlog}>Add Blog</button>
                        
                        
                    </form>
                    
                </div>
                <div className='col-md-3'></div>
            </div>

        </div>
    )
}

export default AddBlog