import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import Image from '../../assets/dist/img/avatar_2.png';
import axios from 'axios';

function UpdatePassword() {
    const history = useHistory();
    document.title = "Update Password | " + window.companyName;

    const [isLoading, setIsloading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [view_details, setViewDetails] = useState([]);
    const [my_class_name, setMyClassName] = useState([]);

    const [update_password, setUpdatePassword] = useState({
        new_password: '',
        confirm_password: '',
        error_list: [],
    });

    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setUpdatePassword({ ...update_password, [e.target.name]: e.target.value })
    }

    const submitPasswordUpdate = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            new_password: update_password.new_password,
            confirm_password: update_password.confirm_password,
        }
        // let create the api url here
        axios.post(`/api/save_password_update`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setUpdatePassword({
                    ...update_password,
                    confirm_password: '',
                    new_password: '',
                });
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { theme: 'colored' });
                setUpdatePassword({ ...update_password, error_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                setUpdatePassword({ ...update_password, error_list: res.data.errors });
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
    }
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_student_profile`).then(res => {
            if (res.data.status === 200) {
                setViewDetails(res.data.student_profileDetails);
                setMyClassName(res.data.get_className);
            }
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                history.push('/student/index');
            }
            else {
                toast.warning("Something went wrong! Try again", { position: 'top-center', theme: 'colored' });
                history.push('/student/index');
            }
            setLoading(false);
        });
    }, []);
    // create a function to fetch class data here
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };

    if (loading) {
        return (
            <div style={style}>
                <div className="spinner-border spinner-border text-info" role="status">
                </div> Loading
            </div>
        )
    }
    return (
        <>
            <div className="content-header">
                <div className="container" >
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-7">
                                <h1 className="m-0" style={p}>Update Password <small></small></h1>
                            </div>
                            <div className="col-sm-5">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="/student/index"><li className="breadcrumb-item"> <button type="button" className="btn btn-block btn-secondary btn-sm"> Back</button></li></Link>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className='col-12'>
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-info" /> Info!</h5>
                                Security of your account is very important, always update your password regularly to keep your account secured.
                            </div>

                        </div>
                    </div>

                    <div className="overlay-wrapper">
                        <div className='col-12 mt-5'>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="card card-secondary card-outline">
                                        <div className="card-body ">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h3 className="card-title">Password update</h3>
                                                </div>

                                                {isLoading && <div className="overlay"><i className="spinner-border spinner-border text-info" />
                                                    <div className="text-bold ml-2"> Processing...
                                                    </div>
                                                </div>
                                                }
                                                <form onSubmit={submitPasswordUpdate} className="form-horizontal">
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">New Password</label>
                                                            <div className="col-sm-12">
                                                                <input type="password" name='new_password' onChange={handleInput} value={update_password.new_password} className="form-control" placeholder="Enter New Password (8 character minium)" />
                                                                <span className='text-danger'>{update_password.error_list.new_password}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Confirm Password</label>
                                                            <div className="col-sm-12">
                                                                <input type="password" name='confirm_password' onChange={handleInput} value={update_password.confirm_password} className="form-control" placeholder="Enter Confirm Password" />
                                                                <span className='text-danger'>{update_password.error_list.confirm_password}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="modal-footer">
                                                        <Link to="/student/index"><button className="btn btn-danger" data-dismiss="modal">Cancel</button></Link>
                                                        <button disabled={isLoading} className="btn btn-success">
                                                            {/* {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                                                            Update
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default UpdatePassword;