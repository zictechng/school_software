import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AcademicTerm() {

    document.title = "Add Term | ";
    const [term_detail, setTermDetails] = useState([]);

    const [isLoading, setIsloading] = useState(false);
    const [isclassLoading, setIsClassloading] = useState(false);
    const [isfetchLoading, setIsFetchloading] = useState(false);

    const [termInput, setTermInput] = useState({
        term_name: '',
        error_list: [],
    });

    const [editTermInput, setEditTermInput] = useState({
        term_name: '',
        id: '',
        id_name: '',
        errors_list: [],
    });

    const handleEdit = (e) => {
        e.persist();
        setEditTermInput({ ...editTermInput, [e.target.name]: e.target.value })
    }

    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setTermInput({ ...termInput, [e.target.name]: e.target.value })
    }
    // send request to api to save details
    const submitTerm = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            term_name: termInput.term_name,
        }
        // let create the api url here
        axios.post(`/api/save_term`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setTermInput({
                    ...termInput,
                    term_name: '',
                });
                e.target.reset();
                getAll_Term();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { theme: 'colored' });
                setTermInput({ ...termInput, error_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred, try again', { position: 'top-center', theme: 'colored' });
                setTermInput({ ...termInput, error_list: res.data.errors });
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

    const submitTermUpdate = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            term_name: editTermInput.term_name,
            id: editTermInput.id,
        }

        // let create the api url here
        axios.post(`/api/update_term`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                e.target.reset();
                getAll_Term();
            }

            // data input required
            else if (res.data.status === 422) {
                toast.error('Value can not be empty', { theme: 'colored' });
                //setEditsessionInput({ ...editTermInput, errors_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Error occurred! Try again', { theme: 'colored' });
                // setEditsessionInput({ ...editTermInput, errors_list: res.data.errors });
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
    const editTerm = (id) => {
        setIsClassloading(true);
        // let create the api url here
        axios.get(`/api/get_term/${id}`).then(res => {
            if (res.data.status === 200) {
                setEditTermInput(res.data.termDetails);

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


    // create a function to fetch all term here
    const getAll_Term = (e) => {
        setIsFetchloading(true);
        // let create the api url here
        axios.get(`/api/fetch_all_term`).then(res => {
            if (res.data.status === 200) {

                setTermDetails(res.data.term_record);
                //console.log(res.data.history_record);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsFetchloading(false);
        });
    }
    useEffect(() => {
        // call the function here
        getAll_Term();

        return () => {

        };
    }, []);

    // delete operation here
    const deleteTerm = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        axios.delete(`/api/delete_academic_term/${id}`).then(res => {
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
    if (term_detail.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Academic Session</th>
                        <th>Added By</th>
                        <th>Data</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {term_detail.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.term_name}</td>
                                <td>{item.add_by}</td>
                                <td>{item.t_date}</td>
                                <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteTerm(e, item.id)} className='fa fa-trash-o text-white'></i></span>
                                    {" "} {" "}
                                    <span className='badge bg-primary' type='button'><i onClick={() => editTerm(item.id)} className='fa fa-pencil text-white' data-toggle="modal" data-target="#EditTerm_modal"></i></span>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (term_detail.length < 1) {
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
                            <h1 className="m-0">Manage Academic Term</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#AddTerm_modal">Create New Term</button></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Current academic term details</h3>
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

            <div className="modal fade" data-backdrop="false" role="dialog" id="AddTerm_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    {isLoading && <div className='overlay text-center'>
                        <div className="spinner-border spinner-border text-info" role="status">
                        </div>
                    </div>}
                    <div className="modal-content">
                        <form onSubmit={submitTerm} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Create new academic term</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Term Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='term_name' onChange={handleInput} value={termInput.term_name} className="form-control" placeholder="Enter Term Name" />
                                            <span className='text-danger'>{termInput.error_list.term_name}</span>
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                                        </div>
                                    </div> */}

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


            <div className="modal fade" data-backdrop="false" role="dialog" id="EditTerm_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    {isLoading && <div className='overlay text-center'>
                        <div className="spinner-border spinner-border text-info" role="status">
                        </div>
                    </div>}
                    <div className="modal-content">
                        <form onSubmit={submitTermUpdate} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Edit Term</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className='text-center'>
                                    {isclassLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Academic Session Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='term_name' onChange={handleEdit} value={editTermInput.term_name} className="form-control" placeholder="Enter Term Name" />
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                                        </div>
                                    </div> */}
                                    <input type="hidden" name='id_name' onChange={handleEdit} value={editTermInput.id} className="form-control" placeholder="ID" />
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

export default AcademicTerm