import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Pagination from 'react-js-pagination';

function SystemLog() {
    const history = useHistory();
    document.title = "System Log | " + window.companyName;
    const [isfetchLoading, setIsFetchloading] = useState(true);
    const [activities_log, setActivitiesLog] = useState([]);
    const [is_loading, setIsLoading] = useState(false);
    // create a function to fetch all data here
    const getSystemLog = (PageNumber = 1) => {
        setIsLoading(true)
        try {
            // let create the api url here
            axios.get(`/api/fetch_system_log?page=${PageNumber}`).then(res => {
                if (res.data.status === 200) {
                    setActivitiesLog(res.data.all_details);
                    //setActivitiesLog(res.data);
                    // console.log(res.data.all_details)
                    // console.log(activities_log.data);
                    // 
                    setIsLoading(false);
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
        }
    }
    useEffect(() => {
        // call the function here
        getSystemLog();
        return () => {
        };
    }, []);
    // get page properties for pagination
    const { data, current_page, per_page, total, from, to, last_page } = activities_log
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    if (isfetchLoading) {
        return (
            <div className="card-body">
                <div className='text-center'>
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                    </div> Loading
                </div>
            </div>
        )
    }
    var table_record = "";
    {
        table_record = <div>
            <div className="card-header">
                <h3 className="card-title"><span className='text-danger'></span>
                </h3>
                <div className="d-flex justify-content-between">
                    <p></p>
                    <span className="badge bg-danger mr-2" type="button"></span>
                </div>
            </div>
            <table id="example1" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username </th>
                        <th>Action</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {activities_log.data.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + from}</td>
                                <td>{item.m_username}</td>
                                <td>{item.m_action}</td>
                                <td>{item.m_status}</td>
                                <td>{item.m_date}</td>
                                <td><span className="badge bg-info mr-2" type="button"><i className="fa fa-eye text-white"></i></span>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>

            <nav aria-label="Page navigation example">
                {/* <Pagination
                    activePage={current_page}
                    totalItemsCount={total}
                    itemsCountPerPage={per_page}
                    onChange={(pageNumber) => getSystemLog(pageNumber)}
                    renderOnZeroPageCount={null}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                /> */}
                <ul className="pagination justify-content align-items-center mr-3">
                    <span className='mr-2'> </span>
                    <span className='mr-3' style={p}>{current_page} - {to} / {total}</span>
                    <Pagination
                        activePage={current_page}
                        totalItemsCount={total}
                        itemsCountPerPage={per_page}
                        onChange={(pageNumber) => getSystemLog(pageNumber)}
                        renderOnZeroPageCount={null}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </ul>
            </nav>
        </div>
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">System log activities:</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom">
                                    <i className='fa fa-home'></i> </button></Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <p style={p}>
                        Easy way to monitor and view all activities in the system in one place
                    </p>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> Logs activities details </h3>
                        </div>
                        <div className="card-body">
                            {is_loading && <div className='overlay text-center'>
                                <div className="spinner-border spinner-border text-info" role="status">
                                </div>
                            </div>}
                            {/* <div className='text-center'>
                                {is_loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            </div> */}
                            <div className="card table-responsive">
                                {activities_log.data.length ? table_record :
                                    <div className='text-center'>
                                        <p>No record at the moment</p>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SystemLog;