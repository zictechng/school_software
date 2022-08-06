import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function EnterResult() {

    const recordId = localStorage.getItem('Tid');
    console.log(recordId);

    const [result_details, setResultDetails] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [fetchLoading, setFetchloading] = useState(true);

    const [get_details, setGetDetails] = useState([]);
    const [get_start_details, setGetStartDetails] = useState([]);
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
    // create a function to fetch class data here
    const getAllStaff = (e) => {
        const id = localStorage.getItem('Tid');
        try {

            // let create the api url here
            axios.get(`/api/get_result_process/${id}`).then(res => {
                if (res.data.status === 200) {
                    setGetDetails(res.data.all_details.student_result);
                    setGetStartDetails(res.data.all_details.start_item);
                    console.log(res.data.all_details);

                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                //setLoading(false);
            });
            setFetchloading(false);
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });

        }
    }
    useEffect(() => {
        // call the function here
        getAllStaff();
        return () => {
        };
    }, []);

    var table_record = "";
    if (get_details.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped table-responsive">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TID</th>
                        <th>CA 1 Score</th>
                        <th>CA 2 Score</th>
                        <th>Exam Score</th>
                        <th>Total </th>
                    </tr>
                </thead>
                <tbody>
                    {get_details.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td><input type="text" name='admin_number' value={item.st_admin_number} className="form-control" placeholder="1" /></td>
                                <td><input type="text" name='qty' value={item.school_year} className="form-control" placeholder="1" /></td>
                                <td><input type="text" name='unit_price' value={item.school_term} className="form-control" placeholder="1" /></td>
                                <td><input type="text" name='cost_price' value={item.school_category} className="form-control" placeholder="1" /></td>
                                <td><input type="text" name='selling_price' value="" className="form-control" placeholder="Total" /></td>

                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else {
        table_record = <div className='text-center'>
            <p>No record at the moment</p>
        </div>
    }

    if (fetchLoading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                    </div> Loading
                </div>
            </div>
        )
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
                                <input type="hidden" name='t_code' value={get_start_details.r_tid} className='form-control' />
                                <input type="hidden" name='t_code' value={get_start_details.class} className='form-control' />
                                <div className="row">
                                    <div className="col-sm-4">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Academic Year</label>
                                            <input type="text" name='academic_year' value={get_start_details.school_year} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Academic Term</label>
                                            <input type="text" name='academic_term' value={get_start_details.school_term} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Subject</label>
                                            <input type="text" value={get_start_details.subject} name='subject' className='form-control' />
                                        </div>
                                    </div>
                                </div>
                                {table_record}
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

export default EnterResult;