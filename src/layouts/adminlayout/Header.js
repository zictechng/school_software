import React from 'react'

export default function Header() {
    return (
        <>
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="index3.html" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Contact</a>
                    </li>
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* Navbar Search */}
                    <li className="nav-item">
                        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                            <i className="fas fa-search" />
                        </a>
                        <div className="navbar-search-block">
                            <form className="form-inline">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search" />
                                        </button>
                                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    {/* Messages Dropdown Menu */}

                    {/* Notifications Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="far fa-bell" />
                            <span className="badge badge-warning navbar-badge">15</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">15 Notifications</span>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-envelope mr-2" /> 4 new messages
                                <span className="float-right text-muted text-sm">3 mins</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-users mr-2" /> 8 friend requests
                                <span className="float-right text-muted text-sm">12 hours</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-file mr-2" /> 3 new reports
                                <span className="float-right text-muted text-sm">2 days</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Ken Young

                        </a>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">

                            <img src="/../../../dist/img/user2-160x160.jpg" alt="AdminLTE Logo" className="brand-image img-circle" style={{ opacity: '.8', width: '30px' }} />
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header"><b>User Profile</b></span>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-user mr-2" /> Profile Details
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-cog mr-2" /> Account Setting
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-envelope mr-2" /> 3 new message

                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item dropdown-footer"><i className='fa fa-sign-out mr-2 text-red' ></i> Logout</a>
                        </div>
                    </li>

                </ul>
            </nav>

            {/* /.navbar */}
            {/* <aside className="control-sidebar control-sidebar-dark" style={{ top: 57, display: 'block' }}>
                <div className="p-3 control-sidebar-content os-host os-theme-light os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition os-host-overflow os-host-overflow-y" style={{ height: '100%' }}>
                    <div className="os-resize-observer-host observed">
                        <div className="os-resize-observer" style={{ left: 0, right: 'auto' }}>
                        </div>
                    </div>
                    <div className="os-size-auto-observer observed" style={{ height: 'calc(100% + 1px)', float: 'left' }}>
                        <div className="os-resize-observer">
                        </div>
                    </div>
                    <div className="os-content-glue" style={{ margin: '-16px', width: 249, height: 607 }}>
                    </div>
                    <div className="os-padding">
                        <div className="os-viewport os-viewport-native-scrollbars-invisible" style={{ overflowY: 'scroll' }}>
                            <div className="os-content" style={{ padding: 16, height: '100%', width: '100%' }}>
                                <h5>Users Profile</h5>
                                <hr className="mb-2" />

                                <h6>Profile</h6>

                                <h6>Setting</h6>

                                <h6>Footer Options</h6>
                                <div className="mb-4">
                                    <input type="checkbox" defaultValue={1} defaultChecked="checked" className="mr-1" />
                                    <span>Fixed</span>
                                </div><h6>Small Text Options</h6>

                                <h6>Accent Color Variants</h6>

                                <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
                                    <div className="os-scrollbar-track">
                                        <div className="os-scrollbar-handle" style={{ transform: 'translate(0px)', width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
                                <div className="os-scrollbar-track">
                                    <div className="os-scrollbar-handle" style={{ transform: 'translate(0px)', height: '47.0588%' }}>
                                    </div>
                                </div>
                            </div>
                            <div className="os-scrollbar-corner">
                            </div>
                        </div>
                    </div>
                </div>
            </aside> */}


        </>
    )
}
