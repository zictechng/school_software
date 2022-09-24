import React, { useState, useContext, useEffect } from 'react';
import '../../assets/admin/dist/css/adminlte.css';
import '../../assets/admin/dist/css/adminlte.min.css';

import { Redirect, Route, Switch } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import routes from '../../routes/routes';
const token = sessionStorage.getItem('auth_token');
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import student_routes from '../../routes/studentRoutes';
import StudentFooter from './StudentFooter';

export default function StudentMasterPage() {

    const history = useHistory();


    const [isLoading, setIsloading] = useState(false);
    return (
        <>

            <div className="layout-top-nav layout-footer-fixed">
                <div className="wrapper">
                    {/* Navbar */}
                    <HeaderBar />
                    <Switch>
                        {student_routes.map((route, idx) => {
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
                        <Redirect from='/student' to="/student/index" />
                    </Switch>
                </div>
                {/* <StudentFooter /> */}
            </div>




        </>
    )
}
