import React from 'react';
import { Link } from 'react-router-dom';

function RepairClassPosition() {
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Class position management system:</h4>
                        </div>

                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className='mr-3'><Link to='/admin/index'><button type="button" className="btn btn-block btn-dark btn-sm" data-tip="Dashboard" data-place="bottom"><i className='fa fa-home'></i> </button></Link></li>
                                <li className='mr-3'>
                                    <button type="button" className="btn btn-block btn-info btn-sm" data-toggle="modal" data-target="#Addschool_resumption" data-tip="Trash CA" data-place="bottom">Select Class</button>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="card table-responsive">
                        <div className="card-header bg-dark">
                            <h3 className="card-title"> </h3>
                        </div>

                        <div className="card-body">
                            <div className='text-center'>

                            </div>

                            Trash CA Details comes here...

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RepairClassPosition;