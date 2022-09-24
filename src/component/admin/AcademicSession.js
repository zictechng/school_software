import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Pagination from 'react-js-pagination';

function AcademicSession() {
    document.title = "Add Academic Session | " + window.companyName;
    const [academic_detail, setAcademicDetails] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [isclassLoading, setIsClassloading] = useState(true);
    const [isfetchLoading, setIsFetchloading] = useState(true);

    const [isloading, setIs_Loading] = useState(false);

    //const style = { position: "flex", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const [academicInput, setAcademicInput] = useState({
        academic_name: '',
        error_list: [],
    });

    const [editSessionIput, setSessionInput] = useState({
        academic_name: '',
        id: '',
        id_name: '',
        errors_list: [],
    });

    const handleEdit = (e) => {
        e.persist();
        setSessionInput({ ...editSessionIput, [e.target.name]: e.target.value })
    }
    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setAcademicInput({ ...academicInput, [e.target.name]: e.target.value })
    }

    const submitAcademic = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            academic_name: academicInput.academic_name,
        }
        // let create the api url here
        axios.post(`/api/save_academic`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setAcademicInput({
                    ...academicInput,
                    academic_name: '',
                });
                e.target.reset();
                getAcademic_session();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { theme: 'colored' });
                setAcademicInput({ ...academicInput, error_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                setAcademicInput({ ...academicInput, error_list: res.data.errors });
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
    //update academic session record here....

    const submitSessionUpdate = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            academic_name: editSessionIput.academic_name,
            id: editSessionIput.id,
        }

        // let create the api url here
        axios.post(`/api/update_academic_session`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                e.target.reset();
                getAcademic_session();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Value can not be empty', { theme: 'colored' });
                //setEditsessionInput({ ...editSessionIput, errors_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                // setEditsessionInput({ ...editSessionIput, errors_list: res.data.errors });
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
    var PageNumber = 1;
    // create a function to fetch history here
    const getAcademic_session = (PageNumber) => {
        setIs_Loading(true);
        // let create the api url here
        axios.get(`/api/fetch_academic_session?page=${PageNumber}`).then(res => {
            if (res.data.status === 200) {
                setAcademicDetails(res.data.session_record);
                setIs_Loading(false);
            }
            //data not found
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                setIs_Loading(false);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsFetchloading(false);
            setIs_Loading(false);
        });
    }

    // get academic session on button click here 
    const editSession = (id) => {
        setIsClassloading(true);
        // let create the api url here
        axios.get(`/api/get_academic_session/${id}`).then(res => {
            if (res.data.status === 200) {
                setSessionInput(res.data.sessionDetails);

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
    useEffect(() => {
        // call the function here
        getAcademic_session();
        return () => {
        };
    }, []);

    // delete operation here
    const deleteSession = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        axios.delete(`/api/delete_academic/${id}`).then(res => {
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
    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = academic_detail
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (isfetchLoading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>
            </div>
        )
    }
    var table_record = "";
    // if (academic_detail.length > 0) {
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
                {academic_detail.data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + from}</td>
                            <td>{item.academic_name}</td>
                            <td>{item.add_by}</td>
                            <td>{item.a_date}</td>
                            <td> <span onClick={(e) => deleteSession(e, item.id)} className='badge bg-danger mr-2'><i className='fa fa-trash-o text-white' type='button'></i></span>
                                {" "} {" "}
                                <span onClick={() => editSession(item.id)} className='badge bg-primary'><i className='fa fa-pencil text-white' type='button' data-toggle="modal" data-target="#Editsubject_modal"></i></span>
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>

        </table>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content align-items-center mr-3">
                <span className='mr-2'> </span>
                <span className='mr-3' style={p}>{current_page} - {to} / {total}</span>
                <Pagination
                    activePage={current_page}
                    totalItemsCount={total}
                    itemsCountPerPage={per_page}
                    onChange={(pageNumber) => getAcademic_session(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </ul>
        </nav>
    </div>

    // }
    // else {
    //     table_record = <div className='text-center'>
    //         <p>No record at the moment</p>
    //     </div>
    // }
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Academic Session</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#AddSession_modal">Create New Session</button></li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>

                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title">Current academic details</h3>
                            <div className="d-flex justify-content-between">
                                <p></p>
                                <span className="badge mr-2" type="button">
                                    <input name='title' className='form-control form-control-sm' placeholder='Search...' />
                                </span>
                            </div>
                        </div>
                        <div className="card-body">
                            {isloading && <div className='overlay text-center'>
                                <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                            </div>}
                            <div className="card table-responsive">
                                {academic_detail.data.length ? table_record :
                                    <div className='text-center'>
                                        <p>No record at the moment</p>
                                    </div>}
                            </div>
                            {/* {table_record} */}
                        </div>

                    </div>
                    {/* /.card */}
                    {/* /.col */}

                </div>
            </div>

            <div className="modal fade" data-backdrop="false" role="dialog" id="AddSession_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    {isLoading && <div className='overlay text-center'>
                        <div className="spinner-border spinner-border text-info" role="status">
                        </div>
                    </div>}
                    <div className="modal-content">
                        <form onSubmit={submitAcademic} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Create new academic session</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Session Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='academic_name' onChange={handleInput} value={academicInput.academic_name} className="form-control" placeholder="Enter Class Name" />
                                            <span className='text-danger'>{academicInput.error_list.academic_name}</span>
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


            <div className="modal fade" data-backdrop="false" role="dialog" id="Editsubject_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    {isLoading && <div className='overlay text-center'>
                        <div className="spinner-border spinner-border text-info" role="status">
                        </div>
                    </div>}
                    <div className="modal-content">
                        <form onSubmit={submitSessionUpdate} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Edit subject</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Academic Session Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='academic_name' onChange={handleEdit} value={editSessionIput.academic_name} className="form-control" placeholder="Enter Class Name" />
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                                        </div>
                                    </div> */}
                                    <input type="hidden" name='id_name' onChange={handleEdit} value={editSessionIput.id} className="form-control" placeholder="ID" />
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

export default AcademicSession;