
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddResult() {
    const history = useHistory();
    document.title = "Manage Result | ";
    const [result_details, setResultDetails] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);
    const [all_class, setAllClass] = useState([]);
    const [all_subjects, setAllSubjects] = useState([]);
    const [all_category, setCatogory] = useState([]);

    const [fetch_result, setFetchResult] = useState({});

    //const [loading, setLoading] = useState(true);
    const record_id = fetch_result.r_tid;
    //decl all variable here
    const [add_resultInput, setAddResultInput] = useState({
        school_year: '',
        school_term: '',
        class: '',
        subject: '',
        school_category: '',
        error_list: [],
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setAddResultInput({ ...add_resultInput, [e.target.name]: e.target.value })
    }
    const submitStaff = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            school_year: add_resultInput.school_year,
            school_term: add_resultInput.school_term,
            class: add_resultInput.class,
            subject: add_resultInput.subject,
            school_category: add_resultInput.school_category,
        }
        try {
            // let create the api url here
            axios.post(`/api/result_process_start`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.allResultDetails.message, { theme: 'colored' });

                    setFetchResult(res.data.allResultDetails.result_record_details);
                    //console.log(res.data.allResultDetails.result_record_details);

                    //console.log(fetch_result.r_tid);

                    setAddResultInput({
                        ...add_resultInput,
                        school_year: '',
                        school_term: '',
                        class: '',
                        subject: '',
                        school_category: '',

                    });
                    e.target.reset();
                    localStorage.setItem("Tid", res.data.allResultDetails.result_record_details.r_tid);
                    // history.push({
                    //     pathname: '/admin/result-process',
                    //     State: { Detail: res.data.allResultDetails.result_record_details }
                    // });


                    history.push(`/admin/result-process`);
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setAddResultInput({ ...add_resultInput, error_list: res.data.errors });
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setAddResultInput({ ...add_resultInput, error_list: res.data.errors });
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setAddResultInput({ ...add_resultInput, error_list: res.data.errors });
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
    // create a function to fetch all data here
    const getAllResult = (e) => {
        try {
            setIsFetchloading(true);
            // let create the api url here
            axios.get(`/api/fetch_result`).then(res => {
                if (res.data.status === 200) {
                    setResultDetails(res.data.result_record);
                    //console.log(res.data.history_record);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                //setLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }
    }
    useEffect(() => {
        // call the function here
        getAllResult();
        return () => {
        };
    }, []);

    // create a function to fetch school session  data here
    useEffect(() => {
        axios.get(`/api/fetch_school_session`).then(res => {
            if (res.data.status === 200) {
                setSchoolYear(res.data.session_Details);
            }

        });
    }, []);

    // create a function to fetch school term  data here
    useEffect(() => {
        axios.get(`/api/fetch_allterm`).then(res => {
            if (res.data.status === 200) {
                setSchoolTerm(res.data.termrecord);
            }

        });
    }, []);

    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);

                setAllSubjects(res.data.allDetails.subject_details);
                setCatogory(res.data.allDetails.sch_category_details);
            }
        });
    }, []);

    // delete operation here
    const deleteResult = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/delete_staff/${id}`).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: 'colored' });
                    thisClicked.closest("tr").remove();
                }
                else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: 'colored' });
                    thisClicked.innerHTML = "<i className='fa fa-trash-o'></i>";
                }
            })
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, { theme: 'colored' });
        }
    }
    // if (loading) {
    //     return (
    //         <div className="card-body">
    //             <div className='text-center'>
    //                 <div className="spinner-border spinner-border-sm text-info" role="status">
    //                 </div> Loading
    //             </div>
    //         </div>
    //     )
    // }

    var table_record = "";
    if (result_details.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TID</th>
                        <th>Academic Year</th>
                        <th>Academic Term</th>
                        <th>Sch. Category</th>
                        <th>Added By</th>
                        <th>Reg. Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {result_details.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.tid_code}</td>
                                <td>{item.tid_code}</td>
                                <td>{item.sch_term.term_name}</td>
                                <td>{item.phone}</td>
                                <td>{item.sch_category.sc_name}</td>
                                <td>{item.username}</td>
                                <td>{item.reg_date}</td>
                                <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteResult(e, item.id)} className='fa fa-trash-o text-white'></i></span>
                                    {" "} {" "}
                                    <Link to={`edit-staff/${item.id}`}><span className='badge bg-primary mr-2' type='button'><i className='fa fa-pencil text-white'></i></span></Link>
                                    {" "}
                                    <Link to={`view-staff/${item.id}`}><span className='badge bg-info' type='button'><i className='fa fa-eye text-white'></i></span></Link>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (result_details.length < 1) {
        table_record = <div className='text-center'>
            <p>No record at the moment</p>
        </div>
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Manage Result Details</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addschool_resumption">Add Result</button>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Current result details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                                {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1 text-info"></span>}
                            </div>
                            {table_record}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" data-backdrop="false" role="dialog" id="Addschool_resumption" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <form onSubmit={submitStaff} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Select Items to Proceed</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="card-body">
                                    Check {fetch_result.r_tid}
                                    <br />
                                    This might work: {record_id}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Academic Term</label>
                                                <select name='school_term' className='form-control' onChange={handleInput} value={add_resultInput.school_term}>
                                                    <option>Select Term</option>
                                                    {
                                                        schoolTerm.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.term_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{add_resultInput.error_list.school_term}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Academic Session</label>
                                                <select name='school_year' className='form-control' onChange={handleInput} value={add_resultInput.school_year}>
                                                    <option>Select Session</option>
                                                    {
                                                        schoolYears.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{add_resultInput.error_list.school_year}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>School Category</label>
                                                <select name='school_category' className='form-control' onChange={handleInput} value={add_resultInput.school_category}>
                                                    <option>Select Category</option>
                                                    {
                                                        all_category.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.sc_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{add_resultInput.error_list.school_category}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Class</label>
                                                <select name='class' className='form-control' onChange={handleInput} value={add_resultInput.class}>
                                                    <option>Select Class</option>
                                                    {
                                                        all_class.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.class_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{add_resultInput.error_list.class}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Subject</label>
                                                <select name='subject' className='form-control' onChange={handleInput} value={add_resultInput.subject}>
                                                    <option>Select Subject</option>
                                                    {
                                                        all_subjects.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.subject_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{add_resultInput.error_list.subject}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button disabled={isLoading} className="btn btn-success">
                                    {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Proceed
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddResult;