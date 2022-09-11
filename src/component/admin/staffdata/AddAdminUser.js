import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddAdminUser() {

    document.title = "Add Admin User | ";

    const [isLoading, setIsloading] = useState(false);
    //const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    //decl all variable here
    const [add_adminUserInput, setAdminUserInput] = useState({
        surname: '',
        other_name: '',
        sex: '',
        email: '',
        phone: '',
        username: '',
        access_level: '',
        password: '',
        error_list: [],
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setAdminUserInput({ ...add_adminUserInput, [e.target.name]: e.target.value })
    }

    const submitAdminUsers = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            surname: add_adminUserInput.surname,
            other_name: add_adminUserInput.other_name,
            sex: add_adminUserInput.sex,
            email: add_adminUserInput.email,
            phone: add_adminUserInput.phone,
            username: add_adminUserInput.username,
            access_level: add_adminUserInput.access_level,
            password: add_adminUserInput.password,
        }
        console.log(add_adminUserInput.class_apply);
        try {
            // let create the api url here
            axios.post(`/api/save_admin_user`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setAdminUserInput({
                        ...add_adminUserInput,
                        surname: '',
                        other_name: '',
                        sex: '',
                        email: '',
                        phone: '',
                        username: '',
                        access_level: '',
                        password: '',
                    });
                    e.target.reset();
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setAdminUserInput({ ...add_adminUserInput, error_list: res.data.errors });
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setAdminUserInput({ ...add_adminUserInput, error_list: res.data.errors });
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                }
                setIsloading(false);
            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }

    }
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Admin Users Registration Page</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><Link to='/admin/admin-user'><button type="button" className="btn btn-block btn-info btn-sm">View Staff</button></Link> </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Fill the form correctly to register new admin user details</h3>
                        </div>
                        {/* /.card-header */}
                        {isLoading && <div className='overlay text-center'>
                            <div className="spinner-border spinner-border text-info" role="status">
                            </div>
                        </div>}
                        <div className="card-body">
                            <div className='text-center'>
                            </div>
                            <form onSubmit={submitAdminUsers} >
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Surname</label>
                                            <input type="text" name='surname' onChange={handleInput} value={add_adminUserInput.surname} className="form-control" placeholder="Surname" />
                                            <span className='text-danger'>{add_adminUserInput.error_list.surname}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Other Name</label>
                                            <input type="text" name='other_name' onChange={handleInput} value={add_adminUserInput.other_name} className="form-control" placeholder="Other Name" />
                                            <span className='text-danger'>{add_adminUserInput.error_list.other_name}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Sex</label>
                                            <select name='sex' className="form-control" onChange={handleInput} value={add_adminUserInput.sex}>
                                                <option>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <span className='text-danger'>{add_adminUserInput.error_list.sex}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" name='phone' onChange={handleInput} value={add_adminUserInput.phone} className="form-control" placeholder="Phone Number" />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" name='email' onChange={handleInput} value={add_adminUserInput.email} className="form-control" placeholder="Email Address" />
                                            <span className='text-danger'>{add_adminUserInput.error_list.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <h5 className='text-primary'>Access Status</h5>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" name='username' onChange={handleInput} value={add_adminUserInput.username} className="form-control" placeholder="Username" />
                                            <span className='text-danger'>{add_adminUserInput.error_list.username}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Access Level</label>
                                            <select name='access_level' onChange={handleInput} value={add_adminUserInput.access_level} className="form-control">
                                                <option>Select</option>
                                                <option value="1">Supper Admin</option>
                                                <option value="2">Admin</option>
                                                <option value="3">Staff</option>
                                                <option value="4">Teacher</option>
                                                <option value="5">Class Teacher</option>
                                                <option value="6">Form Teacher</option>
                                                <option value="7">Workers</option>
                                            </select>
                                            <span className='text-danger'>{add_adminUserInput.error_list.access_level}</span>
                                        </div>
                                    </div>
                                    <div className='col-sm-4'>
                                        <label>Password</label>
                                        <input type="password" name='password' onChange={handleInput} value={add_adminUserInput.password} className="form-control" placeholder="Password" />
                                        <span className='text-danger'>{add_adminUserInput.error_list.password}</span>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <Link to="/admin/admin-user"><button className="btn btn-danger">Cancel</button></Link>
                                    <button type='submit' disabled={isLoading} className="btn btn-success">
                                        {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Register
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAdminUser;