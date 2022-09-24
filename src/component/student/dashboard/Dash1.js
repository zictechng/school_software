import React from 'react'

export default function Dash1() {
    return (
        <>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        Some quick example text to build on the card title and
                                        make up the bulk of the card's content.
                                    </p>
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                            </div>
                            <div className="card card-primary card-outline">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        Some quick example text to build on the card title and
                                        make up the bulk of the card's content.
                                    </p>
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col-md-6 */}
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title m-0">Featured</h5>
                                </div>
                                <div className="card-body">
                                    <h6 className="card-title">Special title treatment</h6>
                                    <p className="card-text">
                                        With supporting text below as a natural lead-in to
                                        additional content.
                                    </p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h5 className="card-title m-0">Featured</h5>
                                </div>
                                <div className="card-body">
                                    <h6 className="card-title">Special title treatment</h6>
                                    <p className="card-text">
                                        With supporting text below as a natural lead-in to
                                        additional content.
                                    </p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        {/* /.col-md-6 */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </div>
        </>
    )
}
