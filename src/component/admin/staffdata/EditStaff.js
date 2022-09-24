import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditStaff(props) {

    const history = useHistory();

    document.title = "Edit Staff | ";
    const [all_class, setAllClass] = useState([]);
    const [all_category, setAllCategory] = useState([]);

    const [isLoading, setIsloading] = useState(false);

    const [pLoading, setPloading] = useState(false);

    const [loading, setLoading] = useState(true);
    //const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    //declare variable for password update here..
    const [pass_staff, setPassStaff] = useState({
        new_password: '',
        confirm_password: '',
        listError: [],

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
            axios.post(`/api/update_staff_password/${record_id}`, data).then(res => {
                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setListError([]);

                    history.push('/admin/staff');
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
    //decl all variable here
    const [edit_staff, setEditStaff] = useState({
        surname: '',
        other_name: '',
        sex: '',
        dob: '',
        state: '',
        email: '',
        phone: '',
        country: '',
        home_address: '',
        class: '',
        school_category: '',
        staff_id: '',
        qualification: '',
        acct_username: '',
        staff_level: '',
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setEditStaff({ ...edit_staff, [e.target.name]: e.target.value })
    }

    const submitEditStaff = (e) => {
        e.preventDefault();
        setIsloading(true);
        const record_id = props.match.params.id;
        const data = {
            surname: edit_staff.surname,
            other_name: edit_staff.other_name,
            sex: edit_staff.sex,
            dob: edit_staff.dob,
            state: edit_staff.state,
            email: edit_staff.email,
            phone: edit_staff.phone,
            staff_id: edit_staff.staff_id,
            school_category: edit_staff.school_category,
            qualification: edit_staff.qualification,
            acct_username: edit_staff.acct_username,
            class: edit_staff.class,
            country: edit_staff.country,
            home_address: edit_staff.home_address,
            staff_level: edit_staff.staff_level,
        }

        try {
            // let create the api url here
            axios.post(`/api/save_staff_update/${record_id}`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setError([]);
                    history.push('/admin/staff');
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });

                    setError(res.data.errors);
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setError(res.data.errors);
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
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
    // create a function to fetch class data here
    useEffect(() => {
        const id = props.match.params.id;
        try {
            axios.get(`/api/fetch_edit_staff/${id}`).then(res => {
                if (res.data.status === 200) {
                    setEditStaff(res.data.staff_editDetails);
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
    // create a function to fetch class, school category, school session, school term data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);

                setAllCategory(res.data.allDetails.sch_category_details)
            }
        });
    }, []);
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
                            <h4 className="m-0">Staff Data Capturing Form</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><Link to='/admin/staff'><button type="button" className="btn btn-block btn-info btn-sm">View Staff</button></Link> </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Be sure before editing this staff details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>

                            </div>
                            <form onSubmit={submitEditStaff} >
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Surname</label>
                                            <input type="text" name='surname' onChange={handleInput} value={edit_staff.surname} className="form-control" placeholder="Surname" />
                                            <small className='text-danger'>{error_list.surname}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Other Name</label>
                                            <input type="text" name='other_name' onChange={handleInput} value={edit_staff.other_name} className="form-control" placeholder="Other Name" />
                                            <small className='text-danger'>{error_list.other_name}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Sex</label>
                                            <select name='sex' className="form-control" onChange={handleInput} value={edit_staff.sex}>
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
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Date of Birth</label>
                                            <input type="date" name='dob' onChange={handleInput} value={edit_staff.dob} className="form-control" placeholder="DOB" />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>State</label>
                                            <select name='state' className="form-control" onChange={handleInput} value={edit_staff.state} style={{ width: '100%' }}>
                                                <option>Select</option>
                                                <option value='Abia'>Abia</option>
                                                <option value='Adamawa'>Adamawa</option>
                                                <option value='AkwaIbom'>AkwaIbom</option>
                                                <option value='Anambra'>Anambra</option>
                                                <option value='Bauchi'>Bauchi</option>
                                                <option value='Bayelsa'>Bayelsa</option>
                                                <option value='Benue'>Benue</option>
                                                <option value='Borno'>Borno</option>
                                                <option value='CrossRivers'>CrossRivers</option>
                                                <option value='Delta'>Delta</option>
                                                <option value='Ebonyi'>Ebonyi</option>
                                                <option value='Edo'>Edo</option>
                                                <option value='Ekiti'>Ekiti</option>
                                                <option value='Enugu'>Enugu</option>
                                                <option value='Gombe'>Gombe</option>
                                                <option value='Imo'>Imo</option>
                                                <option value='Jigawa'>Jigawa</option>
                                                <option value='Kaduna'>Kaduna</option>
                                                <option value='Kano'>Kano</option>
                                                <option value='Katsina'>Katsina</option>
                                                <option value='Kebbi'>Kebbi</option>
                                                <option value='Kogi'>Kogi</option>
                                                <option value='Kwara'>Kwara</option>
                                                <option value='Lagos'>Lagos</option>
                                                <option value='Nasarawa'>Nasarawa</option>
                                                <option value='Niger'>Niger</option>
                                                <option value='Ogun'>Ogun</option>
                                                <option value='Ondo'>Ondo</option>
                                                <option value='Osun'>Osun</option>
                                                <option value='Oyo'>Oyo</option>
                                                <option value='Plateau'>Plateau</option>
                                                <option value='Rivers'>Rivers</option>
                                                <option value='Sokoto'>Sokoto</option>
                                                <option value='Taraba'>Taraba</option>
                                                <option value='Yobe'>Yobe</option>
                                                <option value='Zamfara'>Zamafara</option>
                                                <option value='Others'>Others</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input type="text" name='country' onChange={handleInput} value={edit_staff.country} className="form-control" placeholder="Country" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" name='phone' onChange={handleInput} value={edit_staff.phone} className="form-control" placeholder="Phone Number" />
                                            <small className='text-danger'>{error_list.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" name='email' onChange={handleInput} value={edit_staff.email} className="form-control" placeholder="Email Address" />

                                        </div>
                                    </div>
                                </div>

                                <h5 className='text-primary'>Academic Details</h5>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Qualification</label>
                                            <input type="text" name='qualification' onChange={handleInput} value={edit_staff.qualification} className="form-control" placeholder="Qualification" />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Assign Class (Class Teacher)</label>
                                            <select name='class' onChange={handleInput} value={edit_staff.class} className="form-control">
                                                <option>Select</option>
                                                {
                                                    all_class.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.class_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <small className='text-danger'>{error_list.class}</small>
                                        </div>
                                    </div>
                                    <div className='col-sm-4'>
                                        <label>School Category</label>
                                        <select name='school_category' onChange={handleInput} value={edit_staff.school_category} className="form-control" >
                                            <option>Select</option>
                                            {
                                                all_category.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.sc_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <small className='text-danger'>{error_list.school_category}</small>
                                    </div>
                                </div>

                                <h5 className='text-primary'>Other Information </h5>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" name='acct_username' onChange={handleInput} value={edit_staff.acct_username} className="form-control" placeholder="Username" />
                                            <small className='text-danger'>{error_list.acct_username}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Staff ID</label>
                                            <input type="text" name='staff_id' onChange={handleInput} value={edit_staff.staff_id} className="form-control" placeholder="Staff ID" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Staff Level</label>
                                            <select name='staff_level' className="form-control" onChange={handleInput} value={edit_staff.staff_level}>
                                                <option>Select</option>
                                                <option value="Principal">Principal</option>
                                                <option value="Teacher">Teacher</option>
                                                <option value="Class Teacher">Class Teacher</option>
                                                <option value="Form Teacher">Form Teacher</option>
                                                <option value="Admin Staff">Admin Staff</option>
                                                <option value="Workers">Worker</option>
                                                <option value="Others">Others</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="form-group">
                                            <label>Home Address</label>
                                            <textarea name='home_address' onChange={handleInput} value={edit_staff.home_address} className="form-control" placeholder="Home Address"></textarea>
                                            <small className='text-danger'>{error_list.home_address}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <Link to="/admin/staff"><button className="btn btn-danger">Cancel</button></Link>
                                    <button type='submit' disabled={isLoading} className="btn btn-success">
                                        {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title text-danger">Update Password Details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-3">
                            <form onSubmit={submitPassword}>
                                <div className="row">
                                    <div className="col-sm-5">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input type="password" name='new_password' onChange={handleInputPassword} value={pass_staff.new_password} className="form-control" placeholder="New Password" />
                                            <small className='text-danger'>{list_error.new_password}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input type="text" name='confirm_password' onChange={handleInputPassword} value={pass_staff.confirm_password} className="form-control" placeholder="Confirm Password" />
                                            <small className='text-danger'>{list_error.confirm_password}</small>
                                        </div>
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
                        {/* /.card-body */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditStaff;