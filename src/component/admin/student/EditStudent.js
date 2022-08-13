import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditStudent(props) {

    const history = useHistory();
    document.title = "Edit Student | ";
    const [all_class, setAllClass] = useState([]);
    const [all_session, setAllSession] = useState([]);
    const [all_category, setAllCategory] = useState([]);

    const [isLoading, setIsloading] = useState(false);
    const [loading, setLoading] = useState(true);
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    //decl all variable here

    const [student_detailsInput, setStudentDetails] = useState({

        surname: '',
        other_name: '',
        sex: '',
        dob: '',
        st_age: '',
        state: '',
        lga: '',
        country: '',
        last_sch_attend: '',
        last_class_attend: '',
        class_apply: '',
        schooling_type: '',
        academic_year: '',
        school_category: '',
        st_admin_number: '',
        guardia_name: '',
        guardia_email: '',
        guardia_number: '',
        guardia_address: '',
        staff_zone: '',
        staff_depart: '',
        staff_rank: '',
        health_issue: '',
        staff_file_no: '',

    });
    // create a function to fetch class data here
    useEffect(() => {
        const id = props.match.params.id;

        axios.get(`/api/fetch_edit_details/${id}`).then(res => {
            if (res.data.status === 200) {
                setStudentDetails(res.data.edit_Details);
            }
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                history.push('/admin/student');
            }
            else {
                toast.warning("Something went wrong! Try again", { position: 'top-center', theme: 'colored' });
                history.push('/admin/student');
            }
            setLoading(false);

        });
    }, [props.match.params.id, history]);
    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
                setAllSession(res.data.allDetails.session_details);
                setAllCategory(res.data.allDetails.sch_category_details);

            }
        });
    }, []);

    const [error_list, setError] = useState([]);

    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setStudentDetails({ ...student_detailsInput, [e.target.name]: e.target.value })
    }

    const submitEditStudent = (e) => {
        e.preventDefault();
        setIsloading(true);
        const record_id = props.match.params.id;
        const data = {

            surname: student_detailsInput.surname,
            other_name: student_detailsInput.other_name,
            sex: student_detailsInput.sex,
            dob: student_detailsInput.dob,
            st_age: student_detailsInput.st_age,
            state: student_detailsInput.state,
            lga: student_detailsInput.lga,
            country: student_detailsInput.country,
            last_sch_attend: student_detailsInput.last_sch_attend,
            last_class_attend: student_detailsInput.last_class_attend,
            class_apply: student_detailsInput.class_apply,
            schooling_type: student_detailsInput.schooling_type,
            academic_year: student_detailsInput.academic_year,
            school_category: student_detailsInput.school_category,
            st_admin_number: student_detailsInput.st_admin_number,
            guardia_name: student_detailsInput.guardia_name,
            guardia_email: student_detailsInput.guardia_email,
            guardia_number: student_detailsInput.guardia_number,
            guardia_address: student_detailsInput.guardia_address,
            staff_zone: student_detailsInput.staff_zone,
            staff_depart: student_detailsInput.staff_depart,
            staff_rank: student_detailsInput.staff_rank,
            health_issue: student_detailsInput.health_issue,
            staff_file_no: student_detailsInput.staff_file_no,

        }
        try {
            // let create the api url here
            axios.post(`/api/student_update/${record_id}`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setError([]);
                    history.push('/admin/student');

                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setError([]);
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setStudentDetails({ ...student_detailsInput, error_list: res.data.errors });
                    setError([]);
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setStudentDetails({ ...student_detailsInput, error_list: res.data.errors });
                    setError([]);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setError([]);
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
                    setError([]);
                }
                setIsloading(false);
            });

        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsloading(false);
        }

    }

    if (loading) {
        return (
            <div style={style}>
                <div className="spinner-border spinner-border-sm text-info" role="status">
                </div> Loading
            </div>
        )
    }
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Manage Student Details</h4>
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
                            <h3 className="card-title">Be sure before editing this student details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                            </div>
                            <form onSubmit={submitEditStudent} >
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Surname</label>
                                            <input type="text" name='surname' onChange={handleInput} value={student_detailsInput.surname} className="form-control" placeholder="Surname" />
                                            <small className='text-danger'>{error_list.surname}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Other Name</label>
                                            <input type="text" name='other_name' onChange={handleInput} value={student_detailsInput.other_name} className="form-control" placeholder="Other Name" />
                                            <small className='text-danger'>{error_list.other_name}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Sex</label>
                                            <select name='sex' className="form-control" onChange={handleInput} value={student_detailsInput.sex} style={{ width: '100%' }}>
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
                                            <input type="date" name='dob' onChange={handleInput} value={student_detailsInput.dob} className="form-control" placeholder="Date of Birth" />
                                            <small className='text-danger'>{error_list.dob}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>State</label>
                                            <select name='state' className="form-control" onChange={handleInput} value={student_detailsInput.state} style={{ width: '100%' }}>
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
                                            <input type="text" name='country' onChange={handleInput} value={student_detailsInput.country} className="form-control" placeholder="Country" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Age</label>
                                            <input type="text" name='st_age' onChange={handleInput} value={student_detailsInput.st_age} className="form-control" placeholder="Age" />
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
                                            <input type="text" name='last_sch_attend' onChange={handleInput} value={student_detailsInput.last_sch_attend} className="form-control" placeholder="Last School Attended" />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Last Class Attended</label>
                                            <input type="text" name='last_class_attend' onChange={handleInput} value={student_detailsInput.last_class_attend} className="form-control" placeholder="Last Class Attended" />

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Class Applying</label>
                                            <select name='class_apply' onChange={handleInput} value={student_detailsInput.class_apply} className="form-control">
                                                <option>Select</option>
                                                {
                                                    all_class.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.class_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <small className='text-danger'>{error_list.class_apply}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Choice of Schooling</label>
                                            <select name='schooling_type' onChange={handleInput} value={student_detailsInput.schooling_type} className="form-control">
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
                                            <select name='academic_year' onChange={handleInput} value={student_detailsInput.academic_year} className="form-control">
                                                <option>Select</option>
                                                {
                                                    all_session.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <small className='text-danger'>{error_list.academic_year}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>School Category</label>
                                            <select name='school_category' onChange={handleInput} value={student_detailsInput.school_category} className="form-control" style={{ width: '100%' }}>
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
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Admin No.</label>
                                            <input type="text" name='st_admin_number' onChange={handleInput} value={student_detailsInput.st_admin_number} className="form-control" placeholder="Admission Number" />
                                            <small className='text-danger'>{error_list.st_admin_number}</small>
                                        </div>
                                    </div>
                                </div>
                                <h5 className='text-primary'>Medical Information </h5>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="form-group">
                                            <label>Health Condition</label>
                                            <select name='health_issue' onChange={handleInput} value={student_detailsInput.health_issue} className="form-control select2" style={{ width: '100%' }}>
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
                                            <input type="text" name='guardia_name' onChange={handleInput} value={student_detailsInput.guardia_name} className="form-control" placeholder="Guardian's Name" />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Guardian's Email</label>
                                            <input type="text" name='guardia_email' onChange={handleInput} value={student_detailsInput.guardia_email} className="form-control" placeholder="Guardian's Email" />

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Guardian's Phone.</label>
                                            <input type="text" name='guardia_number' onChange={handleInput} value={student_detailsInput.guardia_number} className="form-control" placeholder="Guardian's Phone Number" />
                                            <small className='text-danger'>{error_list.guardia_number}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Guardian' Address</label>
                                            <textarea name='guardia_address' onChange={handleInput} value={student_detailsInput.guardia_address} className="form-control" placeholder="Guardian's Address"></textarea>
                                            <small className='text-danger'>{error_list.guardia_address}</small>
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
                                            <input type="text" name='staff_zone' onChange={handleInput} value={student_detailsInput.staff_zone} className="form-control" placeholder="Office/State/Location" />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input type="text" name='staff_depart' onChange={handleInput} value={student_detailsInput.staff_depart} className="form-control" placeholder="Department (Optional)" />

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>File No.</label>
                                            <input type="text" name='staff_file_no' onChange={handleInput} value={student_detailsInput.staff_file_no} className="form-control" placeholder="File No." />

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Rank</label>
                                            <input type="text" name='staff_rank' onChange={handleInput} value={student_detailsInput.staff_rank} className="form-control" placeholder="Rank (Optional)" />

                                        </div>
                                    </div>
                                </div>
                                {/* /.row */}
                                {/* /.card-body */}
                                <div className="modal-footer">
                                    <Link to="/admin/student"><button className="btn btn-danger">Cancel</button></Link>
                                    <button type='submit' disabled={isLoading} className="btn btn-success">
                                        {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Update
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

export default EditStudent