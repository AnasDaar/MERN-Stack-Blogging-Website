import React ,{useState} from 'react'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


const Login = () => {
  const params =useParams()
  const navigate= useNavigate()

  const [email, setemail] = useState('');
  const [password, setpassword] = useState(''); 

  const login = async (event) => {
    event.preventDefault();


    let res = await fetch('http://localhost:5000/login', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/JSON'
        }
    })
    
    // setemail("");
    // setpassword("")

    const data = await res.json()
    
    // console.log(data);
        // console.log(data)
        


        if (  !email ||  !password) {
         
          
          Swal.fire(
              'Oops?',
              'PLease Fill Required Info?',
              'error'
          )
      }else if(res.status === 422){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Credentials!',
          })
    }else if(res.status===201) {
     
      localStorage.setItem("USER_TOKEN",data.result.token);
      localStorage.setItem("UserId",data.result.userLogin._id)
      navigate('/') 
      navigate(0)
      setemail("")
      setpassword("")
      
     
      
       
      
    
        
     
       
   


       

   

  }

  }
   return (
    <div>
      <section className="vh-100" id='signup'>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className=" text-black" >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label"  >Email</label>
                            <input type="email" name='email' value={email} onChange={(event)=>setemail(event.target.value)} id="form3Example3c" className="form-control" />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label"  >Password</label>
                            <input type="password" name='password' value={password} onChange={(event)=>setpassword(event.target.value)} id="form3Example4c" className="form-control" />

                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" onClick={login} className="btn btn-primary btn-lg" id='regbtn'>Login</button>
                        </div>
                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    
  )
}

export default Login