import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const Signup = () => {
    const [username, setUserName] = useState('')
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [phone, setphone] = useState('');
    const navigate = useNavigate()


    const submitData = async (event) => {
        event.preventDefault();

        let res = await fetch('http://localhost:5000/signup', {
            method: "POST",
            body: JSON.stringify({ username, email, password, phone }),
            headers: {
                'content-type': 'application/JSON'
            }
        })

        const data = await res.json()
        // console.log(data);
        if (!username || !email || !phone || !password) {
            Swal.fire(
                'Oops?',
                'PLease Fill All Input Fields?',
                'error'
            )
        } else if (!email.includes("@")) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter valid Email Adress',
            })
        } else if (res.status === 422) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This Email is Already Registered!',
            })

        } else {

            Swal.fire(
                'Good job!',
                'You Are Succesfully Registered',
                'success'
            )
            navigate('/login')

        }

        // setUserName("");
        // setemail("");
        // setpassword("");
        // setphone("");

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
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" >UserName</label>
                                                        <input type="text" name='username' value={username} onChange={(event) => setUserName(event.target.value)} id="form3Example3c" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" >Your Email</label>
                                                        <input type="email" name='email' value={email} onChange={(event) => setemail(event.target.value)} id="form3Example3c" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label"  >Password</label>
                                                        <input type="password" name='password' value={password} onChange={(event) => setpassword(event.target.value)} id="form3Example4c" className="form-control" />

                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" >Phone</label>
                                                        <input type="number" name='phone' value={phone} onChange={(event) => setphone(event.target.value)} id="form3Example4c" className="form-control" />

                                                    </div>
                                                </div>
                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <p>Already Have An Account <Link to="/login"> Click Here To Login</Link></p>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" onClick={submitData} className="btn btn-primary btn-lg" id='regbtn'>Register</button>
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

export default Signup