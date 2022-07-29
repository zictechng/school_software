import React from 'react'
import { Link } from 'react-router-dom'

export default function Dash2() {
    return (
        <>
            <br></br>
            <section className="content">
                <div className="container-fluid">
                    {/* Info boxes */}

                    {/* /.row */}

                    {/* /.row */}
                    {/* Main row */}
                    <div className="row">
                        {/* Left col */}
                        <div className="col-md-8">
                            {/* MAP & BOX PANE */}
                            <div className="card">
                                <div className="card-header border-transparent">
                                    <h3 className="card-title">Latest Activities</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>

                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table m-0">
                                            <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Item</th>
                                                    <th>Status</th>
                                                    <th>Popularity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><Link to="#">OR9842</Link></td>
                                                    <td>Call of Duty IV</td>
                                                    <td><span className="badge badge-success">Shipped</span></td>
                                                    <td>
                                                        <div className="sparkbar" data-color="#00a65a" data-height={20}>90,80,90,-70,61,-83,63</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><Link to="#">OR1848</Link></td>
                                                    <td>Samsung Smart TV</td>
                                                    <td><span className="badge badge-warning">Pending</span></td>
                                                    <td>
                                                        <div className="sparkbar" data-color="#f39c12" data-height={20}>90,80,-90,70,61,-83,68</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><Link to="#">OR7429</Link></td>
                                                    <td>iPhone 6 Plus</td>
                                                    <td><span className="badge badge-danger">Delivered</span></td>
                                                    <td>
                                                        <div className="sparkbar" data-color="#f56954" data-height={20}>90,-80,90,70,-61,83,63</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><Link to="#">OR7429</Link></td>
                                                    <td>Samsung Smart TV</td>
                                                    <td><span className="badge badge-info">Processing</span></td>
                                                    <td>
                                                        <div className="sparkbar" data-color="#00c0ef" data-height={20}>90,80,-90,70,-61,83,63</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><Link to="#">OR1848</Link></td>
                                                    <td>Samsung Smart TV</td>
                                                    <td><span className="badge badge-warning">Pending</span></td>
                                                    <td>
                                                        <div className="sparkbar" data-color="#f39c12" data-height={20}>90,80,-90,70,61,-83,68</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><Link to="#">OR7429</Link></td>
                                                    <td>iPhone 6 Plus</td>
                                                    <td><span className="badge badge-danger">Delivered</span></td>
                                                    <td>
                                                        <div className="sparkbar" data-color="#f56954" data-height={20}>90,-80,90,70,-61,83,63</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><Link to="#">OR9842</Link></td>
                                                    <td>Call of Duty IV</td>
                                                    <td><span className="badge badge-success">Shipped</span></td>
                                                    <td>
                                                        <div className="sparkbar" data-color="#00a65a" data-height={20}>90,80,90,-70,61,-83,63</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* /.table-responsive */}
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer clearfix">

                                    <Link to="#" className="btn btn-sm btn-secondary float-right">View All</Link>
                                </div>
                                {/* /.card-footer */}
                            </div>
                            {/* /.card */}

                            {/* /.row */}
                            {/* TABLE: LATEST ORDERS */}

                            {/* /.card */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-4">
                            {/* Info Boxes Style 2 */}
                            <div className="info-box mb-3 bg-info">
                                <span className="info-box-icon"><i className="far fa-envelope" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Messages</span>
                                    <span className="info-box-number">16</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>

                            <div className="info-box mb-3 bg-warning">
                                <span className="info-box-icon"><i className="fas fa-tag" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Inventory</span>
                                    <span className="info-box-number">5,200</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                            <div className="info-box mb-3 bg-success">
                                <span className="info-box-icon"><i className="fa fa-gift"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Birth Day bell</span>
                                    <span className="info-box-number">9</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                            <div className="info-box mb-3 bg-danger">
                                <span className="info-box-icon"><i className="fas fa-cloud-download-alt" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Reports</span>
                                    <span className="info-box-number">114,381</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}

                            {/* /.info-box */}

                            {/* /.card */}
                            {/* PRODUCT LIST */}

                            {/* /.card */}
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>{/*/. container-fluid */}
            </section>

        </>
    )
}
