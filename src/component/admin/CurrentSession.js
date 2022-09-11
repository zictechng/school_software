import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CurrentSession() {
    document.title = "Current Running Session| ";
    const [current_session, setCurrentSession] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [isclassLoading, setIsClassloading] = useState(true);
    const [isfetchLoading, setIsFetchloading] = useState(true);

    const [schoolYears, setSchoolYear] = useState([]);
    //const [schoolTerm, setSchoolTerm] = useState([]);

    const [current_sessionInput, setCurrentSessionInput] = useState({
        current_session: '',
        error_list: [],
    });

    const [editcurrent_sessionInput, seteditCurrent_sessionInput] = useState({
        running_session: '',
        id: '',
        id_name: '',
        errors_list: [],
    });

    const handleEdit = (e) => {
        e.persist();
        seteditCurrent_sessionInput({ ...editcurrent_sessionInput, [e.target.name]: e.target.value })
    }

    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setCurrentSessionInput({ ...current_sessionInput, [e.target.name]: e.target.value })
    }
    // send request to api to save details
    const submitCurrentSession = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            current_session: current_sessionInput.current_session,

        }
        // let create the api url here
        axios.post(`/api/save_session`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setCurrentSessionInput({
                    ...current_sessionInput,
                    current_session: '',
                });
                e.target.reset();
                getAll();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { theme: 'colored' });
                setCurrentSessionInput({ ...current_sessionInput, error_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred, try again', { position: 'top-center', theme: 'colored' });
                setCurrentSessionInput({ ...current_sessionInput, error_list: res.data.errors });
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

    //update academic term record here....

    const submitCurrentUpdate = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            running_session: editcurrent_sessionInput.running_session,
            id: editcurrent_sessionInput.id,
        }
        // let create the api url here
        axios.post(`/api/update_current_session`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                e.target.reset();
                getAll();
            }

            // data input required
            else if (res.data.status === 422) {
                toast.error('Value can not be empty', { theme: 'colored' });
                //setEditsessionInput({ ...editcurrent_sessionInput, errors_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred! Try again', { theme: 'colored' });
                // setEditsessionInput({ ...editcurrent_sessionInput, errors_list: res.data.errors });
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


    // get academic term on button click here 
    const editCurrent_session = (id) => {
        setIsClassloading(true);
        // let create the api url here
        axios.get(`/api/getsession/${id}`).then(res => {
            if (res.data.status === 200) {
                seteditCurrent_sessionInput(res.data.current_Details);

            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { theme: 'colored' });
            }
            setIsClassloading(false);
        });
    }


    // create a function to fetch all data here
    const getAll = (e) => {
        setIsFetchloading(true);
        // let create the api url here
        axios.get(`/api/fetch_all`).then(res => {
            if (res.data.status === 200) {
                setCurrentSession(res.data.c_record);
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
        });
    }
    useEffect(() => {
        // call the function here
        getAll();
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
    // useEffect(() => {
    //     axios.get(`/api/fetch_allterm`).then(res => {
    //         if (res.data.status === 200) {
    //             setSchoolTerm(res.data.termrecord);
    //         }

    //     });
    // }, []);

    // delete operation here
    const delete_current = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        axios.delete(`/api/delete_session/${id}`).then(res => {
            if (res.data.status === 200) {
                toast.success(res.data.message, { theme: 'colored' });
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 402) {
                toast.warning(res.data.message, { theme: 'colored' });
                thisClicked.innerHTML = "<i className='fa fa-trash-o'></i>";
            }
        })
    }

    var table_record = "";
    if (current_session.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Current Session</th>
                        <th>Added By</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {current_session.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.schoolyear.academic_name}</td>
                                <td>{item.session_addedby}</td>
                                <td>{item.session_date}</td>
                                <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => delete_current(e, item.id)} className='fa fa-trash-o text-white'></i></span>
                                    {" "} {" "}
                                    <span className='badge bg-primary' type='button'><i onClick={() => editCurrent_session(item.id)} className='fa fa-pencil text-white' data-toggle="modal" data-target="#editSession_modal"></i></span>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (current_session.length < 1) {
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
                            <h1 className="m-0">Manage Current Session</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addcurrent_session">Add New</button></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Current running session details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                                {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            </div>

                            {table_record}
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade" data-backdrop="false" role="dialog" id="Addcurrent_session" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    {isLoading && <div className='overlay text-center'>
                        <div className="spinner-border spinner-border text-info" role="status">
                        </div>
                    </div>}
                    <div className="modal-content">
                        <form onSubmit={submitCurrentSession} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Create current running session</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-sm-9">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Academic Session</label>
                                                <select name='current_session' onChange={handleInput} value={current_sessionInput.current_session} className='form-control'>
                                                    <option>Select Category</option>
                                                    {
                                                        schoolYears.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{current_sessionInput.error_list.current_session}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button disabled={isLoading} className="btn btn-success">
                                    {/* {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Edit modal goes here... */}

            <div className="modal fade" data-backdrop="false" role="dialog" id="editSession_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    {isLoading && <div className='overlay text-center'>
                        <div className="spinner-border spinner-border text-info" role="status">
                        </div>
                    </div>}
                    <div className="modal-content">
                        <form onSubmit={submitCurrentUpdate} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Edit Details</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="card-body">
                                    <div className='text-center'>
                                        {isclassLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-9">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Current Session</label>
                                                <select name='running_session' onChange={handleEdit} value={editcurrent_sessionInput.running_session} className='form-control'>
                                                    <option>Select Category</option>
                                                    {
                                                        schoolYears.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <input type="hidden" name='id_name' onChange={handleEdit} value={editcurrent_sessionInput.id} className="form-control" placeholder="ID" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button disabled={isLoading} className="btn btn-success">
                                    {/* {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrentSession