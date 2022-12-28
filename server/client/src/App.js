import React from 'react'
import AllBlogs from './components/AllBlogs'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Signup from './components/Signup'
import Login from './components/Login'
import MyBlog from './Pages/MyBlog'
import AddBlog from './Pages/AddBlog'
import SingleBlog from './Pages/SingleBlog'
import Update from './Pages/Update'
import Com from './Pages/Com'
import PrivateComponent from './components/PrivateComponent'
const App = () => {
  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/my-blogs' element={<MyBlog />} />
            <Route path='/my-blogs/:slug' element={<SingleBlog />} />
            <Route path='/add-blog' element={<AddBlog />} />
            <Route path='/updateblog/:id' element={<Update />} />
          </Route>
          <Route path='/' element={<Homepage />} />
          <Route path='/all-blogs' element={<AllBlogs />} />
          <Route path='/all-blogs/:id' element={<SingleBlog />} />
          <Route path='/com' element={<Com />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

        </Routes> 
      </BrowserRouter>
    </>
    // <div>
    // <Navbar/>
    // <br/>
    // <AllBlogs/>
    // </div>
  )
}

export default App