import React from 'react';
import '../../assets/admin/dist/css/adminlte.css';
import '../../assets/admin/dist/css/adminlte.min.css';

import '../../assets/admin/dist/js/scripts';
import '../../assets/admin/dist/js/adminlte.min';

import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidemenu from './Sidemenu';

import routes from '../../routes/routes';

export default function Masterpage() {
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
        </>
    )
}
