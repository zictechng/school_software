import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddStaff() {

    document.title = "Add Staff | ";
    const [all_class, setAllClass] = useState([]);
    const [all_category, setAllCategory] = useState([]);

    const [isLoading, setIsloading] = useState(false);
    //const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    //decl all variable here
    const [add_staffInput, setAddStaffInput] = useState({
        surname: '',
        other_name: '',
        sex: '',
        dob: '',
        state: '',
        email: '',
        phone: '',
        country: '',
        home_address: '',
        class_apply: '',
        school_category: '',
        staff_id: '',
        qualification: '',
        username: '',
        staff_level: '',
        error_list: [],
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setAddStaffInput({ ...add_staffInput, [e.target.name]: e.target.value })
    }

    const submitStaff = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            surname: add_staffInput.surname,
            other_name: add_staffInput.other_name,
            sex: add_staffInput.sex,
            dob: add_staffInput.dob,
            state: add_staffInput.state,
            email: add_staffInput.email,
            phone: add_staffInput.phone,
            staff_id: add_staffInput.staff_id,
            school_category: add_staffInput.school_category,
            qualification: add_staffInput.qualification,
            username: add_staffInput.username,
            class_apply: add_staffInput.class_apply,
            country: add_staffInput.country,
            home_address: add_staffInput.home_address,
            staff_level: add_staffInput.staff_level,

        }
        console.log(add_staffInput.class_apply);
        try {
            // let create the api url here
            axios.post(`/api/save_staff`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setAddStaffInput({
                        ...add_staffInput,
                        surname: '',
                        other_name: '',
                        sex: '',
                        dob: '',
                        state: '',
                        email: '',
                        phone: '',
                        country: '',
                        home_address: '',
                        class_apply: '',
                        school_category: '',
                        staff_id: '',
                        qualification: '',
                        username: '',

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
                    setAddStaffInput({ ...add_staffInput, error_list: res.data.errors });
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setAddStaffInput({ ...add_staffInput, error_list: res.data.errors });
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

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);

                setAllCategory(res.data.allDetails.sch_category_details)
            }
        });
    }, []);
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
                            <h3 className="card-title">Fill the form correctly to register new staff details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                            </div>
                            <form onSubmit={submitStaff} >
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Surname</label>
                                            <input type="text" name='surname' onChange={handleInput} value={add_staffInput.surname} className="form-control" placeholder="Surname" />
                                            <span className='text-danger'>{add_staffInput.error_list.surname}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Other Name</label>
                                            <input type="text" name='other_name' onChange={handleInput} value={add_staffInput.other_name} className="form-control" placeholder="Other Name" />
                                            <span className='text-danger'>{add_staffInput.error_list.other_name}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Sex</label>
                                            <select name='sex' className="form-control" onChange={handleInput} value={add_staffInput.sex}>
                                                <option>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <span className='text-danger'>{add_staffInput.error_list.sex}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Date of Birth</label>
                                            <input type="date" name='dob' onChange={handleInput} value={add_staffInput.dob} className="form-control" placeholder="DOB" />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>State</label>
                                            <select name='state' className="form-control" onChange={handleInput} value={add_staffInput.state} style={{ width: '100%' }}>
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
                                            <input type="text" name='country' onChange={handleInput} value={add_staffInput.country} className="form-control" placeholder="Country" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" name='phone' onChange={handleInput} value={add_staffInput.phone} className="form-control" placeholder="Phone Number" />
                                            <span className='text-danger'>{add_staffInput.error_list.phone}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" name='email' onChange={handleInput} value={add_staffInput.email} className="form-control" placeholder="Email Address" />

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
                                            <input type="text" name='qualification' onChange={handleInput} value={add_staffInput.qualification} className="form-control" placeholder="Qualification" />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Assign Class (Class Teacher)</label>
                                            <select name='class_apply' onChange={handleInput} value={add_staffInput.class_apply} className="form-control">
                                                <option>Select</option>
                                                {
                                                    all_class.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.class_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className='text-danger'>{add_staffInput.error_list.class_apply}</span>
                                        </div>
                                    </div>
                                    <div className='col-sm-4'>
                                        <label>School Category</label>
                                        <select name='school_category' onChange={handleInput} value={add_staffInput.school_category} className="form-control" >
                                            <option>Select</option>
                                            {
                                                all_category.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.sc_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <span className='text-danger'>{add_staffInput.error_list.school_category}</span>
                                    </div>
                                </div>

                                <h5 className='text-primary'>Other Information </h5>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" name='username' onChange={handleInput} value={add_staffInput.username} className="form-control" placeholder="Username" />
                                            <span className='text-danger'>{add_staffInput.error_list.username}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Staff ID</label>
                                            <input type="text" name='staff_id' onChange={handleInput} value={add_staffInput.staff_id} className="form-control" placeholder="Staff ID" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Staff Level</label>
                                            <select name='staff_level' className="form-control" onChange={handleInput} value={add_staffInput.staff_level}>
                                                <option>Select</option>
                                                <option value="Principal">Principal</option>
                                                <option value="Teacher">Teacher</option>
                                                <option value="Class Teacher">Class Teacher</option>
                                                <option value="Form Teacher">Form Teacher</option>
                                                <option value="Admin Staff">Admin Staff</option>
                                                <option value="Workers">Worker</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <span className='text-danger'>{add_staffInput.error_list.staff_level}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="form-group">
                                            <label>Home Address</label>
                                            <textarea name='home_address' onChange={handleInput} value={add_staffInput.home_address} className="form-control" placeholder="Home Address"></textarea>
                                            <span className='text-danger'>{add_staffInput.error_list.home_address}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <Link to="/admin/staff"><button className="btn btn-danger">Cancel</button></Link>
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

export default AddStaff;