import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SchoolopenDays() {

    document.title = "Days School Open | ";
    const [open_days, setOpenDays] = useState([]);
    const [school_category, setSchoolCategory] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [isclassLoading, setIsClassloading] = useState(true);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);

    const [school_openInput, setSchoolopenInput] = useState({
        days_open: '',
        open_term: '',
        open_year: '',
        error_list: [],
    });

    const [editschool_openInput, setEditschool_openInput] = useState({
        days_open: '',
        open_term: '',
        open_year: '',
        id: '',
        id_name: '',
        errors_list: [],
    });

    const handleEdit = (e) => {
        e.persist();
        setEditschool_openInput({ ...editschool_openInput, [e.target.name]: e.target.value })
    }

    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setSchoolopenInput({ ...school_openInput, [e.target.name]: e.target.value })
    }
    // send request to api to save details
    const submitDaysOpen = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            days_open: school_openInput.days_open,
            open_term: school_openInput.open_term,
            open_year: school_openInput.open_year,
        }
        // let create the api url here
        axios.post(`/api/save_days`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setSchoolopenInput({
                    ...school_openInput,
                    days_open: '',
                    open_term: '',
                    open_year: '',
                });
                e.target.reset();
                getAll_days();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { theme: 'colored' });
                setSchoolopenInput({ ...school_openInput, error_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred, try again', { position: 'top-center', theme: 'colored' });
                setSchoolopenInput({ ...school_openInput, error_list: res.data.errors });
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

    const submitOpenUpdate = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            days_open: editschool_openInput.days_open,
            open_term: editschool_openInput.open_term,
            open_year: editschool_openInput.open_year,
            id: editschool_openInput.id,
        }

        // let create the api url here
        axios.post(`/api/update_open_day`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                e.target.reset();
                getAll_days();
            }

            // data input required
            else if (res.data.status === 422) {
                toast.error('Value can not be empty', { theme: 'colored' });
                //setEditsessionInput({ ...editschool_openInput, errors_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred! Try again', { theme: 'colored' });
                // setEditsessionInput({ ...editschool_openInput, errors_list: res.data.errors });
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
    const edit_open_day = (id) => {
        setIsClassloading(true);
        // let create the api url here
        axios.get(`/api/get_numbers_open/${id}`).then(res => {
            if (res.data.status === 200) {
                setEditschool_openInput(res.data.open_Details);

            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsClassloading(false);
        });
    }

    // create a function to fetch all data here
    const getSchoolCategory = (e) => {
        setIsFetchloading(true);
        // let create the api url here
        axios.get(`/api/fetch_all_open`).then(res => {
            if (res.data.status === 200) {
                setSchoolCategory(res.data.category_record);
                console.log(res.data.category_record);
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
        getSchoolCategory();

        return () => {

        };
    }, []);

    // create a function to fetch all term here
    const getAll_days = (e) => {
        setIsloading(true);
        // let create the api url here
        axios.get(`/api/fetch_all`).then(res => {
            if (res.data.status === 200) {
                setOpenDays(res.data.opend_record);
                console.log(res.data.opend_record);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsloading(false);
        });
    }
    useEffect(() => {
        // call the function here
        getAll_days();

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
    // delete operation here
    const deleteOpen_day = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        axios.delete(`/api/delete_open_days/${id}`).then(res => {
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
    if (school_category.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>No. Days</th>
                        <th>Term</th>
                        <th>Year</th>
                        <th>Added By</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {school_category.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.days_open}</td>
                                <td>{item.schoolterm.term_name}</td>
                                <td>{item.schoolyear.academic_name}</td>
                                <td>{item.open_addedby}</td>
                                <td>{item.open_date}</td>
                                <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteOpen_day(e, item.id)} className='fa fa-trash-o text-white'></i></span>
                                    {" "} {" "}
                                    <span className='badge bg-primary' type='button'><i onClick={() => edit_open_day(item.id)} className='fa fa-pencil text-white' data-toggle="modal" data-target="#edit_day_modal"></i></span>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (school_category.length < 1) {
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
                            <h1 className="m-0">Manage Number of Days School Open</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#AddSchool_category">Add Open Days</button></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Current number of days school opened details</h3>
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

            <div className="modal fade" data-backdrop="false" role="dialog" id="AddSchool_category" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">
                        <form onSubmit={submitDaysOpen} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Create new number of days open</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Academic Year</label>
                                                <select name='open_year' onChange={handleInput} value={school_openInput.open_year} className='form-control'>
                                                    <option>Select Category</option>
                                                    {
                                                        schoolYears.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{school_openInput.error_list.open_year}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Academic Term</label>
                                                <select name='open_term' onChange={handleInput} value={school_openInput.open_term} className='form-control'>
                                                    <option>Select Category</option>
                                                    {
                                                        schoolTerm.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.term_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{school_openInput.error_list.open_term}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-9">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Open Days</label>
                                                <input type="text" name='days_open' onChange={handleInput} value={school_openInput.days_open} className="form-control" placeholder="Number of days school opened" />
                                                <span className='text-danger'>{school_openInput.error_list.days_open}</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button disabled={isLoading} className="btn btn-success">
                                    {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Edit modal goes here... */}


            <div className="modal fade" data-backdrop="false" role="dialog" id="edit_day_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">
                        <form onSubmit={submitOpenUpdate} className="form-horizontal">
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
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Academic Year</label>
                                                <select name='open_year' onChange={handleEdit} value={editschool_openInput.open_year} className='form-control'>
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
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Academic Term</label>
                                                <select name='open_term' onChange={handleEdit} value={editschool_openInput.open_term} className='form-control'>
                                                    <option>Select Category</option>
                                                    {
                                                        schoolTerm.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.term_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-9">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Open Days</label>
                                                <input type="text" name='days_open' onChange={handleEdit} value={editschool_openInput.days_open} className="form-control" placeholder="Number of days school opened" />
                                            </div>
                                        </div>
                                    </div>

                                    <input type="hidden" name='id_name' onChange={handleEdit} value={editschool_openInput.id} className="form-control" placeholder="ID" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button disabled={isLoading} className="btn btn-success">
                                    {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
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

export default SchoolopenDays