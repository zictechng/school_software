import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import axios from 'axios';

function AllStudent() {

    document.title = "All Student | " + window.companyName;
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [student_details, setStudentDetails] = useState([]);

    const [is_loading, setIsLoading] = useState(false);

    // create a function to fetch all data here
    const getAllStudent = (PageNumber = 1) => {
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/fetch_all_student?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setStudentDetails(res.data.student_record);
                    // console.log(res.data.student_record);
                    setIsLoading(false);
                }
                // No record found at the moment
                else if (res.data.status === 404) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                // login required
                else if (res.data.status === 401) {
                    toast.error(res.data.message, { theme: 'colored' });
                }
                else {
                    toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
                }
                setIsFetchloading(false);
                setIsLoading(false);
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsFetchloading(false);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        // call the function here
        getAllStudent();
        return () => {

        };
    }, []);

    // delete operation here
    const deleteStudent = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/delete_student/${id}`).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, { theme: 'colored' });
                    thisClicked.closest("tr").remove();
                }
                else if (res.data.status === 402) {
                    toast.warning(res.data.message, { theme: 'colored' });
                    thisClicked.innerHTML = "<i className='fa fa-trash-o'></i>";
                }
            })
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error occurred! Try again. ".error, { theme: 'colored' });

        }
    }
    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = student_details
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
    table_record = <div>
        <table id="example1" className="table table-bordered table-striped">
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
                {student_details.data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + from}</td>
                            <td>{item.surname} {item.other_name}</td>
                            <td>{item.class_name.class_name}</td>
                            <td>{item.guardia_number}</td>
                            <td>{item.dob}</td>
                            <td>{item.st_admin_number}</td>
                            <td>{item.reg_date}</td>
                            <td> <span onClick={(e) => deleteStudent(e, item.id)} className='badge bg-danger mr-2' type='button'><i className='fa fa-trash-o text-white'></i></span>
                                {" "} {" "}
                                <Link to={`edit-student/${item.id}`}><span className='badge bg-primary mr-2' type='button'><i className='fa fa-pencil text-white'></i></span></Link>
                                {" "}
                                <Link to={`view-student/${item.id}`}><span className='badge bg-info' type='button'><i className='fa fa-eye text-white'></i></span></Link>
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
                    onChange={(pageNumber) => getAllStudent(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </ul>
        </nav>
    </div>

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Student Data</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">

                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'><Link to='/admin/add-student'><button type="button" className="btn btn-block btn-info btn-sm">Register Student</button></Link> </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title">Current student details</h3>
                            <div className="d-flex justify-content-between">
                                <p></p>
                                <span className="badge mr-2" type="button">
                                    <input name='title' className='form-control form-control-sm' placeholder='Search...' />
                                </span>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            {is_loading && <div className='overlay text-center'>
                                <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                            </div>}
                            <div className="card table-responsive">
                                {student_details.data.length ? table_record :
                                    <div className='text-center'>
                                        <p>No record at the moment</p>
                                    </div>}
                            </div>

                            {/* {table_record} */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllStudent