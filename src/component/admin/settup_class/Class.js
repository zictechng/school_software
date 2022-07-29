import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Class() {

    document.title = "Add Class | ";
    const [classInput, setClass] = useState({
        class_name: '',
        error_list: [],
    });
    const [isLoading, setIsloading] = useState(false);
    // declear input handling function here
    const handleInput = (e) => {
        e.persist();
        setClass({ ...classInput, [e.target.name]: e.target.value })
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

            }
            // invalid code entered
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
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Class</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><button type="button" className="btn btn-block btn-danger btn-sm">Delete</button></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addclass_modal">Add New Class</button></li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Current class details</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
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
                            <tr>
                                <td>Trident</td>
                                <td>Internet
                                    Explorer 4.0
                                </td>
                                <td>Win 95+</td>
                                <td> 4</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* /.card-body */}
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
                                            <input type="text" name='class_name' onChange={handleInput} value={classInput.coupon_code} className="form-control" placeholder="Enter Class Name" />
                                            <span className='text-danger'>{classInput.error_list.coupon_code}</span>
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
        </>
    )
}

export default Class