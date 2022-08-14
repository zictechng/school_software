import React from 'react';
import { Link } from 'react-router-dom';

function TestCode() {
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Testing Code:</h4>
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
                        <div className="card-header">
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
            <div className="row">

                {/* /.col */}
                <div className="col-md-6">
                    {/* USERS LIST */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Latest Members</h3>
                            <div className="card-tools">
                                <span className="badge badge-danger">8 New Members</span>
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-0">
                            <ul className="users-list clearfix">
                                <li>
                                    <img src="dist/img/user1-128x128.jpg" alt="User Image" />
                                    <a className="users-list-name" href="#">Alexander Pierce</a>
                                    <span className="users-list-date">Today</span>
                                </li>
                                <li>
                                    <img src="dist/img/user8-128x128.jpg" alt="User Image" />
                                    <a className="users-list-name" href="#">Norman</a>
                                    <span className="users-list-date">Yesterday</span>
                                </li>
                                <li>
                                    <img src="dist/img/user7-128x128.jpg" alt="User Image" />
                                    <a className="users-list-name" href="#">Jane</a>
                                    <span className="users-list-date">12 Jan</span>
                                </li>
                                <li>
                                    <img src="dist/img/user6-128x128.jpg" alt="User Image" />
                                    <a className="users-list-name" href="#">John</a>
                                    <span className="users-list-date">12 Jan</span>
                                </li>
                                <li>
                                    <img src="dist/img/user2-160x160.jpg" alt="User Image" />
                                    <a className="users-list-name" href="#">Alexander</a>
                                    <span className="users-list-date">13 Jan</span>
                                </li>
                                <li>
                                    <img src="dist/img/user5-128x128.jpg" alt="User Image" />
                                    <a className="users-list-name" href="#">Sarah</a>
                                    <span className="users-list-date">14 Jan</span>
                                </li>
                                <li>
                                    <img src="dist/img/user4-128x128.jpg" alt="User Image" />
                                    <a className="users-list-name" href="#">Nora</a>
                                    <span className="users-list-date">15 Jan</span>
                                </li>
                                <li>
                                    <img src="dist/img/user3-128x128.jpg" alt="User Image" />
                                    <a className="users-list-name" href="#">Nadia</a>
                                    <span className="users-list-date">15 Jan</span>
                                </li>
                            </ul>
                            {/* /.users-list */}
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer text-center">
                            <a href="javascript:">View All Users</a>
                        </div>
                        {/* /.card-footer */}
                    </div>
                    {/*/.card */}
                </div>
                {/* /.col */}

            </div>
            {/* Check this link for details display in a fine way */}
            <div className="card-body p-0">
                <table className="table table-sm">

                    <tbody>
                        <tr>

                            <td>Update software</td>
                            <td>
                                <div className="progress progress-xs">
                                    <div className="progress-bar progress-bar-danger" style={{ width: '55%' }} />
                                </div>
                            </td>
                            <td><span className="badge bg-danger">55%</span></td>
                        </tr>
                        <tr>

                            <td>Clean database</td>
                            <td>
                                <div className="progress progress-xs">
                                    <div className="progress-bar bg-warning" style={{ width: '70%' }} />
                                </div>
                            </td>
                            <td><span className="badge bg-warning">70%</span></td>
                        </tr>
                        <tr>

                            <td>Cron job running</td>
                            <td>
                                <div className="progress progress-xs progress-striped active">
                                    <div className="progress-bar bg-primary" style={{ width: '30%' }} />
                                </div>
                            </td>
                            <td><span className="badge bg-primary">30%</span></td>
                        </tr>
                        <tr>

                            <td>Fix and squish bugs</td>
                            <td>
                                <div className="progress progress-xs progress-striped active">
                                    <div className="progress-bar bg-success" style={{ width: '90%' }} />
                                </div>
                            </td>
                            <td><span className="badge bg-success">90%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Vertical Progress Bars Different Sizes</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body text-center">
                            <p>By adding the class <code>.vertical</code> and <code>.progress-sm</code>, <code>.progress-xs</code>
                                or
                                <code>.progress-xxs</code> we achieve:</p>
                            <div className="progress vertical active">
                                <div className="progress-bar bg-primary progress-bar-striped" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{ height: '40%' }}>
                                    <span className="sr-only">40%</span>
                                </div>
                            </div>
                            <div className="progress vertical progress-sm">
                                <div className="progress-bar bg-success" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{ height: '100%' }}>
                                    <span className="sr-only">100%</span>
                                </div>
                            </div>
                            <div className="progress vertical progress-xs">
                                <div className="progress-bar bg-warning progress-bar-striped" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{ height: '60%' }}>
                                    <span className="sr-only">60%</span>
                                </div>
                            </div>
                            <div className="progress vertical progress-xxs">
                                <div className="progress-bar bg-info progress-bar-striped" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{ height: '60%' }}>
                                    <span className="sr-only">60%</span>
                                </div>
                            </div>
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
                {/* /.col (left) */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Vertical Progress bars</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body text-center">
                            <p>By adding the class <code>.vertical</code> we achieve:</p>
                            <div className="progress vertical">
                                <div className="progress-bar bg-success" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{ height: '40%' }}>
                                    <span className="sr-only">40%</span>
                                </div>
                            </div>
                            <div className="progress vertical">
                                <div className="progress-bar bg-info" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{ height: '20%' }}>
                                    <span className="sr-only">20%</span>
                                </div>
                            </div>
                            <div className="progress vertical">
                                <div className="progress-bar bg-warning" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{ height: '60%' }}>
                                    <span className="sr-only">60%</span>
                                </div>
                            </div>
                            <div className="progress vertical">
                                <div className="progress-bar bg-danger" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{ height: '80%' }}>
                                    <span className="sr-only">80%</span>
                                </div>
                            </div>
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
                {/* /.col (right) */}
            </div>

        </>
    )
}

export default TestCode