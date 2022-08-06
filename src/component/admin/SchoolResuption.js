import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SchoolResuption() {

    document.title = "School Resumption | ";
    const [school_resumption, setSchoolResumption] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [isclassLoading, setIsClassloading] = useState(true);
    const [isfetchLoading, setIsFetchloading] = useState(true);

    const [schoolYears, setSchoolYear] = useState([]);
    const [schoolTerm, setSchoolTerm] = useState([]);

    const [school_resumptionInput, setSchoolResumptionInput] = useState({
        start_date: '',
        close_date: '',
        next_resumption: '',
        school_year: '',
        school_term: '',
        error_list: [],
    });

    const [schoolResumptionEditInput, setSchoolResumptionEdit] = useState({
        start_date: '',
        close_date: '',
        next_resumption: '',
        school_year: '',
        school_term: '',

        id: '',
        id_name: '',
        errors_list: [],
    });

    const handleEdit = (e) => {
        e.persist();
        setSchoolResumptionEdit({ ...schoolResumptionEditInput, [e.target.name]: e.target.value })
    }

    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setSchoolResumptionInput({ ...school_resumptionInput, [e.target.name]: e.target.value })
    }
    // send request to api to save details
    const submitCategory = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            start_date: school_resumptionInput.start_date,
            close_date: school_resumptionInput.close_date,
            next_resumption: school_resumptionInput.next_resumption,
            school_year: school_resumptionInput.school_year,
            school_term: school_resumptionInput.school_term,

        }
        // let create the api url here
        axios.post(`/api/save_resumption`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setSchoolResumptionInput({
                    ...school_resumptionInput,
                    start_date: '',
                    close_date: '',
                    next_resumption: '',
                    school_year: '',
                    school_term: '',
                });

                e.target.reset();
                getSchoolCategory();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { theme: 'colored' });
                setSchoolResumptionInput({ ...school_resumptionInput, error_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred, try again', { position: 'top-center', theme: 'colored' });
                setSchoolResumptionInput({ ...school_resumptionInput, error_list: res.data.errors });
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

    const submitSchoolCategoryUpdate = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            start_date: schoolResumptionEditInput.start_date,
            close_date: schoolResumptionEditInput.close_date,
            next_resumption: schoolResumptionEditInput.next_resumption,
            school_year: schoolResumptionEditInput.school_year,
            school_term: schoolResumptionEditInput.school_term,
            id_name: schoolResumptionEditInput.id,
        }

        // let create the api url here
        axios.post(`/api/update_resumption`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                e.target.reset();
                getSchoolCategory();
            }

            // data input required
            else if (res.data.status === 422) {
                toast.error('Value can not be empty', { theme: 'colored' });
                //setEditsessionInput({ ...schoolResumptionEditInput, errors_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred! Try again', { theme: 'colored' });
                // setEditsessionInput({ ...schoolResumptionEditInput, errors_list: res.data.errors });
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
    const editSchoolCategory = (id) => {
        setIsClassloading(true);
        // let create the api url here
        axios.get(`/api/get_resumption/${id}`).then(res => {
            if (res.data.status === 200) {
                setSchoolResumptionEdit(res.data.sDetails);
                console.log(res.data.sDetails);

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
    const getSchoolCategory = (e) => {
        setIsFetchloading(true);
        // let create the api url here
        axios.get(`/api/fetch_all_resumption`).then(res => {
            if (res.data.status === 200) {
                setSchoolResumption(res.data.resump_record);
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

    useEffect(() => {
        // call the function here
        getSchoolCategory();

        return () => {

        };
    }, []);

    // delete operation here
    const deleteresumption = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        axios.delete(`/api/delete_resumption/${id}`).then(res => {
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
    if (school_resumption.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Start Date</th>
                        <th>Close Date</th>
                        <th>Term</th>
                        <th>Year</th>
                        <th>Next Resumption</th>
                        <th>Added By</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {school_resumption.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.start_date}</td>
                                <td>{item.close_date}</td>
                                <td>{item.schoolyear.academic_name}</td>
                                <td>{item.schoolterm.term_name}</td>
                                <td>{item.next_resumption}</td>
                                <td>{item.added_by}</td>
                                <td>{item.add_date}</td>
                                <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteresumption(e, item.id)} className='fa fa-trash-o text-white'></i></span>
                                    {" "} {" "}
                                    <span className='badge bg-primary' type='button'><i onClick={() => editSchoolCategory(item.id)} className='fa fa-pencil text-white' data-toggle="modal" data-target="#editSchoolCategory_modal"></i></span>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (school_resumption.length < 1) {
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
                            <h1 className="m-0">Manage School Resumption</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addschool_resumption">Create New Resumption</button></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Current academic school resumption details</h3>
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

            <div className="modal fade" data-backdrop="false" role="dialog" id="Addschool_resumption" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <form onSubmit={submitCategory} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Create new school resumption</h4>
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
                                                <label>State Date</label>
                                                <input type="date" name='start_date' onChange={handleInput} value={school_resumptionInput.start_date} className="form-control" placeholder="Start Date" />
                                                <span className='text-danger'>{school_resumptionInput.error_list.start_date}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Closed Date</label>
                                                <input type="date" name='close_date' onChange={handleInput} value={school_resumptionInput.close_date} className="form-control" placeholder="Closing Date" />

                                                <span className='text-danger'>{school_resumptionInput.error_list.close_date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Next Resumption Date</label>
                                                <input type="date" name='next_resumption' onChange={handleInput} value={school_resumptionInput.next_resumption} className="form-control" placeholder="Next Resumption Date" />
                                                <span className='text-danger'>{school_resumptionInput.error_list.next_resumption}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Academic Session</label>
                                                <select name='school_year' onChange={handleInput} value={school_resumptionInput.school_year} className='form-control'>
                                                    <option>Select Category</option>
                                                    {
                                                        schoolYears.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{school_resumptionInput.error_list.school_year}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Academic Term</label>
                                                <select name='school_term' onChange={handleInput} value={school_resumptionInput.school_term} className='form-control'>
                                                    <option>Select Category</option>
                                                    {
                                                        schoolTerm.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.term_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='text-danger'>{school_resumptionInput.error_list.school_term}</span>
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


            <div className="modal fade" data-backdrop="false" role="dialog" id="editSchoolCategory_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <form onSubmit={submitSchoolCategoryUpdate} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Edit school resumption</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className='text-center'>
                                    {isclassLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                </div>
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>State Date</label>
                                                <input type="date" name='start_date' onChange={handleEdit} value={schoolResumptionEditInput.start_date} className="form-control" placeholder="Start Date" />

                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Closed Date</label>
                                                <input type="date" name='close_date' onChange={handleEdit} value={schoolResumptionEditInput.close_date} className="form-control" placeholder="Closing Date" />

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Next Resumption Date</label>
                                                <input type="date" name='next_resumption' onChange={handleEdit} value={schoolResumptionEditInput.next_resumption} className="form-control" placeholder="Next Resumption Date" />

                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Academic Session</label>
                                                <select name='school_year' onChange={handleEdit} value={schoolResumptionEditInput.school_year} className='form-control'>
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

                                    <div className="row">
                                        <div className="col-sm-6">
                                            {/* text input */}
                                            <div className="form-group">
                                                <label>Academic Term</label>
                                                <select name='school_term' onChange={handleEdit} value={schoolResumptionEditInput.school_term} className='form-control'>
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
                                </div>
                            </div>

                            <input type="hidden" name='id_name' onChange={handleInput} value={schoolResumptionEditInput.id} className="form-control" placeholder="ID" />
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

export default SchoolResuption