
import React, { useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import Masterpage from "./layouts/adminlayout/Masterpage";
import axios from "axios";
import { toast } from "react-toastify";
function AdminPrivateRoute({ ...rest }) {

    const history = useHistory();
    // to keep the application more secure we will need to create api call to check if the user
    // actually login from the backend else send to login page.
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    useEffect(() => {
        axios.get(`/api/checkingAuthenticated`).then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false);
        });
        return () => {
            setAuthenticated(false);
        }
    }, []);

    // this will help to send user back to login if status show 401
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            toast.error("Unauthorized! Access Deny.", err.response.data.message);
            history.push('/login');
        }

        return Promise.reject();
    });

    // this loading will help to set the Authenticated value till it is set before it can go off
    // and redirect to the right page.
    if (loading) {
        return <div className='text-center'>
            <div className="spinner-border spinner-border text-info" role="status">
            </div>
        </div>

    }
    // this is admin protected route to keep the app secured for an unauthorized users.
    return (
        <Route {...rest}
            render={({ props, location }) =>
                //localStorage.getItem('auth_token')  this was the first one to keep user out if they didn't login. 
                Authenticated ?
                    (<Masterpage {...props} />) :
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
            }

        />
    );
}

// if some one have access to the localstorage token and it can use it to access your
//application so, we need to check if the user actually login from the backend
// if not redirect to login to protect the application.

export default AdminPrivateRoute;
