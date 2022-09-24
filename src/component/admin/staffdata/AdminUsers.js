import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Pagination from 'react-js-pagination';

function AdminUsers() {
    document.title = "All Admin Users | " + window.companyName;
    const [admin_users, setAdminUser] = useState([]);

    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [is_loading, setIsLoading] = useState(false);
    var PageNumber = 1;
    //const [loading, setLoading] = useState(true);
    // create a function to fetch all data here
    const getAllAdmin_Users = (PageNumber) => {
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/fetch_all_admin?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setAdminUser(res.data.adminuser_record);
                    //console.log(res.data.history_record);
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
        getAllAdmin_Users();
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
            axios.delete(`/api/delete_admin/${id}`).then(res => {
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
    const { data, current_page, per_page, total, from, to, last_page } = admin_users
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
    // if (admin_users.length > 0) {
    table_record = <div>
        <table id="example1" className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Phone No.</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Access Level</th>
                    <th>Reg. Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {admin_users.data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + from}</td>
                            <td>{item.surname} {item.other_name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.user_name}</td>
                            <td>{item.access_level}</td>
                            <td>{item.reg_date}</td>
                            <td> <span onClick={(e) => deleteStaff(e, item.id)} className='badge bg-danger mr-2' type='button'><i className='fa fa-trash-o text-white'></i></span>
                                {" "} {" "}
                                <Link to={`edit-admin/${item.id}`}><span className='badge bg-info mr-2' type='button'><i className='fa fa-eye text-white'></i></span></Link>

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
                    onChange={(pageNumber) => getAllAdmin_Users(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </ul>
        </nav>
    </div>
    // }
    // else if (admin_users.length < 1) {
    //     table_record = <div className='text-center'>
    //         <p>No record at the moment</p>
    //     </div>
    // }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Manage Admin Users</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'>
                                    <Link to='/admin/add-admin'>
                                        <button type="button" className="btn btn-block btn-info btn-sm">Register Admin</button>
                                    </Link>
                                </li>
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>

                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title">Current admin users details</h3>
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
                                {admin_users.data.length ? table_record :
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

export default AdminUsers;