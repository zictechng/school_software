import React, { useState, useContext, useEffect } from 'react';
import '../../assets/admin/dist/css/adminlte.css';
import '../../assets/admin/dist/css/adminlte.min.css';

import '../../assets/admin/dist/js/scripts';
import '../../assets/admin/dist/js/adminlte.min';

import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidemenu from './Sidemenu';
import axios from "axios";
import { toast } from 'react-toastify';
import routes from '../../routes/routes';
const token = sessionStorage.getItem('auth_token');
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

export default function Masterpage() {

    const history = useHistory();
    if (!sessionStorage.getItem('auth_token')) {
        history.push("/login");
    }

    const [isLoading, setIsloading] = useState(false);
    const [ifetchLoading, setIfetchLoading] = useState(true);

    const { loggin_check, loggin_state, user } = useContext(UserContext);
    const [logged_status] = loggin_check;
    const [user_loggin_state] = loggin_state;
    const [user_details] = user;

    const [Authenticated, setAuthenticated] = useState(false);
    const [user_authenticated, setUserAuthenticated] = useState([]);
    const [loading, setLoading] = useState(true);

    /* logout function goes here */
    const logoutSubmit = (e) => {
        e.preventDefault();
        setIsloading(true);
        axios.post(`/api/logout`).then(res => {
            /* check if logout is successful and clear all data store */
            if (res.data.status === 200) {
                sessionStorage.removeItem('auth_token');
                sessionStorage.removeItem('auth_loggedID');
                toast.success(res.data.message, { theme: 'colored' });
                document.getElementById("logoutModal").classList.remove("show");
                document.querySelectorAll(".modal-backdrop")
                    .forEach(el => el.classList.remove("modal-backdrop"));
                // history.push('/admin/dashboard');
                history.push('../login');
            }
            else if (res.data.status === 401) {
                toast.error(res.data.message, { theme: 'colored' });
            }
            setIsloading(false);
        });

    }
    useEffect(() => {
        const userID = sessionStorage.getItem("auth_loggedID");
        axios.get(`/api/authenticate_user/${userID}`).then(res => {
            /* check if logout is successful and clear all data store */
            if (res.data.status === 200) {
                setUserAuthenticated(res.data.loggStatus.userCode)

            }
            else if (res.data.status === 404) {
                toast.success(res.data.message);
                // history.push('/admin/dashboard');
                history.push('../login');

            }
            else {
                toast.success("Sorry, error occurred! Try again");
                // history.push('/admin/dashboard');
            }
        });
    }, []);
    return (
        <>
            <div className="wrapper">
                <Header />
                <Sidemenu />
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid">
                            <Switch>
                                {routes.map((route, idx) => {
                                    return (
                                        route.component && (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={(props) => (
                                                    <route.component{...props} />
                                                )}
                                            />
                                        )
                                    )
                                })}
                                <Redirect from='/admin' to="/admin/index" />
                            </Switch>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
            <div className="modal fade" id="logoutModal" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select <b>"Logout"</b> if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button disabled={isLoading} className="btn btn-danger" onClick={logoutSubmit}>
                                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
