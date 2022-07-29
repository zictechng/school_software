import React from 'react';

function Dash1() {
    return (
        <>

            <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box">
                        <span className="info-box-icon bg-info elevation-1"><i className="fas fa-user" /></span>
                        <div className="info-box-content">
                            <span className="info-box-text">All Student</span>
                            <span className="info-box-number">
                                100
                                <small>%</small>
                            </span>
                        </div>
                        {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box mb-3">
                        <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-users" /></span>
                        <div className="info-box-content">
                            <span className="info-box-text">All Staff</span>
                            <span className="info-box-number">4</span>
                        </div>
                        {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                </div>
                {/* /.col */}
                {/* fix for small devices only */}
                <div className="clearfix hidden-md-up" />
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box mb-3">
                        <span className="info-box-icon bg-success elevation-1"><i className="fas fa-user" /></span>
                        <div className="info-box-content">
                            <span className="info-box-text">Active Student</span>
                            <span className="info-box-number">760</span>
                        </div>
                        {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box mb-3">
                        <span className="info-box-icon bg-success elevation-1"><i className="fas fa-users" /></span>
                        <div className="info-box-content">
                            <span className="info-box-text">Active Staff</span>
                            <span className="info-box-number">2</span>
                        </div>
                        {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                </div>
                {/* /.col */}
            </div>
            <br></br><br></br>
            <div className="row">
                <div className="col-lg-4 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>150</h3>
                            <p>Graduated Student</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-graduation-cap" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-4 col-6">
                    {/* small box */}
                    <div className="small-box bg-default">
                        <div className="inner">
                            <h3>5<sup style={{ fontSize: 20 }}>%</sup></h3>
                            <p>Online Registrations</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-4 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>44</h3>
                            <p>Suspended Account</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-close-circled" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    {/* <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>65</h3>
                            <p>Unique Visitors</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div> */}
                </div>
                {/* ./col */}
            </div>

        </>
    )
}
export default Dash1;
