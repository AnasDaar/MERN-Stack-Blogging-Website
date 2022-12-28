import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { BsThreeDotsVertical } from 'react-icons/bs';
import ScaleLoader from "react-spinners/ScaleLoader";
import Latest from './Latest'; 




const AllBlogs = () => {
    
    const [blog, setBlog] = useState([]); 
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true)
        getBlog();
        setTimeout(()=>{
            setLoading(false)
        },2000)
    }, []);

   
    const getBlog = async () => {
        let result = await fetch('http://localhost:5000/all-blogs', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        setBlog(result)
        // console.log(result)
    }
   
    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setBlog(result)
            }
        }else{
            getBlog();
        }
        
    }

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
           alert("Blog Deleted Succesfully")
            getBlog();
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
                <div className='container'>
                <div className='row'>
                    <div className='col-md-8 .col-lg-8'>
                    {blog.length>0?blog &&
                        blog.map((x, i) => (
                            <div>
                            {x.user._id===localStorage.getItem("UserId")?
                            <div className='row' id='blogcomp'>
                                  <div id='dropdown-main'>
                    <BsThreeDotsVertical />
                    <div id='dropdown-content-mainpage'>
                      <Link to={'/updateblog/' + x._id} id='link'> <p>Edit</p></Link>
                      <Link  id='link' onClick={()=>deleteBlog(x._id)}>Delete</Link>
                    </div>
                  </div>
                            <div className='col-8'> 
                                                <br/>
                             <Link to={`/all-blogs/${x.slug}`} id='link'><h3>{x.title}</h3></Link>
                            <p id='para'>{x.description}</p>
                                                <br />
                            <div id='avatar-main' >
                                <div id='avatar'>{x.user.username.charAt(0)}</div>
                                    <div id='username'>{x.user.username}</div>
                            </div> 
                                                <br/>
                            <div><p id='time'>Published {moment(x.createdAt).fromNow()}</p></div>
                                     
                            </div>
                            <div className='col-4 '> <img  src={`./uploads/${x.image}`} id='blogimg' /></div>
                            </div>
                            :
                            <div className='row' id='blogcomp'>
                        <div className='col-8'> 
                                            <br/>
                         <Link to={`/all-blogs/${x.slug}`} id='link'><h3>{x.title}</h3></Link>
                        <p id='para'>{x.description}</p>
                                            <br />
                        <div id='avatar-main' >
                            <div id='avatar'>{x.user.username.charAt(0)}</div>
                                <div id='username'>{x.user.username}</div>
                        </div> 
                                            <br/>
                        <div><p id='time'>Published {moment(x.createdAt).fromNow()}</p></div>
                                 
                        </div>
                        <div className='col-4 '> <img  src={`./uploads/${x.image}`} id='blogimg' /></div>
                        </div>}
                            </div>
                            ))
                             :
                             <center><img src='no-times.png' id='no-found-img' />
                             <br/>
                             <h1 id='nothing-found-ops'>OOPS ❓</h1>
                             <h1 id='nothing-found'>Nothing Found ❌</h1>
                             </center>
                        }<br/>
                        </div>
                             
                    <div className='col-md-4 .col-lg-4' id='popular-blog'>
                    <div id='search-div'>
                            <center>
                                <input type='text'   id='search-input' placeholder='  Search Anything  🔎 '
                                onChange={searchHandle}
                                />
                                {/* <button id='search-btn' >SEARCH</button> */}
                            </center>
                        </div>
                        <br/>
                        <div id='latest'>
                
                         <Latest/>
                        </div>
                        
                    </div>




                </div>
            </div>
            }

            
        </>


    )
}


export default AllBlogs
// {/* <div>
//             <div >
//                 <h3>Title of BLog</h3>
//             </div>
//             <div>
//                 <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar eros eu enim pellentesque, sit amet laoreet eros gravida. Suspendisse laoreet leo ac risus pretium finibus. Nullam mattis orci nec hendrerit scelerisque. Etiam convallis diam ante, sit amet dignissim tellus fringilla convallis. Duis et nisi eget est consectetur scelerisque vitae vitae mi. Quisque congue lorem libero, eu egestas elit suscipit vitae. Nulla quis mi id nunc maximus consequat. Nunc nec elementum mi
//                 </p>
//             </div>
//             <div>
//                Author Name
              
//             </div>
//             </div>
//             <div>
//                 <img src='./logo512.png' id='blogimg'/>
//             </div> */}









// import React from 'react'

// const AllBlogs = () => {
//   return (
//     <div>
//         <div className='container'>
//             <div className='row'>
//                 <div className='col-md-6 lg-8' style={{backgroundColor:'black',height:'100px'}}>
//                     <div className='row'>
//                         <div className='col-8' style={{backgroundColor:'blue',height:'50px'}}></div>
//                         <div className='col-4'  style={{backgroundColor:'orange',height:'50px'}}></div>

//                     </div>
//                 </div>
//                 <div className='col-md-6 lg-4' style={{backgroundColor:'grey',height:'100px'}}></div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AllBlogs