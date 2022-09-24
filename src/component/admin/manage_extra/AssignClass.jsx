import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Select from "react-select";
import "../../style.css";
import Pagination from 'react-js-pagination';


function AssignClass() {
    const history = useHistory();
    document.title = "Assigned Class | " + window.companyName;
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [assign_class, setGetPins] = useState([]);
    const [list_error, setListError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [is_loading, setIsLoading] = useState(false);
    const [isloading, setIs_Loading] = useState(false);

    const [all_class, setAllClass] = useState([]);
    const [validationErrors, setValidationErrors] = useState(null);

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const [staff_details, setStaffDetails] = useState([]);

    const [formData, setFormData] = useState({
        staff_name: '',

    });
    // auto add new row when click on add button
    const [rows, setRows] = useState([
        {
            class_name: "",
        },
    ]);
    const handleSelectChange = (e, i) => {
        rows[i] = { ...rows[i], class_name: e.target.value };

        setRows([...rows]);
    };

    const addRow = () => {
        const newRow = {
            class_name: "",
        };
        setRows([...rows, newRow]);
    };
    const removeRow = (e, i) => {
        rows.splice(i, 1);

        setRows([...rows]);
    };
    var PageNumber = 1;
    // create a function to fetch all data here
    const getDetailsAssign = () => {
        setIs_Loading(true);
        try {
            // let create the api url here
            axios.get(`/api/get_assign_class?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setGetPins(res.data.resultAll);
                    setIs_Loading(false);
                }
                //data not found
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                    setIs_Loading(false);
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                    setIsFetchloading(false);
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                setIs_Loading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
        }
    }
    useEffect(() => {
        // call the function here
        getDetailsAssign();
        return () => {
        };
    }, []);

    const submitClass = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // let create the api url here
            axios
                .post(`/api/save_assign`, { data: rows, ...formData })
                .then((res) => {
                    if (res.data.status === 200) {
                        setLoading(false);
                        toast.success(res.data.message, {
                            theme: "colored",
                        });
                        setListError([]);
                        //history.push('/admin/ca-result');
                        setShowModal(false);
                        getDetailsAssign()
                    }
                    else if (res.data.status === 403) {
                        toast.error(res.data.message, {
                            theme: "colored",
                        });
                        setLoading(false);
                    }
                    else if (res.data.status === 422) {
                        toast.error('Missing Data Required', { theme: 'colored' });
                        setListError(res.data.errors);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setIsloading(false);
                    setValidationErrors(error.response.data.errors);
                });
        } catch (error) {
            setLoading(false);
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, {
                theme: "colored",
            });
        }
    }
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        setShowModal(true);
    }
    const handleClosegrade = () => {
        setShowModal(false);
    }
    // create a function to fetch class data here
    useEffect(() => {
        axios.get(`/api/fetch_staff_details`).then(res => {
            if (res.data.status === 200) {
                setAllClass(res.data.all_Details.class_details);
                setStaffDetails(res.data.all_Details.staff_details);
            }
            else {
                toast.error("sorry, data missing! Try again.", { theme: 'colored' });
            }
        });
    }, []);
    // CODE FOR SELECT 2
    const staffOptions = [];
    staff_details.map((term) => {
        staffOptions.push({ value: term.id, label: term.surname + ' ' + term.other_name });
    });
    const classOption = [];
    all_class.map((term) => {
        classOption.push({ value: term.id, label: term.class_name });
    });
    function handleSelectInput(stateName, selectedItem) {
        setFormData({ ...formData, [stateName]: selectedItem.value });
    }
    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = assign_class
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
    // if (assign_class.length > 0) {
    table_record = <div>
        <table id="example1" className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Teacher Name</th>
                    <th>Total Subjects</th>
                    <th>Batch ID</th>
                    <th>Added By</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
                {assign_class.data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + from}</td>
                            <td>{item.cls__teacher_name}</td>
                            <td>
                                <Link to={`view-assignclass/${item.id}`}><span className='badge bg-info mr-2' type='button'> {item.total_class}</span></Link>
                                {/* <span className="badge bg-info mr-2" type="button">
                                            {item.total_class}
                                        </span> */}
                            </td>
                            <td>{item.cls__tid}</td>
                            <td>{item.cls__addby}</td>
                            <td>{item.cls__date}</td>
                            <td>
                                <Link to={`view-assignclass/${item.id}`}><span className='badge bg-info mr-2' type='button'><i className='fa fa-eye text-white'></i></span></Link>
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
                    onChange={(pageNumber) => getDetailsAssign(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </ul>
        </nav>
    </div>
    //     </div>
    // }
    // else {
    //     table_record = <div className='text-center'>
    //         <p style={p}> No record at the moment</p>
    //     </div>
    // }
    return (
        <>

            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Manage Assign Class:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-tip="Assign Class" data-place="bottom" onClick={handleModal}>Add Class</button>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        Manage all staff class in one place! Click Add Class to assign class to teacher
                    </p>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> Assigned class details </h3>
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
                                {assign_class.data.length ? table_record :
                                    <div className='text-center'>
                                        <p>No record at the moment</p>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} >
                <Modal.Header style={{ background: '#333234', color: 'white' }}>
                    <Modal.Title>Assign Class to Teacher</Modal.Title>
                </Modal.Header>
                {loading && <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div>}


                {/* <div className='overlay text-center'>
                    <div className="spinner-border spinner-border text-info" role="status">
                    </div>
                </div> */}
                <Modal.Body>
                    <form onSubmit={submitClass} className="form-horizontal">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label>Select Staff</label>
                                    <Select
                                        name="staff_name"
                                        options={staffOptions}
                                        placeholder="Chose Staff Name"
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={false}
                                        isLoading={false}
                                        onChange={(e) => handleSelectInput("staff_name", e)}
                                    />
                                    <small className='text-danger'>{list_error.staff_name}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 table-responsive">

                                <table className="table table-bordered table-sm">
                                    <thead>
                                        <tr>
                                            <th style={{ width: 10 }}>#</th>
                                            <th>Choose Class</th>
                                            <th><span
                                                className="badge bg-primary mr-2"
                                                type="button"
                                                onClick={addRow}
                                            >
                                                <i className="fa fa-plus text-white"></i>
                                            </span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <select
                                                    name="class_name"
                                                    className="form-control"
                                                    onChange={(e) => handleSelectChange(e, i)}
                                                >
                                                    <option>Select</option>
                                                    {all_class.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.class_name}</option>
                                                        );
                                                    })}
                                                </select>
                                                {list_error[`data.${i}.class_name`]
                                                    ? (
                                                        <span className="text-danger">
                                                            {list_error[`data.${i}.class_name`][0]}
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                <td>
                                                    {
                                                        i ? <span className='badge bg-danger mr-2' onClick={(e) => removeRow(e, i)} style={{ cursor: "pointer" }}><i className='fa fa-times text-white'></i></span>
                                                            : null
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* /.col */}
                        </div>
                        <div className="modal-footer">
                            <button disabled={loading} className="btn btn-success">
                                {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Add Class
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <button onClick={handleClosegrade} className="btn btn-danger">Cancel</button>
            </Modal>
        </>
    )
}

export default AssignClass;