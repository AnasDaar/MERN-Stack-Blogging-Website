import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios'
import Swal from 'sweetalert2';
import { FaPaperPlane } from "react-icons/fa";
import ScaleLoader from "react-spinners/ScaleLoader";
import {FacebookShareButton,FacebookIcon,
  TwitterShareButton,TwitterIcon,
  WhatsappShareButton,WhatsappIcon

} from "react-share"


import Com from './Com';
const SingleBlog = () => {
  const shareurl = window.location.href
  console.log(shareurl)
  const params = useParams();
  const Navigate = useNavigate()
  const [ comment , setComment] = useState('')
  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState([])
  useEffect(() => {
    setLoading(true)

    getBlog()
    setTimeout(()=>{
      setLoading(false)
  },1000)

  }, [])
  const getBlog = async () => {
    let result = await fetch(`http://localhost:5000/all-blogs/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    result = await result.json()
    setBlog(result.post)
    localStorage.setItem("BlogId",result.post._id)
    // console.log(result)
  }






  const postComment = async(e)=>{
    e.preventDefault();
    
    let res  =  await fetch("http://localhost:5000/comment",{
      method:'post',
      body:JSON.stringify({comment,blogId:localStorage.getItem("BlogId"),userId:localStorage.getItem("UserId")}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await res.json()
    // console.log(data)
    if(!comment){
       Swal.fire(
      'Oops?',
      'PLease Write Something?',
      'error'
  )
    }else if(localStorage.getItem("USER_TOKEN")==null){
      Swal.fire(
        'Oops?',
        'Please Login First To Comment?',
        'error'
    )
    }
    else{
     setComment("")
    }
   
    
     
    
  }



  
 

  return (
    <>
    { 
      loading ?
      <ScaleLoader id='App'
color={'#9C9E9C'}
loading={loading} 
size={30} 
/>
      :
      
      <div className='container' id='single-container'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8'>
            <center><img src={`../uploads/${blog.image}`} style={{ width: "300px", height: "auto" }} /></center>
            <br/>
            <br/>
            <div>

              <h2 className='text-center'>{blog.title}</h2>
            </div>
            <div>
              <p>{blog.description}</p>
              

            </div>


            {/* <p>{blog.user ? blog.user.username.charAt(0) : ''}</p> */}

            <div id='avatar-main' >
              <div id='avatar'>{blog.user ? blog.user.username.charAt(0) : ''}</div>
              <div id='username'>{blog.user ? blog.user.username : ''}</div>
            </div>
            <br />
            <div><p id='time'>Published {moment(blog.createdAt).fromNow()}</p></div>

           
            <br />

            <div className='share-btn-container'>
              
              <FacebookShareButton url={shareurl}  >
                <FacebookIcon size={40} round={true} style={{margin:"7px"}}/>
              </FacebookShareButton >
              <TwitterShareButton url={shareurl}>
                <TwitterIcon size={40} round={true}style={{margin:"7px"}}/>
              </TwitterShareButton >
              <WhatsappShareButton url={shareurl}>
                <WhatsappIcon size={40} round={true}style={{margin:"7px"}}/>
              </WhatsappShareButton>
            </div>
            <br/>

              <div>
                <input type='text' name='comment' value={comment} onChange={(e)=>setComment(e.target.value)} id='comment-input' placeholder='  Leave A Comment 😃' />
               <FaPaperPlane id='icon-plane' onClick={postComment}/>
              </div>
            <br />
            <Com />
          </div>
          <div className='col-2'></div>
        </div>
      </div>
    }
  
   



    </>
  )
}

export default SingleBlog