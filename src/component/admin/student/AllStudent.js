import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AllStudent() {

    document.title = "All Student | ";
    const [student_details, setStudentDetails] = useState([]);


    const [isfetchLoading, setIsFetchloading] = useState(false);


    // create a function to fetch all data here
    const getAllStudent = (e) => {
        try {
            setIsFetchloading(true);
            // let create the api url here
            axios.get(`/api/fetch_all_student`).then(res => {
                if (res.data.status === 200) {
                    setStudentDetails(res.data.student_record);
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
            });
        } catch (error) {
            // Handle the error
            toast.error("sorry, server error! Try again. ".error, { theme: 'colored' });
            setIsFetchloading(false);
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

    var table_record = "";
    if (student_details.length > 0) {
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
                    {student_details.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.surname} {item.other_name}</td>
                                <td>{item.class_name.class_name}</td>
                                <td>{item.guardia_number}</td>
                                <td>{item.dob}</td>
                                <td>{item.st_admin_number}</td>
                                <td>{item.reg_date}</td>
                                <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteStudent(e, item.id)} className='fa fa-trash-o text-white'></i></span>
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
        </div>
    }
    else if (student_details.length < 1) {
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
                        <div className="card-header">
                            <h3 className="card-title">Current student details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                                {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            </div>
                            {table_record}
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

export default AllStudent