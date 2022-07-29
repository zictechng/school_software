import React from 'react';
import { Link } from 'react-router-dom';
import Dash1 from './Dash1'
import Dash2 from './Dash2';

function Dashboardpage() {
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <l><span className="badge badge-danger mr-3"> Last Login: 20/06/2022 | IP: 192.0.987.07</span></l>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-info btn-sm">Student Portal</button></li>
                                <li className='mr-3'><button type="button" className="btn btn-block btn-dark btn-sm">Visit Website</button></li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <Dash1 />
            <Dash2 />
        </>
    )
}
export default Dashboardpage;
