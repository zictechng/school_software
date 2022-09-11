import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
function Login() {

    document.title = "Login ";
    const history = useHistory();

    //const [user, setUser] = useState({});
    const { user, loggin_state, checkLoggin, loggin_check } = useContext(UserContext);
    const [user_details, setUserDetails] = user;
    const [user_loggin_state, setUserLogginState] = loggin_state;
    const [logged_check, setLoggedCheck] = checkLoggin;
    const [logged_status, setLoggedStatus] = loggin_check;

    const [loginInput, setLogin] = useState({
        /* declear veriable */
        email: '',
        password: '',
        error_list: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    /* set/get the value from the input flieds */
    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }
    /* create login function to send request to api here */
    const loginSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        /*collect the input data entered by user here*/
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        /* send request to api using axios here*/
        /* this below axios.get is use to generate csrtoken */
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.loginState.token);
                    localStorage.setItem('auth_loggedID', res.data.loginState.logged_id);
                    setUserDetails(res.data.loginState.userDetails);
                    setUserLogginState(res.data.loginState.loggedUID);
                    setLoggedStatus(res.data.loginState.loggedUID);

                    toast.success(res.data.loginState.message, { theme: 'colored' });

                    //swal("Success!", res.data.message, "success");
                    if (res.data.loginState.role === 'Admin') {
                        history.push('/admin/index');
                    }
                    else if (res.data.loginState.role === 'Teacher') {
                        history.push('/staff/index');
                    }
                    else {
                        toast.warning("Sorry! Permission not found");
                    }
                    //setLoggedStatus(res.data.logged_id);
                }
                else if (res.data.status === 401) {
                    toast.warning("Sorry! " + res.data.loginState.message);
                    //swal("Warning!", res.data.message, "warning");
                    setIsLoading(false);
                }
                else {
                    /* show/get errors message if user didn't fill the fields here */
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                    toast.error("Required fields are missing", {
                        theme: "colored"
                    });
                    setIsLoading(false);
                }
            }).catch(error => {
                console.log("Server Issues", error);
            });;
        });

    }

    return (
        <>
            <div className="hold-transition login-page">
                <div className="login-box">
                    {/* /.login-logo */}
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <Link to="#" className="h1"><b>Lift </b>Soft</Link>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Sign in to explore</p>
                            <form onSubmit={loginSubmit}>
                                <div className="input-group mb-3">
                                    <input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" placeholder="Email" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                                <span className='text-danger'>{loginInput.error_list.email}</span>

                                <div className="input-group mb-3">
                                    <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" placeholder="Password" />

                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>
                                <span className='text-danger'>{loginInput.error_list.password}</span>

                                <div className="row">
                                    <div className="col-7">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="remember" />
                                            <label htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    {/* /.col */}
                                    <div className="col-5">
                                        <button type="submit" disabled={isLoading} className="btn btn-primary btn-block">
                                            {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Sign In
                                        </button>
                                    </div>
                                    {/* /.col */}
                                </div>
                            </form>
                            <div className="social-auth-links text-center mt-4 mb-3">
                                <p>- OR -</p>
                                <button type='button' className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2" /> Sign in using Google
                                </button>
                            </div>
                            {/* /.social-auth-links */}
                            <p className="mb-1">
                                <Link to="forgot-password">I forgot my password</Link>
                            </p>
                            <p className="mb-0">
                                <Link to="register" className="text-center">Register a new account</Link>
                            </p>
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
            </div>
        </>
    )
}

export default Login