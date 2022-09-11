import React from 'react';
import { Link } from 'react-router-dom';

function TestCode() {
    const p = {
        color: "#97a3b9",
        marginTop: "10px",
    };
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
            <th style={{ width: 40 }}>Label</th>

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



            <div className="col-12 table-responsive">
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{ width: 10 }}>#</th>
                                <th>Task</th>
                                <th>Progress</th>
                                <th style={{ width: 40 }}>Label</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1.</td>
                                <td>Update software</td>
                                <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar progress-bar-danger" style={{ width: '55%' }} />
                                    </div>
                                </td>
                                <td><span className="badge bg-danger">55%</span></td>
                            </tr>
                            <tr>
                                <td>2.</td>
                                <td>Clean database</td>
                                <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar bg-warning" style={{ width: '70%' }} />
                                    </div>
                                </td>
                                <td><span className="badge bg-warning">70%</span></td>
                            </tr>
                            <tr>
                                <td>3.</td>
                                <td>Cron job running</td>
                                <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-primary" style={{ width: '30%' }} />
                                    </div>
                                </td>
                                <td><span className="badge bg-primary">30%</span></td>
                            </tr>
                            <tr>
                                <td>4.</td>
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



            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Collapsible Accordion</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        {/* we are adding the accordion ID so Bootstrap's collapse plugin detects it */}
                        <div id="accordion">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title w-100">
                                        <a className="d-block w-100" data-toggle="collapse" href="#collapseOne">
                                            Collapsible Group Item #1
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                    <div className="card-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                        3
                                        wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                        laborum
                                        eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                                        nulla
                                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                                        nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer
                                        farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                                        labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h4 className="card-title w-100">
                                        <a className="d-block w-100" data-toggle="collapse" href="#collapseTwo">
                                            Collapsible Group Danger
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseTwo" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                        3
                                        wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                        laborum
                                        eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                                        nulla
                                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                                        nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer
                                        farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                                        labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                            <div className="card card-success">
                                <div className="card-header">
                                    <h4 className="card-title w-100">
                                        <a className="d-block w-100" data-toggle="collapse" href="#collapseThree">
                                            Collapsible Group Success
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseThree" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                        3
                                        wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                        laborum
                                        eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                                        nulla
                                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                                        nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer
                                        farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                                        labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
            </div>

            <div className="row">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-header bg-dark">
                            <h3 className="card-title">Select operational option to proceed</h3>
                        </div>
                        <div className="card-body">
                            <form className="form-horizontal">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Academic Term</label>
                                            <select name='school_term' className='form-control'>

                                            </select>
                                            <small className='text-danger'></small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Academic Session</label>
                                            <select name='school_year' className='form-control'>
                                                {/* <option>Select Session</option>
                                                {
                                                    schoolYears.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.academic_name}</option>
                                                        )
                                                    })
                                                } */}
                                            </select>
                                            <small className='text-danger'></small>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Class</label>
                                            <select name='class' className='form-control'>
                                                <option>Select Class</option>
                                                {/* {
                                                    all_class.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.class_name}</option>
                                                        )
                                                    })
                                                } */}
                                            </select>
                                            <small className='text-danger'></small>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Link to="/admin/index"> <button className="btn btn-danger" data-dismiss="modal">Cancel</button></Link>
                                    <button className="btn btn-success">
                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                        Proceed
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <select name='state' className="form-control select2" onChange={handleInput} value={save_textInput.state} style={{ width: '100%' }}>
                                            <option>Select</option>
                                            <option value='Abia'>Abia</option>
                                            <option value='Adamawa'>Adamawa</option>
                                            <option value='AkwaIbom'>AkwaIbom</option>
                                            <option value='Anambra'>Anambra</option>
                                            <option value='Bauchi'>Bauchi</option>
                                            <option value='Bayelsa'>Bayelsa</option>
                                            <option value='Benue'>Benue</option>
                                            <option value='Borno'>Borno</option>
                                            <option value='CrossRivers'>CrossRivers</option>
                                            <option value='Delta'>Delta</option>
                                            <option value='Ebonyi'>Ebonyi</option>
                                            <option value='Edo'>Edo</option>
                                            <option value='Ekiti'>Ekiti</option>
                                            <option value='Enugu'>Enugu</option>
                                            <option value='Gombe'>Gombe</option>
                                            <option value='Imo'>Imo</option>
                                            <option value='Jigawa'>Jigawa</option>
                                            <option value='Kaduna'>Kaduna</option>
                                            <option value='Kano'>Kano</option>
                                            <option value='Katsina'>Katsina</option>
                                            <option value='Kebbi'>Kebbi</option>
                                            <option value='Kogi'>Kogi</option>
                                            <option value='Kwara'>Kwara</option>
                                            <option value='Lagos'>Lagos</option>
                                            <option value='Nasarawa'>Nasarawa</option>
                                            <option value='Niger'>Niger</option>
                                            <option value='Ogun'>Ogun</option>
                                            <option value='Ondo'>Ondo</option>
                                            <option value='Osun'>Osun</option>
                                            <option value='Oyo'>Oyo</option>
                                            <option value='Plateau'>Plateau</option>
                                            <option value='Rivers'>Rivers</option>
                                            <option value='Sokoto'>Sokoto</option>
                                            <option value='Taraba'>Taraba</option>
                                            <option value='Yobe'>Yobe</option>
                                            <option value='Zamfara'>Zamafara</option>
                                            <option value='Others'>Others</option>
                                        </select> */}


            {/* Loading overlay here.... */}

            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary card-tabs">
                        <div className="card-header p-0 pt-1">
                            <ul className="nav nav-tabs" id="custom-tabs-five-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="custom-tabs-five-overlay-tab" data-toggle="pill" href="#custom-tabs-five-overlay" role="tab" aria-controls="custom-tabs-five-overlay" aria-selected="true">Overlay</a>
                                </li>

                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="custom-tabs-five-tabContent">
                                <div className="tab-pane fade show active" id="custom-tabs-five-overlay" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">
                                    <div className="overlay-wrapper">
                                        <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" />
                                            <div className="text-bold pt-2">Loading...</div>
                                        </div>
                                        <form>
                                            <div className="row">

                                                <div className="col-md-10 offset-md-1">
                                                    <div className="col-6">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <select className="form-control" name='class_name'>
                                                                    <option></option>
                                                                    {/* {all_class.map((item) => {
                                                                        return (
                                                                            <option value={item.id} key={item.id}>{item.class_name}</option>
                                                                        );
                                                                    })} */}
                                                                </select>
                                                                <span className="text-danger">

                                                                </span>

                                                                <div className="input-group-append">
                                                                    <button type="submit" className="btn btn-info">
                                                                        <i className="fa fa-search" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    {/* <div className="form-group">
                                    <div className="input-group input-group-lg">
                                        <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" />
                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-lg btn-default">
                                                <i className="fa fa-search" />
                                            </button>
                                        </div>
                                    </div>
                                </div> */}

                                                    {/* <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Result Type:</label>
                                            <select className="form-control" style={{ width: '100%' }}>
                                                <option>Text only</option>
                                                <option>Images</option>
                                                <option>Video</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <label>Sort Order:</label>
                                            <select className="form-control" style={{ width: '100%' }}>
                                                <option>ASC</option>
                                                <option>DESC</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <label>Order By:</label>
                                            <select className="form-control" style={{ width: '100%' }}>
                                                <option>Title</option>
                                                <option>Date</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> */}

                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                </div>
            </div>


            <form className="form-horizontal">
                <div style={p}>
                    <h4 className="title" id="title">Select file to upload</h4>
                </div>
                <div className="modal-body">
                    <div className='text-center'>
                    </div>
                    <div className="card-body">
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Subject Name</label>
                            <div className="col-sm-12">
                                <input type="file" name='result_file' className="form-control" placeholder="Choose file" />
                            </div>
                        </div>
                        <input type="hidden" name='id_name' className="form-control" placeholder="ID" />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success">
                        Upload
                    </button>
                </div>
            </form>
            {/* Page with tab menu here */}
            <div className="row">
                <div className="col-12 col-sm-6">
                    <div className="card card-primary card-tabs">
                        <div className="card-header p-0 pt-1">
                            <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-one-messages-tab" data-toggle="pill" href="#custom-tabs-one-messages" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">Messages</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-one-settings-tab" data-toggle="pill" href="#custom-tabs-one-settings" role="tab" aria-controls="custom-tabs-one-settings" aria-selected="false">Settings</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="custom-tabs-one-tabContent">
                                <div className="tab-pane fade show active" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada lacus ullamcorper dui molestie, sit amet congue quam finibus. Etiam ultricies nunc non magna feugiat commodo. Etiam odio magna, mollis auctor felis vitae, ullamcorper ornare ligula. Proin pellentesque tincidunt nisi, vitae ullamcorper felis aliquam id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin id orci eu lectus blandit suscipit. Phasellus porta, ante et varius ornare, sem enim sollicitudin eros, at commodo leo est vitae lacus. Etiam ut porta sem. Proin porttitor porta nisl, id tempor risus rhoncus quis. In in quam a nibh cursus pulvinar non consequat neque. Mauris lacus elit, condimentum ac condimentum at, semper vitae lectus. Cras lacinia erat eget sapien porta consectetur.
                                </div>
                                <div className="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                    Mauris tincidunt mi at erat gravida, eget tristique urna bibendum. Mauris pharetra purus ut ligula tempor, et vulputate metus facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sollicitudin, nisi a luctus interdum, nisl ligula placerat mi, quis posuere purus ligula eu lectus. Donec nunc tellus, elementum sit amet ultricies at, posuere nec nunc. Nunc euismod pellentesque diam.
                                </div>
                                <div className="tab-pane fade" id="custom-tabs-one-messages" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
                                    Morbi turpis dolor, vulputate vitae felis non, tincidunt congue mauris. Phasellus volutpat augue id mi placerat mollis. Vivamus faucibus eu massa eget condimentum. Fusce nec hendrerit sem, ac tristique nulla. Integer vestibulum orci odio. Cras nec augue ipsum. Suspendisse ut velit condimentum, mattis urna a, malesuada nunc. Curabitur eleifend facilisis velit finibus tristique. Nam vulputate, eros non luctus efficitur, ipsum odio volutpat massa, sit amet sollicitudin est libero sed ipsum. Nulla lacinia, ex vitae gravida fermentum, lectus ipsum gravida arcu, id fermentum metus arcu vel metus. Curabitur eget sem eu risus tincidunt eleifend ac ornare magna.
                                </div>
                                <div className="tab-pane fade" id="custom-tabs-one-settings" role="tabpanel" aria-labelledby="custom-tabs-one-settings-tab">
                                    Pellentesque vestibulum commodo nibh nec blandit. Maecenas neque magna, iaculis tempus turpis ac, ornare sodales tellus. Mauris eget blandit dolor. Quisque tincidunt venenatis vulputate. Morbi euismod molestie tristique. Vestibulum consectetur dolor a vestibulum pharetra. Donec interdum placerat urna nec pharetra. Etiam eget dapibus orci, eget aliquet urna. Nunc at consequat diam. Nunc et felis ut nisl commodo dignissim. In hac habitasse platea dictumst. Praesent imperdiet accumsan ex sit amet facilisis.
                                </div>
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                </div>
                <div className="col-12 col-sm-6">
                    <div className="card card-primary card-tabs">
                        <div className="card-header p-0 pt-1">
                            <ul className="nav nav-tabs" id="custom-tabs-two-tab" role="tablist">
                                <li className="pt-2 px-3"><h3 className="card-title">Card Title</h3></li>
                                <li className="nav-item">
                                    <a className="nav-link active" id="custom-tabs-two-home-tab" data-toggle="pill" href="#custom-tabs-two-home" role="tab" aria-controls="custom-tabs-two-home" aria-selected="true">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-two-profile-tab" data-toggle="pill" href="#custom-tabs-two-profile" role="tab" aria-controls="custom-tabs-two-profile" aria-selected="false">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-two-messages-tab" data-toggle="pill" href="#custom-tabs-two-messages" role="tab" aria-controls="custom-tabs-two-messages" aria-selected="false">Messages</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-two-settings-tab" data-toggle="pill" href="#custom-tabs-two-settings" role="tab" aria-controls="custom-tabs-two-settings" aria-selected="false">Settings</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="custom-tabs-two-tabContent">
                                <div className="tab-pane fade show active" id="custom-tabs-two-home" role="tabpanel" aria-labelledby="custom-tabs-two-home-tab">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada lacus ullamcorper dui molestie, sit amet congue quam finibus. Etiam ultricies nunc non magna feugiat commodo. Etiam odio magna, mollis auctor felis vitae, ullamcorper ornare ligula. Proin pellentesque tincidunt nisi, vitae ullamcorper felis aliquam id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin id orci eu lectus blandit suscipit. Phasellus porta, ante et varius ornare, sem enim sollicitudin eros, at commodo leo est vitae lacus. Etiam ut porta sem. Proin porttitor porta nisl, id tempor risus rhoncus quis. In in quam a nibh cursus pulvinar non consequat neque. Mauris lacus elit, condimentum ac condimentum at, semper vitae lectus. Cras lacinia erat eget sapien porta consectetur.
                                </div>
                                <div className="tab-pane fade" id="custom-tabs-two-profile" role="tabpanel" aria-labelledby="custom-tabs-two-profile-tab">
                                    Mauris tincidunt mi at erat gravida, eget tristique urna bibendum. Mauris pharetra purus ut ligula tempor, et vulputate metus facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sollicitudin, nisi a luctus interdum, nisl ligula placerat mi, quis posuere purus ligula eu lectus. Donec nunc tellus, elementum sit amet ultricies at, posuere nec nunc. Nunc euismod pellentesque diam.
                                </div>
                                <div className="tab-pane fade" id="custom-tabs-two-messages" role="tabpanel" aria-labelledby="custom-tabs-two-messages-tab">
                                    Morbi turpis dolor, vulputate vitae felis non, tincidunt congue mauris. Phasellus volutpat augue id mi placerat mollis. Vivamus faucibus eu massa eget condimentum. Fusce nec hendrerit sem, ac tristique nulla. Integer vestibulum orci odio. Cras nec augue ipsum. Suspendisse ut velit condimentum, mattis urna a, malesuada nunc. Curabitur eleifend facilisis velit finibus tristique. Nam vulputate, eros non luctus efficitur, ipsum odio volutpat massa, sit amet sollicitudin est libero sed ipsum. Nulla lacinia, ex vitae gravida fermentum, lectus ipsum gravida arcu, id fermentum metus arcu vel metus. Curabitur eget sem eu risus tincidunt eleifend ac ornare magna.
                                </div>
                                <div className="tab-pane fade" id="custom-tabs-two-settings" role="tabpanel" aria-labelledby="custom-tabs-two-settings-tab">
                                    Pellentesque vestibulum commodo nibh nec blandit. Maecenas neque magna, iaculis tempus turpis ac, ornare sodales tellus. Mauris eget blandit dolor. Quisque tincidunt venenatis vulputate. Morbi euismod molestie tristique. Vestibulum consectetur dolor a vestibulum pharetra. Donec interdum placerat urna nec pharetra. Etiam eget dapibus orci, eget aliquet urna. Nunc at consequat diam. Nunc et felis ut nisl commodo dignissim. In hac habitasse platea dictumst. Praesent imperdiet accumsan ex sit amet facilisis.
                                </div>
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                </div>
            </div>



            <div className="invoice p-3 mb-3">
                <div className="row">
                    <div className="col-12">
                        School banner comes here
                    </div>
                </div>
                <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
                        From
                        <address>
                            <strong>Admin, Inc.</strong><br />
                            795 Folsom Ave, Suite 600<br />
                            San Francisco, CA 94107<br />
                            Phone: (804) 123-5432<br />
                            Email: info@almasaeedstudio.com
                        </address>
                    </div>

                    <div className="col-sm-4 invoice-col">
                        To
                        <address>
                            <strong>John Doe</strong><br />
                            795 Folsom Ave, Suite 600<br />
                            San Francisco, CA 94107<br />
                            Phone: (555) 539-1037<br />
                            Email: john.doe@example.com
                        </address>
                    </div>

                    <div className="col-sm-4 invoice-col">
                        <b>Invoice #007612</b><br />
                        <br />
                        <b>Order ID:</b> 4F3S8J<br />
                        <b>Payment Due:</b> 2/22/2014<br />
                        <b>Account:</b> 968-34567
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 table-responsive">
                        <div className="card-body">
                            <table className="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: 10 }}>#</th>
                                        <th>Admin Number</th>
                                        <th>Student Name</th>
                                        <th>CA 1</th>
                                        <th>CA 2</th>
                                        <th>Total CA</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Make</td>
                                        <td>Nice</td>
                                        <td>Good</td>
                                        <td>Fine</td>
                                        <td>Great</td>
                                        <td>Option</td>
                                    </tr>
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
                    {/* accepted payments column */}
                    <div className="col-6">
                        <p className="lead"><b>Key to Rating</b></p>
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
                        <p className="lead"><b>Psychomotor</b></p>
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
                    </div>
                </div>
                <div className="row no-print">
                    <div className="col-12">
                        <small className="">Date: 2/10/2014</small>
                        {/* <a href="#" rel="noopener" target="_blank" className="btn btn-default"><i className="fas fa-print" /> Print</a> */}
                        <button type="button" className="btn btn-secondary float-right" style={{ marginRight: 5 }}>
                            <i className="fas fa-download" /> Generate PDF / Print
                        </button>
                    </div>
                </div>
            </div>



        </>
    )
}

export default TestCode;