import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import ReactToPrint from "react-to-print";
function ResultPrintPage() {

    document.title = "Student Result Sheet Details | ";
    const componentRef = useRef(null);

    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
    const p2 = {
        color: "#97a3b9",
        marginTop: "2px",
        marginBottom: "2px",
    };
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">

                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h4 className="m-0">Student Result Sheet:</h4>
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
                    {/* <div className="card table-responsive">
                        <div className="card-header">
                            <h3 className="card-title"> </h3>
                        </div>

                        <div className="card-body">
                            <div className='text-center'>

                            </div>

                            Result sheet comes here...

                        </div>

                    </div> */}
                    <p style={p}>
                        A preview of student result sheet details! You can easily generate, preview result sheet details and even print/covert to pdf with easy.
                    </p>
                    <div className="invoice p-3 mb-3" ref={componentRef}>
                        <div className="row">
                            <div className="col-12">
                                School banner comes here
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 table-responsive">
                                <div className="card-body">
                                    <table className="table table-bordered table-sm">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 150 }}>Student Name</th>
                                                <td>Mike Donald</td>
                                                <th>Admin Number</th>
                                                <td>12/09/00</td>
                                                <th>Sex</th>
                                                <td>Male</td>
                                                <th>Age</th>
                                                <td>12</td>
                                                <th>Class</th>
                                                <td>JSS 3A</td>
                                                <th>Picture</th>

                                            </tr>
                                            <tr>
                                                <th>Academic Year</th>
                                                <td>2022/2023</td>
                                                <th>Term</th>
                                                <td>First Term</td>
                                                <th>Position in Class</th>
                                                <td></td>
                                                <th>Grade Total</th>
                                                <td>700</td>
                                                <th>Out of</th>
                                                <td>800</td>
                                            </tr>

                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12 table-responsive">
                                <div className="card-body">
                                    <table className="table table-bordered table-sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Subject</th>
                                                <th>CA1</th>
                                                <th>CA2</th>
                                                <th>CA Total</th>
                                                <th>Exam</th>
                                                <th>Total</th>
                                                <th>Position</th>
                                                <th>Highest</th>
                                                <th>Lowest</th>
                                                <th>Remark</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Call of Duty</td>
                                                <td>455-981-221</td>
                                                <td>El snort</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>

                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Call of Duty</td>
                                                <td>455-981-221</td>
                                                <td>El snort</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                                <td>$64.50</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 table-responsive">
                                <div className="card-body">
                                    <p style={p2}><b>Comments</b></p>
                                    <table className="table table-bordered table-sm">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 200 }}>Teacher Comments</th>
                                                <td>Very good student, always ready to learn</td>
                                            </tr>
                                            <tr>
                                                <th>Principle Comments</th>
                                                <td>Smart student and best in the class, keep it up</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {/* accepted payments column */}
                            <div className="col-6">
                                <p className="lead" style={p2}><b>Key to Rating</b></p>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-sm">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: '50%' }}>Subtotal:</th>
                                                <td>$250.30</td>
                                            </tr>
                                            <tr>
                                                <th>Tax (9.3%)</th>
                                                <td>$10.34</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping:</th>
                                                <td>$5.80</td>
                                            </tr>
                                            <tr>
                                                <th>Total:</th>
                                                <td>$265.24</td>
                                            </tr>
                                        </tbody></table>
                                </div>
                                <p className="text-muted well well-sm shadow-none" style={{ marginTop: 10 }}>
                                    Do you have a wonderful holiday celibration season.
                                </p>
                            </div>

                            <div className="col-6">
                                <p className="lead" style={p2}><b>Psychomotor</b></p>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-sm">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: '50%' }}>Subtotal:</th>
                                                <td>$250.30</td>
                                            </tr>
                                            <tr>
                                                <th>Tax (9.3%)</th>
                                                <td>$10.34</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping:</th>
                                                <td>$5.80</td>
                                            </tr>
                                            <tr>
                                                <th>Total:</th>
                                                <td>$265.24</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <small className="">Date: 2/10/2014</small>
                        <div className="row no-print">
                            <div className="col-12">
                                <ReactToPrint
                                    trigger={() =>
                                        <button type="button" className="btn btn-secondary float-right" style={{ marginRight: 5 }}>
                                            <i className="fas fa-download" /> Generate PDF / Print
                                        </button>
                                    }
                                    content={() => componentRef.current}
                                    documentTile="Student Result Sheet"
                                />
                                {/* <a href="#" rel="noopener" target="_blank" className="btn btn-default"><i className="fas fa-print" /> Print</a> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ResultPrintPage;