import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SaveMultiple() {

    const [all_class, setAllClass] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [loading, setLoading] = useState(true);

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    //decl all variable here
    const [save_textInput, setSaveTextInput] = useState({

        state: '',
        class_apply: '',
        message: '',
        email_address: '',
        attach_file: '',
        error_list: [],
    });
    // declare input handling function here
    const handleInput = (e) => {
        e.persist();
        setSaveTextInput({ ...save_textInput, [e.target.name]: e.target.value })
    }

    const submitMessage = (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            state: save_textInput.state,
            class_apply: save_textInput.class_apply,
            message: save_textInput.message,
            email_address: save_textInput.email_address,
            attach_file: save_textInput.attach_file,
        }
        console.log(save_textInput.class_apply);
        try {
            // let create the api url here
            axios.post(`/api/save_text`, data).then(res => {

                if (res.data.status === 200) {
                    // successful message
                    toast.success(res.data.message, { theme: 'colored' });
                    setSaveTextInput({
                        ...save_textInput,
                        state: '',
                        class_apply: '',
                        message: '',
                        email_address: '',
                        attach_file: '',
                    });
                    e.target.reset();
                }
                // record already exist
                else if (res.data.status === 402) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // data input required
                else if (res.data.status === 422) {
                    toast.error('Missing Data Required', { theme: 'colored' });
                    setSaveTextInput({ ...save_textInput, error_list: res.data.errors });
                }
                // error record not save
                else if (res.data.status === 500) {
                    toast.warning('Missing Data Required', { position: 'top-center', theme: 'colored' });
                    setSaveTextInput({ ...save_textInput, error_list: res.data.errors });
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
    useEffect(() => {
        axios.get(`/api/fetch_all_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.allDetails.class_details);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div style={style}>
                <div className="spinner-border spinner-border-sm text-info" role="status">
                </div> Loading
            </div>
        )
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Multiple Select Function</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>

                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Select multiple details and save all to database</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>

                            </div>
                            <form onSubmit={submitMessage}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" name='email_address' onChange={handleInput} value={save_textInput.email_address} className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                        <span className='text-danger'>{save_textInput.error_list.email_address}</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">State</label>
                                        <select name='state' className="form-control select2" onChange={handleInput} value={save_textInput.state} style={{ width: '100%' }}>
                                            <option>Select</option>
                                            <option value='Abia'>Abia</option>
                                            <option value='Adamawa'>Adamawa</option>
                                            <option value='AkwaIbom'>AkwaIbom</option>
                                            <option value='Anambra'>Anambra</option>
                                            <option value='Bauchi'>Bauchi</option>
                                            <option value='Bayelsa'>Bayelsa</option>
                                            <option value='Benue'>Benue</option>
                                            <option value='Borno'>Borno</option>
                                            <option value='CrossRivers'>CrossRivers</option>
                                            <option value='Delta'>Delta</option>
                                            <option value='Ebonyi'>Ebonyi</option>
                                            <option value='Edo'>Edo</option>
                                            <option value='Ekiti'>Ekiti</option>
                                            <option value='Enugu'>Enugu</option>
                                            <option value='Gombe'>Gombe</option>
                                            <option value='Imo'>Imo</option>
                                            <option value='Jigawa'>Jigawa</option>
                                            <option value='Kaduna'>Kaduna</option>
                                            <option value='Kano'>Kano</option>
                                            <option value='Katsina'>Katsina</option>
                                            <option value='Kebbi'>Kebbi</option>
                                            <option value='Kogi'>Kogi</option>
                                            <option value='Kwara'>Kwara</option>
                                            <option value='Lagos'>Lagos</option>
                                            <option value='Nasarawa'>Nasarawa</option>
                                            <option value='Niger'>Niger</option>
                                            <option value='Ogun'>Ogun</option>
                                            <option value='Ondo'>Ondo</option>
                                            <option value='Osun'>Osun</option>
                                            <option value='Oyo'>Oyo</option>
                                            <option value='Plateau'>Plateau</option>
                                            <option value='Rivers'>Rivers</option>
                                            <option value='Sokoto'>Sokoto</option>
                                            <option value='Taraba'>Taraba</option>
                                            <option value='Yobe'>Yobe</option>
                                            <option value='Zamfara'>Zamafara</option>
                                            <option value='Others'>Others</option>
                                        </select>
                                        <span className='text-danger'>{save_textInput.error_list.state}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Class</label>
                                        <select name='class_apply' onChange={handleInput} value={save_textInput.class_apply} className="form-control select2">
                                            <option>Select</option>
                                            {
                                                all_class.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.class_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <span className='text-danger'>{save_textInput.error_list.class_apply}</span>
                                    </div>

                                    <div>
                                        <label>Write Message</label>
                                        <textarea name='message' onChange={handleInput} value={save_textInput.message} className="form-control" placeholder="Message Here..."></textarea>
                                        <span className='text-danger'>{save_textInput.error_list.message}</span>
                                    </div>

                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <button type="submit" disabled={isLoading} className="btn btn-primary">
                                        {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Submit
                                    </button>
                                </div>
                            </form>

                            {/* <table id="example1" className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Full Name</th>
                                        <th>Class</th>
                                        <th>Phone No.</th>
                                        <th>DOB</th>
                                        <th>Admin. No.</th>
                                        <th>Reg. Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Win 95+</td>
                                        <td> 4</td>
                                        <td>X</td>
                                        <td>X</td>
                                        <td>X</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Internet
                                            Explorer 5.0
                                        </td>
                                        <td>Win 95+</td>
                                        <td>5</td>
                                        <td>C</td>
                                        <td>X</td>
                                        <td>X</td>
                                        <td></td>
                                    </tr>

                                </tbody>

                            </table> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaveMultiple;