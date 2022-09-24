import React from 'react'
import { Link } from 'react-router-dom'

function Forgotpassword() {
    return (
        <>
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <Link to="#" className="h1"><b>Lift </b>Soft</Link>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">You forgot your password? Here you can easily reset a new password.</p>
                            <form method="post">
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Registered Email" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary btn-block">Request new password</button>
                                    </div>

                                </div>
                            </form>
                            <p className="mt-3 mb-1">
                                <Link to="/login">Login</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Forgotpassword;