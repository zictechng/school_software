import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

function Class() {

    document.title = "Add Class | ";
    const [classInput, setClass] = useState({
        class_name: '',
        error_list: [],
    });
    const [isLoading, setIsloading] = useState(false);
    const [iseditoadClass, setIsEditoadClass] = useState(false);
    const [isLoadClass, setIsloadClass] = useState(false);

    const [class_details, setClassdetails] = useState([]);

    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setClass({ ...classInput, [e.target.name]: e.target.value })
    }

    const [editClassIput, setEditClassInput] = useState({
        class_name: '',
        id: '',
        id_name: '',
        errors_list: [],
    });

    // class set variable
    const handleEdit = (e) => {
        e.persist();
        setEditClassInput({ ...editClassIput, [e.target.name]: e.target.value })
    }

    // let create function to send request to save the data via a api url
    const submitClass = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            class_name: classInput.class_name,
        }

        // let create the api url here
        axios.post(`/api/save_class`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { position: 'top-center', theme: 'colored' });
                setClass({
                    ...classInput,
                    class_name: '',
                });
                e.target.reset();
                getClass();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Missing Data Required', { position: 'top-center', theme: 'colored' });
                setClass({ ...classInput, error_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                setClass({ ...classInput, error_list: res.data.errors });
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

    // post to update class details here...
    //update subjects record here....

    const submitClassUpdate = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            class_name: editClassIput.class_name,
            id: editClassIput.id,
        }

        // let create the api url here
        axios.post(`/api/update_class`, data).then(res => {
            if (res.data.status === 200) {
                // successful message
                toast.success(res.data.message, { theme: 'colored' });
                e.target.reset();
                getClass();
            }
            // record already exist
            else if (res.data.status === 402) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            // data input required
            else if (res.data.status === 422) {
                toast.error('Value can not be empty', { theme: 'colored' });
                setEditClassInput({ ...editClassIput, errors_list: res.data.errors });
            }
            // error record not save
            else if (res.data.status === 500) {
                toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                setEditClassInput({ ...editClassIput, errors_list: res.data.errors });
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
    const getClass = (e) => {
        setIsloadClass(true);
        // let create the api url here
        axios.get(`/api/fetch_class_details`).then(res => {
            if (res.data.status === 200) {
                setClassdetails(res.data.class_record);
                setIsloadClass(false);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            // No record found
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                setIsloadClass(false);
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsloadClass(false);
        });
        setIsloadClass(false);
    }

    // get class when edit button is clicked
    const editClass = (id) => {
        setIsEditoadClass(true);
        // let create the api url here
        axios.get(`/api/get_class/${id}`).then(res => {
            if (res.data.status === 200) {
                setEditClassInput(res.data.classDetails);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }
            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsEditoadClass(false);
        });
    }

    useEffect(() => {
        // call the function here
        getClass();

        return () => {

        };
    }, []);

    // delete operation here
    const deleteClass = (e, delete_id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        axios.delete(`/api/delete_class_id/${delete_id}`).then(res => {
            if (res.data.status === 200) {
                toast.success(res.data.message, { theme: 'colored' });
                thisClicked.innerHTML = ""
                getClass();
            }
            else if (res.data.status === 402) {
                toast.warning(res.data.message, { theme: 'colored' });
                thisClicked.innerHTML = "<i className='fa fa-trash-o'></i>";
            }
            setDeleteAllData(false);
        })
    }
    // action activate all modal here...
    const [delete_id, setDeleteID] = useState("");
    const [delete_classData, setDeleteAllData] = useState(false);

    const handleClassClose = () => {
        setDeleteAllData(false)
    }
    const delete_classID = (id) => {
        setDeleteID(id);
        setDeleteAllData(true);
    }
    /* create veriable to hold the result data */

    var table_record = "";
    if (class_details.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Added By</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {class_details.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.class_name}</td>
                                <td>{item.added_by}</td>
                                <td>{item.status}</td>
                                <td>{item.record_date}</td>
                                <td> <span className='badge bg-danger mr-2'><i onClick={(e) => delete_classID(item.id)} className='fa fa-trash-o text-white' type='button'></i></span>
                                    {" "} {" "}
                                    <span className='badge bg-primary'><i onClick={() => editClass(item.id)} className='fa fa-pencil text-white' type='button' data-toggle="modal" data-target="#Editclass_modal"></i></span>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (class_details.length < 1) {
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
                            <h1 className="m-0">Manage Class</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addclass_modal">Create New Class</button></li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Current class details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                                {isLoadClass && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            </div>
                            {table_record}
                        </div>

                    </div>
                </div>
            </div>
            {/* /.card */}

            <div className="modal fade" data-backdrop="false" role="dialog" id="Addclass_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">
                        <form onSubmit={submitClass} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Create new class</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Class Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='class_name' onChange={handleInput} value={classInput.class_name} className="form-control" placeholder="Enter Class Name" />
                                            <span className='text-danger'>{classInput.error_list.class_name}</span>
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

            <div className="modal fade" data-backdrop="false" role="dialog" id="Editclass_modal" aria-labelledby="modal-title">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">
                        <form onSubmit={submitClassUpdate} className="form-horizontal">
                            <div className="modal-header bg-dark">
                                <h4 className="modal-title" id="modal-title">Edit subject</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className='text-center'>
                                    {iseditoadClass && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Class Name</label>
                                        <div className="col-sm-12">
                                            <input type="text" name='class_name' onChange={handleEdit} value={editClassIput.class_name} className="form-control" placeholder="Enter Class Name" />
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                                        </div>
                                    </div> */}
                                    <input type="hidden" name='id_name' onChange={handleEdit} value={editClassIput.id} className="form-control" placeholder="ID" />
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
            <Modal show={delete_classData} >
                <Modal.Header style={{ background: 'orange', color: 'white' }}>
                    <Modal.Title>Caution</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this ?</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClassClose}>
                        Close
                    </Button>
                    <Button variant="info" size="sm" onClick={(e) => deleteClass(e, delete_id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Class