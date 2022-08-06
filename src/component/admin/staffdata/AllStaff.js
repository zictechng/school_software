import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function AllStaff() {

    document.title = "All Staff | ";
    const [staff_details, setStaffDetails] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(false);

    //const [loading, setLoading] = useState(true);
    // create a function to fetch all data here
    const getAllStaff = (e) => {
        try {
            setIsFetchloading(true);
            // let create the api url here
            axios.get(`/api/fetch_all_staff`).then(res => {
                if (res.data.status === 200) {
                    setStaffDetails(res.data.all_staff);
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
            setIsFetchloading(false);
        }
    }
    useEffect(() => {
        // call the function here
        getAllStaff();
        return () => {

        };
    }, []);

    // delete operation here
    const deleteStaff = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span><span class='sr-only'></span>";
        /* send axios request to delete the record from the database here */
        try {
            axios.delete(`/api/delete_staff/${id}`).then(res => {
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
    // if (loading) {
    //     return (
    //         <div className="card-body">
    //             <div className='text-center'>
    //                 <div className="spinner-border spinner-border-sm text-info" role="status">
    //                 </div> Loading
    //             </div>
    //         </div>
    //     )
    // }

    var table_record = "";
    if (staff_details.length > 0) {
        table_record = <div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Assigned Class</th>
                        <th>Phone No.</th>
                        <th>Sch. Category.</th>
                        <th>Staff ID.</th>
                        <th>Email</th>
                        <th>Reg. Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {staff_details.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.surname} {item.other_name}</td>
                                <td>{item.class_name.class_name}</td>
                                <td>{item.phone}</td>
                                <td>{item.sch_category.sc_name}</td>
                                <td>{item.staff_id}</td>
                                <td>{item.email}</td>
                                <td>{item.reg_date}</td>
                                <td> <span className='badge bg-danger mr-2' type='button'><i onClick={(e) => deleteStaff(e, item.id)} className='fa fa-trash-o text-white'></i></span>
                                    {" "} {" "}
                                    <Link to={`edit-staff/${item.id}`}><span className='badge bg-primary mr-2' type='button'><i className='fa fa-pencil text-white'></i></span></Link>
                                    {" "}
                                    <Link to={`view-staff/${item.id}`}><span className='badge bg-info' type='button'><i className='fa fa-eye text-white'></i></span></Link>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    }
    else if (staff_details.length < 1) {
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
                            <h1 className="m-0">Manage Staff Data</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'>
                                    <Link to='/admin/add-staff'>
                                        <button type="button" className="btn btn-block btn-info btn-sm">Register Staff</button>
                                    </Link>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title">Current staff/teacher details</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className='text-center'>
                                {isfetchLoading && <span className="spinner-border spinner-border-sm mr-1 text-info"></span>}
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

export default AllStaff