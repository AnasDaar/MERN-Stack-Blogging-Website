import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import ScaleLoader from "react-spinners/ScaleLoader";

import { BsThreeDotsVertical } from 'react-icons/bs'

const MyBlog = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams()
  const id = localStorage.getItem("UserId")
  const getBlog = async () => {
    let res = await fetch(`http://localhost:5000/blog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    res = await res.json()
    setUser(res.user)
    // console.log(res)
  }

  useEffect(() => {
    setLoading(true)
    getBlog()
    setTimeout(()=>{
      setLoading(false)
  },2000)
  }, [])
  //  console.log(blog)

  
  const deleteBlog = async (id) => {
    const res2 = await fetch(`http://localhost:5000/deleteblog/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const deletedata = await res2.json();
    // console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
        // console.log("error");
       
    } else {
      alert("Blog Deleted Successfully")
        getBlog();
    }

}


  return (
    <div>
      {
        
        loading ?
      <ScaleLoader id='App'
color={'#9C9E9C'}
loading={loading} 
size={30} 
/>

        :
        <div className='container'>

        <div className='row'>

          {user && user.blogs &&
            user.blogs.map((x) => (
              <>
                <div className='col-md-4' id='blogcomp-my'>
                 
                  <div id='dropdown'>
                    <BsThreeDotsVertical />
                    <div id='dropdown-content'>
                      <Link to={'/updateblog/' + x._id} id='link'> <p>Edit</p></Link>
                      <Link  id='link' onClick={()=>deleteBlog(x._id)}>Delete</Link>
                    </div>
                  </div>
                  <center>

                    <img src={`./uploads/${x.image}`} id='blogimg' />
                  </center>
                  <div>
                    <div >
                      <br />
                      <Link to={`/all-blogs/${x._id}`} id='link'><h3>{x.title}</h3></Link>
                      <br />
                      <div id='avatar-main' >
                        <div id='avatar'>{user.username.charAt(0)}</div>
                        <div id='username'>{user.username}</div>
                      </div>
                      <br />

                    </div>
                  </div>
                </div>
              </>
            ))

          }
        </div>
      </div>
      }

   

      <br></br>

    </div>
  )
}

export default MyBlog