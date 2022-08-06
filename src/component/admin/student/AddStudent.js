import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function AddStudent() {

    document.title = "Add Student | ";
    const [all_class, setAllClass] = useState([]);
    const [all_session, setAllSession] = useState([]);
    const [all_category, setAllCategory] = useState([]);

    const [isLoading, setIsloading] = useState(false);
    //const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    //decl all variable here
    const [add_studentInput, setAddStudentInput] = useState({
        id: '',
        surname: '',
        other_name: '',
        sex: '',
        dob: '',
        state: '',
        lga: '',
        country: '',
        last_sch_attend: '',
        last_class_attend: '',
        class_apply: '',
        school_type: '',
        academic_year: '',
        school_category: '',
        admission_number: '',
        guardian_name: '',
        guardian_email: '',
        guardian_phone: '',
        guardian_address: '',
        staff_office_zone: '',
        staff_department: '',
        staff_rank: '',
        health_issues: '',
        staff_no: '',
        error_list: [],
    });

    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setAddStudentInput({ ...add_studentInput, [e.target.name]: e.target.value })
    }

    const submitStudent = (e) => {
        e.preventDefault();
        setIsloading(true);

        const data = {
            surname: add_studentInput.surname,
            other_name: add_studentInput.other_name,
            sex: add_studentInput.sex,
            dob: add_studentInput.dob,
            state: add_studentInput.state,
            lga: add_studentInput.lga,
            country: add_studentInput.country,
            last_sch_attend: add_studentInput.last_sch_attend,
            last_class_attend: add_studentInput.last_class_attend,
            class_apply: add_studentInput.class_apply,
            school_type: add_studentInput.school_type,
            academic_year: add_studentInput.academic_year,
            school_category: add_studentInput.school_category,
            admission_number: add_studentInput.admission_number,
            guardian_name: add_studentInput.guardian_name,
            guardian_email: add_studentInput.guardian_email,
            guardian_phone: add_studentInput.guardian_phone,
            guardian_address: add_studentInput.guardian_address,
            staff_office_zone: add_studentInput.staff_office_zone,
            staff_department: add_studentInput.staff_department,
            staff_rank: add_studentInput.staff_rank,
            health_issues: add_studentInput.health_issues,
            staff_no: add_studentInput.staff_no,

        }
        console.log(add_studentInput.class_apply);
        try {
            // let create the api url here
            axios.post(`/api/save_student`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setAddStudentInput({
                        ...add_studentInput,
                        surname: '',
                        other_name: '',
                        sex: '',
                        dob: '',
                        state: '',
                        lga: '',
                        country: '',
                        last_sch_attend: '',
                        last_class_attend: '',
                        class_apply: '',
                        school_type: '',
                        academic_year: '',
                        school_category: '',
                        admission_number: '',
                        guardian_name: '',
                        guardian_email: '',
                        guardian_phone: '',
                        guardian_address: '',
                        staff_office_zone: '',
                        staff_department: '',
                        staff_rank: '',
                        health_issues: '',
                        staff_no: '',
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
                    setAddStudentInput({ ...add_studentInput, error_list: res.data.errors });
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setAddStudentInput({ ...add_studentInput, error_list: res.data.errors });
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
                setAllSession(res.data.allDetails.session_details);
                setAllCategory(res.data.allDetails.sch_category_details)

            }

        });
    }, []);

    // // create a function to fetch school session/year  data here
    // useEffect(() => {
    //     axios.get(`/api/fetch_all_category`).then(res => {
    //         if (res.data.status === 200) {
    //             setAllCategory(res.data.all_category);
    //         }

    //     });
    // }, []);

    // // create a function to fetch School Category  data here
    // useEffect(() => {
    //     axios.get(`/api/fetch_all_class`).then(res => {
    //         if (res.data.status === 200) {
    //             setAllClass(res.data.all_classes);
    //         }

    //     });
    // }, []);

    // if (isLoading) {
    //     return (
    //         <div style={style}>
    //             <div className="spinner-border spinner-border-sm" role="status">
    //             </div> Loading
    //         </div>
    //     )
    // }

    return (

        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Student Data Capturing Form</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><Link to='/admin/student'><button type="button" className="btn btn-block btn-info btn-sm">View Student</button></Link> </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Fill the form correctly to register new student details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                            </div>
                            <form onSubmit={submitStudent} >
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Surname</label>
                                            <input type="text" name='surname' onChange={handleInput} value={add_studentInput.surname} className="form-control" placeholder="Surname" />
                                            <span className='text-danger'>{add_studentInput.error_list.surname}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Other Name</label>
                                            <input type="text" name='other_name' onChange={handleInput} value={add_studentInput.other_name} className="form-control" placeholder="Other Name" />
                                            <span className='text-danger'>{add_studentInput.error_list.other_name}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Sex</label>
                                            <select name='sex' className="form-control" onChange={handleInput} value={add_studentInput.sex} style={{ width: '100%' }}>
                                                <option>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <span className='text-danger'>{add_studentInput.error_list.sex}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Date of Birth</label>
                                            <input type="date" name='dob' onChange={handleInput} value={add_studentInput.dob} className="form-control" placeholder="Surname" />
                                            <span className='text-danger'>{add_studentInput.error_list.dob}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>State</label>
                                            <select name='state' className="form-control" onChange={handleInput} value={add_studentInput.state} style={{ width: '100%' }}>
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
                                            <input type="text" name='country' onChange={handleInput} value={add_studentInput.country} className="form-control" placeholder="Country" />
                                        </div>
                                    </div>
                                </div>


                                {/* /.row */}
                                <h5 className='text-primary'>Academic Details</h5>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Last School Attended</label>
                                            <input type="text" name='last_sch_attend' onChange={handleInput} value={add_studentInput.last_sch_attend} className="form-control" placeholder="Last School Attended" />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Last Class Attended</label>
                                            <input type="text" name='last_class_attend' onChange={handleInput} value={add_studentInput.last_class_attend} className="form-control" placeholder="Last Class Attended" />

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Class Applying</label>
                                            <select name='class_apply' onChange={handleInput} value={add_studentInput.class_apply} className="form-control">
                                                <option>Select</option>
                                                {
                                                    all_class.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.class_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className='text-danger'>{add_studentInput.error_list.class_apply}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Choice of Schooling</label>
                                            <select name='school_type' onChange={handleInput} value={add_studentInput.school_type} className="form-control">
                                                <option>Select</option>
                                                <option value='Day'>Day</option>
                                                <option value='Boarding'>Boarding</option>

                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Account Type</label>
                                            <input type="text" name='start_date' readOnly value="Student" className="form-control" placeholder="Student" />

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Academic Year</label>
                                            <select name='academic_year' onChange={handleInput} value={add_studentInput.academic_year} className="form-control">
                                                <option>Select</option>
                                                {
                                                    all_session.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className='text-danger'>{add_studentInput.error_list.academic_year}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>School Category</label>
                                            <select name='school_category' onChange={handleInput} value={add_studentInput.school_category} className="form-control" style={{ width: '100%' }}>
                                                <option>Select</option>
                                                {
                                                    all_category.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.sc_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className='text-danger'>{add_studentInput.error_list.school_category}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Admin No.</label>
                                            <input type="text" name='admission_number' onChange={handleInput} value={add_studentInput.admission_number} className="form-control" placeholder="Admission Number" />
                                            <span className='text-danger'>{add_studentInput.error_list.admission_number}</span>
                                        </div>
                                    </div>
                                </div>
                                <h5 className='text-primary'>Medical Information </h5>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="form-group">
                                            <label>Health Condition</label>
                                            <select name='health_issues' onChange={handleInput} value={add_studentInput.health_issues} className="form-control select2" style={{ width: '100%' }}>
                                                <option>Disability Status</option>
                                                <option value='No'>No</option>
                                                <option value='Yes'>Yes</option>
                                                <option value='Others'>Others</option>
                                            </select>

                                        </div>
                                    </div>

                                </div>
                                <h5 className='text-primary'>Contact Information</h5>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Guardian's Name</label>
                                            <input type="text" name='guardian_name' onChange={handleInput} value={add_studentInput.guardian_name} className="form-control" placeholder="Guardian's Name" />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Guardian's Email</label>
                                            <input type="text" name='guardian_email' onChange={handleInput} value={add_studentInput.guardian_email} className="form-control" placeholder="Guardian's Email" />

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Guardian's Phone.</label>
                                            <input type="text" name='guardian_phone' onChange={handleInput} value={add_studentInput.guardian_phone} className="form-control" placeholder="Guardian's Phone Number" />
                                            <span className='text-danger'>{add_studentInput.error_list.guardian_phone}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Guardian' Address</label>
                                            <textarea name='guardian_address' onChange={handleInput} value={add_studentInput.guardian_address} className="form-control" placeholder="Guardian's Address"></textarea>
                                            <span className='text-danger'>{add_studentInput.error_list.guardian_address}</span>
                                        </div>
                                    </div>
                                </div>
                                <h5 className='text-primary'>School Staff Information </h5>
                                <span className='text-danger'><b>Note:</b> You can submit photocopy of your Office ID Card</span>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Office Location</label>
                                            <input type="text" name='staff_office_zone' onChange={handleInput} value={add_studentInput.staff_office_zone} className="form-control" placeholder="Office/State/Location" />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input type="text" name='staff_department' onChange={handleInput} value={add_studentInput.staff_department} className="form-control" placeholder="Department (Optional)" />

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>File No.</label>
                                            <input type="text" name='staff_no' onChange={handleInput} value={add_studentInput.staff_no} className="form-control" placeholder="File No." />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Rank</label>
                                            <input type="text" name='staff_rank' onChange={handleInput} value={add_studentInput.staff_rank} className="form-control" placeholder="Rank (Optional)" />

                                        </div>
                                    </div>
                                </div>
                                {/* /.row */}
                                {/* /.card-body */}
                                <div className="modal-footer">
                                    <Link to="/admin/student"><button className="btn btn-danger">Cancel</button></Link>
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


export default AddStudent;