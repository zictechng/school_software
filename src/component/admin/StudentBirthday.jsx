import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import Pagination from 'react-js-pagination';

function StudentBirthday() {
    document.title = "Birthday List | " + window.companyName;
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [birthday_list, setBirthdayList] = useState([]);
    const [isloading, setIs_Loading] = useState(false);
    const [my_age, setMyAge] = useState([]);
    const date = new Date();
    const dateTime = date.toLocaleTimeString();
    const todayDate = date.toDateString();

    const current = new Date();
    const dateNow = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    var PageNumber = 1;
    // create a function to fetch history here
    const getBirthdayList = (PageNumber) => {
        setIs_Loading(true)
        // let create the api url here
        axios.get(`/api/fetch_birthday_list?page=${PageNumber}`).then(res => {
            if (res.data.status === 200) {
                setBirthdayList(res.data.allbithday_list);
                setMyAge(res.data.my_age);
                setIs_Loading(false);
            }
            //data not found
            else if (res.data.status === 404) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
                setIsFetchloading(false);
            }
            // login required
            else if (res.data.status === 401) {
                toast.error(res.data.message, { position: 'top-center', theme: 'colored' });
            }

            else {
                toast.error("sorry, something went wrong! Try again.", { position: 'top-center', theme: 'colored' });
            }
            setIsFetchloading(false);
            setIs_Loading(false);
        });

    }

    useEffect(() => {
        // call the function here
        getBirthdayList();
        return () => {
        };
    }, []);

    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = birthday_list
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

    /* create veritable to hold the result data */

    var table_record = "";

    // if (birthday_list.length > 0) {
    table_record = <div>
        <table id="example1" className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Sex</th>
                    <th>Birthday</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {birthday_list.data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + from}</td>
                            <td>{item.surname} {item.other_name}</td>
                            <td>{item.class_name.class_name}</td>
                            <td>{item.sex}</td>
                            <td>{item.dob}</td>
                            <td>{item.guardia_number}</td>
                            <td>{item.guardia_email}</td>
                            <td>
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
                    onChange={(pageNumber) => getBirthdayList(pageNumber)}
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
                            <h1 className="m-0">Manage Student Birthday </h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm"><i className='fa fa-home'></i> </button></Link></li>

                            </ol>
                        </div>
                    </div>

                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title">Current birthdays of the month</h3>
                            <div className="d-flex justify-content-between">
                                <p></p>
                                <span className="badge mr-2" type="button">
                                    <input name='title' className='form-control form-control-sm' placeholder='Search...' />
                                </span>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            {isloading && <div className='overlay text-center'>
                                <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                            </div>}
                            <div className="card table-responsive">
                                {birthday_list.data.length ? table_record :
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

export default StudentBirthday;