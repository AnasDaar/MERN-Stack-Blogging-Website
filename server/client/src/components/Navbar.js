import React, { useEffect, useState} from 'react'
import { Link,  useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [use,setUse] =useState()
    const Navigate = useNavigate
    const Logout =()=>{

        localStorage.clear()
        Navigate('/')
    }
















    return (
      <div>
        
        {
            localStorage.getItem("USER_TOKEN") ?
            
            <div id='navbar'>
            <nav className="navbar navbar-expand-lg ">
                <a className="navbar-brand"  >
                    <img src='./logo.png' id='logo'/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2">
                    <li className="nav-item active">
                            <Link to='/' className="nav-link" >Home</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/all-blogs' className="nav-link" >AllBlogs</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/my-blogs' className="nav-link" >My BLogs</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/add-blog' className="nav-link" >Add Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/' onClick={Logout} className="nav-link" >Logout</Link>
                        </li>
                        
                        
                    </ul>
                </div>
            </nav>
        </div>
           
            :
            
            <div id='navbar'>
            <nav className="navbar navbar-expand-lg ">
                <a className="navbar-brand"  >
                    <img src='./logo.png' id='logo'/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2">
                    <li className="nav-item active">
                            <Link to='/' className="nav-link" >Home</Link>
                        </li> 
                        <li className="nav-item active">
                            <Link to='/login' className="nav-link" >Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/signup' className="nav-link" >Register</Link>
                        </li>
                        
                        
                    </ul>
                </div>
            </nav>
        </div>
        }
      </div>
        
    )
}

export default Navbar

// <li className="nav-item active">
//                             <a className="nav-link" >Homje</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" >All Blogs</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" >Add Blog</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" >Name</a>
//                         </li>