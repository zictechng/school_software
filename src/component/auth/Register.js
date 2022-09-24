import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from "react-toastify";
import axios from "axios";

function Register() {

    document.title = "Register | " + window.companyName; // this will show the page title name
    const history = useHistory();
    const [registerInput, setRegister] = useState({
        // declear all input veriable here 
        fname: '',
        lname: '',
        email: '',
        password: '',
        phone: '',
        error_list: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    // set the input veriable from the handleinput event
    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }
    // get the form submit event here / bind the input data to the veriable names
    const registerUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // declear veriable to hold all input data here
        const data = {
            fname: registerInput.fname,
            lname: registerInput.lname,
            email: registerInput.email,
            phone: registerInput.phone,
            password: registerInput.password,
        }
        // send the request to back with axios
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if (res.data.status === 200) {
                    // localStorage.setItem('auth_token', res.data.token);
                    // localStorage.setItem('auth_name', res.data.username);
                    toast.success(res.data.message);
                    //swal("Success!", res.data.message, "success");
                    /* redirect back home after successful registration */
                    history.push('/login');
                }
                else if (res.status === 401) {
                    toast.error(res.data.message, {
                        theme: "colored"
                    });

                }
                else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                    toast.error("Required fields are missing", {
                        theme: "colored"
                    });
                }
            });
            setIsLoading(false);
        });
    }
    return (
        <>
            <div className="hold-transition register-page">
                <div className="register-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <Link to="#" className="h1"><b>Lift </b>Soft</Link>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Register</p>
                            <form onSubmit={registerUser}>
                                <div className="input-group mb-3">
                                    <input type="text" name="fname" onChange={handleInput} value={registerInput.fname} className="form-control" placeholder="First name" />

                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-user" />
                                        </div>
                                    </div>
                                </div>
                                <span className='text-danger'>{registerInput.error_list.fname}</span>
                                <div className="input-group mb-3">
                                    <input type="text" name="lname" onChange={handleInput} value={registerInput.lname} className="form-control" placeholder="Last name" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-user" />
                                        </div>
                                    </div>
                                </div>
                                <span className='text-danger'>{registerInput.error_list.lname}</span>

                                <div className="input-group mb-3">
                                    <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control" placeholder="Email" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                                <span className='text-danger'>{registerInput.error_list.email}</span>

                                <div className="input-group mb-3">
                                    <input type="text" name="phone" onChange={handleInput} value={registerInput.phone} className="form-control" placeholder="Phone Number (+23480..)" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-phone" />
                                        </div>
                                    </div>
                                </div>
                                <span className='text-danger'>{registerInput.error_list.phone}</span>

                                <div className="input-group mb-3">
                                    <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" placeholder="Password" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>
                                <span className='text-danger'>{registerInput.error_list.password}</span>
                                {/* <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Retype password" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col-7">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
                                            <label htmlFor="agreeTerms">
                                                I agree to the <Link to="#">terms</Link>
                                            </label>
                                        </div>
                                    </div>
                                    {/* /.col */}
                                    <div className="col-5">
                                        <button type="submit" disabled={isLoading} className="btn btn-primary btn-block">
                                            {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Register
                                        </button>
                                    </div>
                                    {/* /.col */}
                                </div>
                            </form>
                            {/* <div className="social-auth-links text-center">
                                <Link to="#" className="btn btn-block btn-primary">
                                    <i className="fab fa-facebook mr-2" />
                                    Sign up using Facebook
                                </Link>
                                <Link to="#" className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2" />
                                    Sign up using Google+
                                </Link>
                            </div> */}
                            <Link to="/login" className="text-center">I already have an account</Link>
                        </div>
                        {/* /.form-box */}
                    </div>{/* /.card */}
                </div>
            </div>

        </>
    )
}

export default Register