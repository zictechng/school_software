import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

function Subjects() {
    document.title = "Add Subject | ";
    const [subject_detail, setSubjectDetails] = useState([]);

    const [isLoading, setIsloading] = useState(false);
    const [isclassLoading, setIsClassloading] = useState(false);
    const [iseditLoading, setIsEditloading] = useState(false);


    const [subjectInput, setSubject] = useState({
        subject_name: '',
        error_list: [],
    });

    const [editSubjectIput, setEditsubjectInput] = useState({
        subject_name: '',
        id: '',
        id_name: '',
        errors_list: [],
    });

    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setSubject({ ...subjectInput, [e.target.name]: e.target.value })
    }

    const handleEdit = (e) => {
        e.persist();
        setEditsubjectInput({ ...editSubjectIput, [e.target.name]: e.target.value })
    }

    const submitSubject = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            subject_name: subjectInput.subject_name,
        }

        // let create the api url here
        axios.post(`/api/save_subject`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                setSubject({
                    ...subjectInput,
                    subject_name: '',
                });
                e.target.reset();
                getSubject();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { theme: 'colored' });
                setSubject({ ...subjectInput, error_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                setSubject({ ...subjectInput, error_list: res.data.errors });
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

    //update subjects record here....

    const submitSubjectUpdate = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            subject_name: editSubjectIput.subject_name,
            id: editSubjectIput.id,
        }

        // let create the api url here
        axios.post(`/api/update_subject`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                e.target.reset();
                getSubject();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Value can not be empty', { theme: 'colored' });
                setEditsubjectInput({ ...editSubjectIput, errors_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                setEditsubjectInput({ ...editSubjectIput, errors_list: res.data.errors });
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

    // create a function to fetch history here
    const getSubject = (e) => {
        setIsClassloading(true);
        // let create the api url here
        axios.get(`/api/fetch_subject`).then(res => {
            if (res.data.status === 200) {
                setSubjectDetails(res.data.subject_record);
                //console.log(res.data.history_record);
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
        getSubject();

        return () => {

        };
    }, []);

    const editSubject = (id) => {
        setIsEditloading(true);
        // let create the api url here
        axios.get(`/api/get_subject/${id}`).then(res => {
            if (res.data.status === 200) {
                setEditsubjectInput(res.data.subject_details);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsEditloading(false);
        });
    }
    // edit function here..
    // const editSubject = (e, id) =>{

    // }

    // delete operation here
    const deleteSubjectDetails = (e, delete_id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/delete_subject_details/${delete_id}`).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: 'colored' });
                }
                else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: 'colored' });
                    thisClicked.innerHTML = "<i className='fa fa-trash-o'></i>";
                }
            });
            setDeleteDetails(false);
            getSubject();
        }
        catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, {
                theme: "colored",
            });
        }
    }
    // delete scratch card modal here
    const [delete_id, setDeleteID] = useState("");
    const [deleteDetails, setDeleteDetails] = useState(false);
    // action modal here...
    const handleDeleteClose = () => {
        setDeleteDetails(false)
    }
    const deleteAction = (delete_id) => {
        setDeleteID(delete_id);
        setDeleteDetails(true);
    }
    /* create veriable to hold the result data */

    var table_record = "";
    if (subject_detail.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subject Name</th>
                        <th>Added By</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {subject_detail.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.subject_name}</td>
                                <td>{item.sub_addedby}</td>
                                <td>{item.sub_status}</td>
                                <td>{item.sub_date}</td>
                                <td> <span className='badge bg-danger mr-2'><i onClick={() => deleteAction(item.id)} className='fa fa-trash-o text-white' type='button'></i></span>
                                    {" "} {" "}
                                    <span className='badge bg-primary'><i onClick={() => editSubject(item.id)} className='fa fa-pencil text-white' type='button' data-toggle="modal" data-target="#Editsubject_modal"></i></span>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (subject_detail.length < 1) {
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
                            <h1 className="m-0">Manage Subject</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addschool_subject">Create New Subject</button></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Current subject details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                                {isclassLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            </div>
                            {table_record}
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade" data-backdrop="false" role="dialog" id="Addschool_subject" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">
                    {isLoading && <div className='overlay text-center'>
                        <div className="spinner-border spinner-border text-info" role="status">
                        </div>
                    </div>}
                    <div className="modal-content">
                        <form onSubmit={submitSubject} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Create new subject</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Subject Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='subject_name' onChange={handleInput} value={subjectInput.subject_name} className="form-control" placeholder="Enter Class Name" />
                                            <span className='text-danger'>{subjectInput.error_list.subject_name}</span>
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
                                    {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
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
                        <form onSubmit={submitSubjectUpdate} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Edit subject</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className='text-center'>
                                    {iseditLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Subject Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='subject_name' onChange={handleEdit} value={editSubjectIput.subject_name} className="form-control" placeholder="Enter Class Name" />
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                                        </div>
                                    </div> */}
                                    <input type="hidden" name='id_name' onChange={handleEdit} value={editSubjectIput.id} className="form-control" placeholder="ID" />
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

            <Modal show={deleteDetails} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this ?</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => deleteSubjectDetails(e, delete_id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Subjects