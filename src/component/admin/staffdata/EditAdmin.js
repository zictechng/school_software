import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditAdmin(props) {

    const history = useHistory();
    document.title = "Edit Admin User | ";

    const [isLoading, setIsloading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pLoading, setPloading] = useState(false);
    //const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    //decl all variable here
    const [add_adminUserInput, setAdminUserInput] = useState({
        first_name: '',
        other_name: '',
        sex: '',
        email: '',
        phone: '',
        user_name: '',
        access_level: '',
        password: '',
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setAdminUserInput({ ...add_adminUserInput, [e.target.name]: e.target.value })
    }

    const submitAdminUsers = (e) => {
        e.preventDefault();
        setIsloading(true);
        const record_id = props.match.params.id;
        const data = {
            first_name: add_adminUserInput.first_name,
            other_name: add_adminUserInput.other_name,
            sex: add_adminUserInput.sex,
            email: add_adminUserInput.email,
            phone: add_adminUserInput.phone,
            user_name: add_adminUserInput.user_name,
            access_level: add_adminUserInput.access_level,
            password: add_adminUserInput.password,
        }
        try {
            // let create the api url here
            axios.post(`/api/update_admin_user/${record_id}`, data).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setError([]);
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setError(res.data.errors);
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setAdminUserInput({ ...add_adminUserInput, error_list: res.data.errors });
                    setError(res.data.errors);
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setAdminUserInput({ ...add_adminUserInput, error_list: res.data.errors });
                    setError(res.data.errors);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setError(res.data.errors);
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                    setError(res.data.errors);
                }
                setIsloading(false);
            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }

    }
    // this toggle the profile picture upload form if the check box it tick
    const [show, toggleShow] = React.useState(false);

    //declare variable for password update here..
    const [pass_staff, setPassStaff] = useState({
        new_password: '',
        confirm_password: '',
    });
    // declare input handling function here
    const handleInputPassword = (e) => {
        e.persist();
        setPassStaff({ ...pass_staff, [e.target.name]: e.target.value })
    }
    const submitPassword = (e) => {
        e.preventDefault();
        setPloading(true);
        const record_id = props.match.params.id;
        const data = {
            new_password: pass_staff.new_password,
            confirm_password: pass_staff.confirm_password,
        }
        try {
            // let create the api url here
            axios.post(`/api/update_password/${record_id}`, data).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setListError([]);
                    toggleShow(!show)
                    history.push('/admin/admin-user');
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setListError(res.data.errors);
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setListError(res.data.errors);
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setListError(res.data.errors);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setListError(res.data.errors);
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                    setListError(res.data.errors);
                }
                setPloading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }
    }
    // create a function to fetch class data here
    useEffect(() => {
        const id = props.match.params.id;
        try {
            axios.get(`/api/fetch_admin_edit/${id}`).then(res => {
                if (res.data.status === 200) {
                    setAdminUserInput(res.data.admin_editDetails);
                }
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });
                    history.push('/admin/staff');
                }
                else if (res.data.status === 405) {
                    toast.error("Server error!", { theme: 'colored' });
                    history.push('/admin/staff');
                }
                else {
                    toast.warning("Something went wrong! Try again", { theme: 'colored' });
                    history.push('/admin/staff');
                }
                setLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }
    }, [props.match.params.id, history]);

    const [error_list, setError] = useState([]);
    const [list_error, setListError] = useState([]);

    if (loading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                    </div> Loading
                </div>
            </div>
        )
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
                                <li className='mr-3'><Link to='/admin/admin-user'><button type="button" className="btn btn-block btn-info btn-sm">View Admin</button></Link> </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Fill the form correctly to register new admin user details</h3>
                            <div className="card-tools">
                                <ul className="pagination pagination-sm float-right">
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" onClick={() => toggleShow(!show)} className="custom-control-input" id="customSwitches" />
                                        <label className="custom-control-label" htmlFor="customSwitches"></label>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                            </div>
                            <form onSubmit={submitAdminUsers} >
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Surname</label>
                                            <input type="text" name='first_name' onChange={handleInput} value={add_adminUserInput.first_name} className="form-control" placeholder="Surname" />
                                            <small className='text-danger'>{error_list.first_name}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Other Name</label>
                                            <input type="text" name='other_name' onChange={handleInput} value={add_adminUserInput.other_name} className="form-control" placeholder="Other Name" />
                                            <small className='text-danger'>{error_list.other_name}</small>
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
                                            <small className='text-danger'>{error_list.sex}</small>
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
                                            <small className='text-danger'>{error_list.email}</small>
                                        </div>
                                    </div>
                                </div>

                                <h5 className='text-primary'>Access Status</h5>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm-5">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" name='user_name' onChange={handleInput} value={add_adminUserInput.user_name} className="form-control" placeholder="Username" />
                                            <small className='text-danger'>{error_list.user_name}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
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
                                            <small className='text-danger'>{error_list.access_level}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type='submit' disabled={isLoading} className="btn btn-success">
                                        {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {show && <div>
                        <div className="card table-responsive">
                            <div className="card-body">
                                <div className='text-center'>
                                </div>
                                <form onSubmit={submitPassword} >
                                    <h5 className='text-danger'>Password Update</h5>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>New Password</label>
                                                <input type="password" name='new_password' onChange={handleInputPassword} value={add_adminUserInput.new_password} className="form-control" placeholder="New Password" />
                                                <small className='text-danger'>{list_error.new_password}</small>
                                            </div>
                                        </div>
                                        <div className='col-sm-5'>
                                            <label>Password</label>
                                            <input type="password" name='confirm_password' onChange={handleInputPassword} value={add_adminUserInput.confirm_password} className="form-control" placeholder="Confirm Password" />
                                            <small className='text-danger'>{list_error.confirm_password}</small>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type='submit' disabled={pLoading} className="btn btn-success">
                                            {pLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

        </>
    )
}

export default EditAdmin