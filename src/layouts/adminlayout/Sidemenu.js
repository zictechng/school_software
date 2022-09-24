import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

export default function Sidemenu() {
    const history = useHistory();
    const { loggin_check, schLogo, schBanner } = useContext(UserContext);
    const [banner_school, setBannerSchool] = schBanner;
    const [logo_school] = schLogo;


    // check if user have profile image and show it else, show default one.
    const school_logo = (logo_school.sch_logo !== undefined && logo_school.sch_logo !== null) ?
        (logo_school.uploadedImageLogo ? logo_school.sch_logo : window.BASE_URL + logo_school.sch_logo) : "No Image";

    return (
        <>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/admin/index" className="brand-link">
                    {logo_school.sch_logo !== undefined && logo_school.sch_logo !== null ?
                        <img className="img-account-profile mb-2" src={school_logo} alt="logo" width={80} height={80} style={{ opacity: '.8' }} /> : ""}

                    <span className="brand-text font-weight-light"><strong>{logo_school.sch_name_short}</strong> </span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="/../../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <Link to="#" className="d-block">Alexander Pierce</Link>
                        </div>
                    </div> */}
                    {/* SidebarSearch Form */}

                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li className="nav-item">
                                <Link to="/admin/index" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning"> Data</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link" role="button">
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        Manage Data
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right">5</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/admin/student" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Student</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/add-student" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Student</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/staff" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Staff</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/add-staff" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Staff</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/admin-user" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Admin Users </p>
                                        </Link>
                                    </li>

                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning">Result</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                        Manage Result
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 5</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/admin/result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Result</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/print-result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Print Result</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/view-result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>View Result</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/ca-result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add CA</p>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/admin/manage-upload" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Manage Upload </p>
                                        </Link>
                                    </li>

                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning">Maintenance</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                        Maintenance Result
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 6</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/admin/grade-result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Grade Class Position</p>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Grade Subject Position</p>
                                        </Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link to="/admin/repair-result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Repair Result</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-header"><span className="badge badge-warning"> Result Single Entry</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                        Single Entry
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 2</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/admin/single-result" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Exam Single Result Entry</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/single-ca" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>CA Single Result Entry</p>
                                        </Link>
                                    </li>

                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning"> Setup</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-cog" />
                                    <p>
                                        System Setup
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 8</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/admin/class" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Class</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/subject" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Subject</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/academic-session" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Academic Session</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/term" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Academic Term</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/school-category" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>School Category </p>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/admin/school-resumption" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>School Resumption Date </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/days-open" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Days School Open </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/current-session" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>School Current Session </p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning"> Activities</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        System Activities
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 2</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/admin/system-logs" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>System Log</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>System Users</p>
                                        </Link>
                                    </li>

                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning"> Report</span></li>

                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        System Report
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 2</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Teacher Report</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Lesson Plans </p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-header"><span className="badge badge-warning"> More..</span></li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon far fa-plus-square" />
                                    <p>
                                        Manage Extra
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-danger right"> 10</span>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/admin/manage-promotion" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Manage Promotion</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/graduation" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Manage Graduation</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/attendance" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Manage Attendance</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/result-template" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Print Result Template</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/time-table" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Time Table </p>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/admin/broad-sheet" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Broad Sheet </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/generate-pin" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Generate PIN </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/assign-subject" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Assign Subject to Teacher </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/assign-class" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Assign Class to Teacher </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/psychomotor" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Affective/Psychomotor Domain </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/comments" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Comment</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            {/* <li className="nav-item">
                                <Link to="/admin/save-text" className="nav-link">
                                    <i className="far fa-circle nav-icon" />
                                    <p>Save Text </p>
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                <Link to="/admin/info-setup" className="nav-link">
                                    <i className="nav-icon fas fa-cog" />
                                    <p>
                                        System Info Setup
                                        <i className="fas fa-angle-left right" />

                                    </p>
                                </Link>
                            </li>
                            <hr />
                            <li className="nav-header"><span className="badge badge-info"> Action</span></li>
                            <li className="nav-item">
                                <Link to="#"
                                    data-toggle="modal"
                                    data-target="#logoutModal"
                                    className="nav-link">
                                    <i className="nav-icon ion ion-power text-red" />
                                    <p>
                                        Sign out
                                    </p>
                                </Link>
                            </li>
                            <hr></hr>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">

                                    <p>

                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </>
    )
}
