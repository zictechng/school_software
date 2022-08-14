import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function GradeClassResult() {
    // create a function to fetch all data here
    const getAllResult = () => {
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
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Class result grading system:</h4>
                        </div>

                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addschool_resumption" data-tip="Trash CA" data-place="bottom">Select Class</button>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> Current Student Grade Scores </h3>
                        </div>

                        <div className="card-body">
                            <div className='text-center'>

                            </div>

                            <table id="example1" className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Admin No.</th>
                                        <th>Name</th>
                                        <th>Year</th>
                                        <th>Term</th>
                                        <th>Class</th>
                                        <th>Total Score</th>
                                        <th>Position</th>
                                        <th>Added By</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Internet Explorer 4.0</td>
                                        <td>Win 95+</td>
                                        <td>4</td>
                                        <td>X</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Internet Explorer 4.0</td>
                                        <td>Win 95+</td>
                                        <td>4</td>
                                        <td>X</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                        <td>Trident</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GradeClassResult;