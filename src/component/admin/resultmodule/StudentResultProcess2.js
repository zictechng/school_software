import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

function StudentResultProcess(props) {

    const location = useLocation();

    useEffect(() => {

    }, [location]);

    const recordId = localStorage.getItem('Tid');
    console.log(recordId);


    const [result_details, setResultDetails] = useState([]);

    const [isLoading, setIsloading] = useState(false);

    //decl all variable here
    const [add_resultInput, setAddResultInput] = useState({
        admin_number: '',
        ca_1: '',
        ca_2: '',
        ca_3: '',
        ca_4: '',
        ca_5: '',
        ca_6: '',
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
            admin_number: add_resultInput.admin_number,
            ca_1: add_resultInput.ca_1,
            ca_2: add_resultInput.ca_2,
            ca_3: add_resultInput.ca_3,
            ca_4: add_resultInput.ca_4,
            ca_5: add_resultInput.ca_5,
            ca_6: add_resultInput.ca_6,
        }
        try {
            // let create the api url here
            axios.post(`/api/result_process_save`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.allResultDetails.message, { theme: 'colored' });

                    setAddResultInput({
                        ...add_resultInput,
                        admin_number: '',
                        ca_1: '',
                        ca_2: '',
                        ca_3: '',
                        ca_4: '',
                        ca_5: '',
                        ca_6: '',
                    });
                    e.target.reset();
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
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Enter Record Details</h4>
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
                            <h3 className="card-title">Processing form A details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>

                            </div>

                            <form onSubmit={submitStaff}>
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Record ID</th>
                                            <th>Item Name</th>
                                            <th>Qty</th>
                                            <th>Unit Price.</th>
                                            <th>Purchase Price</th>
                                            <th>Selling Price.</th>
                                            <th>Total</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <input type="text" name='admin_number' onChange={handleInput} value={add_resultInput.admin_number} className="form-control" placeholder="1" />
                                            </td>
                                            <td><input type="text" name='ca_1' onChange={handleInput} value={add_resultInput.ca_1} className="form-control" placeholder="Item Name" /></td>
                                            <td><input type="text" name='ca_2' onChange={handleInput} value={add_resultInput.ca_2} className="form-control" placeholder="Qty" /></td>
                                            <td><input type="text" name='ca_3' onChange={handleInput} value={add_resultInput.ca_3} className="form-control" placeholder="Unit Price" /></td>
                                            <td><input type="text" name='ca_4' onChange={handleInput} value={add_resultInput.ca_4} className="form-control" placeholder="Purchase Price" /></td>
                                            <td><input type="text" name='ca_5' onChange={handleInput} value={add_resultInput.ca_5} className="form-control" placeholder="Selling Price" /></td>
                                            <td><input type="text" name='ca_6' onChange={handleInput} value={add_resultInput.ca_6} className="form-control" placeholder="Total" /></td>
                                        </tr>
                                        <tr>

                                            <td>2</td>
                                            <td>
                                                <input type="text" name='admin_number' onChange={handleInput} value={add_resultInput.admin_number} className="form-control" placeholder="2" />
                                            </td>
                                            <td><input type="text" name='ca_1' onChange={handleInput} value={add_resultInput.ca_1} className="form-control" placeholder="Item Name" /></td>
                                            <td><input type="text" name='ca_2' onChange={handleInput} value={add_resultInput.ca_2} className="form-control" placeholder="Qty" /></td>
                                            <td><input type="text" name='ca_3' onChange={handleInput} value={add_resultInput.ca_3} className="form-control" placeholder="Unit Price" /></td>
                                            <td><input type="text" name='ca_4' onChange={handleInput} value={add_resultInput.ca_4} className="form-control" placeholder="Purchase Price" /></td>
                                            <td><input type="text" name='ca_5' onChange={handleInput} value={add_resultInput.ca_5} className="form-control" placeholder="Selling Price" /></td>
                                            <td><input type="text" name='ca_6' onChange={handleInput} value={add_resultInput.ca_5} className="form-control" placeholder="Total" /></td>
                                        </tr>

                                        <tr>
                                            <td>3</td>
                                            <td>
                                                <input type="text" name='admin_number' onChange={handleInput} value={add_resultInput.admin_number} className="form-control" placeholder="3" />
                                            </td>
                                            <td><input type="text" name='ca_1' onChange={handleInput} value={add_resultInput.ca_1} className="form-control" placeholder="Item Name" /></td>
                                            <td><input type="text" name='ca_2' onChange={handleInput} value={add_resultInput.ca_2} className="form-control" placeholder="Qty" /></td>
                                            <td><input type="text" name='ca_3' onChange={handleInput} value={add_resultInput.ca_3} className="form-control" placeholder="Unit Price" /></td>
                                            <td><input type="text" name='ca_4' onChange={handleInput} value={add_resultInput.ca_4} className="form-control" placeholder="Purchase Price" /></td>
                                            <td><input type="text" name='ca_5' onChange={handleInput} value={add_resultInput.ca_5} className="form-control" placeholder="Selling Price" /></td>
                                            <td><input type="text" name='ca_6' onChange={handleInput} value={add_resultInput.ca_6} className="form-control" placeholder="Total" /></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>
                                                <input type="text" name='admin_number' onChange={handleInput} value={add_resultInput.admin_number} className="form-control" placeholder="4" />
                                            </td>
                                            <td><input type="text" name='ca_1' onChange={handleInput} value={add_resultInput.ca_1} className="form-control" placeholder="Item Name" /></td>
                                            <td><input type="text" name='ca_2' onChange={handleInput} value={add_resultInput.ca_2} className="form-control" placeholder="Qty" /></td>
                                            <td><input type="text" name='ca_3' onChange={handleInput} value={add_resultInput.ca_3} className="form-control" placeholder="Unit Price" /></td>
                                            <td><input type="text" name='ca_4' onChange={handleInput} value={add_resultInput.ca_4} className="form-control" placeholder="Purchase Price" /></td>
                                            <td><input type="text" name='ca_5' onChange={handleInput} value={add_resultInput.ca_5} className="form-control" placeholder="Selling Price" /></td>
                                            <td><input type="text" name='ca_6' onChange={handleInput} value={add_resultInput.ca_6} className="form-control" placeholder="Total" /></td>
                                        </tr>
                                    </tbody>

                                </table>
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
            </div>
        </>
    )
}

export default StudentResultProcess;