import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Masterpage from "./layouts/adminlayout/Masterpage";
import StaffMasterpage from "./layouts/stafflayout/StaffMasterpage";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Forgotpassword from "./component/auth/Forgotpassword";

import axios from "axios";
import { toast } from 'react-toastify';
import AdminPrivateRoute from './AdminPrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/UserContext';


axios.defaults.withCredentials = true;

//this declared base url globally for the application to access
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['accept'] = 'application-json';
// ends here
//axios.get("http://localhost:8000/Sanctum/csrf-cookie", { withCredentials: true });


/* this for setting token for logged in user to call when logging out */
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
const userID = localStorage.getItem('auth_loggedID');
const token = localStorage.getItem('auth_token');

function App() {

  const history = useHistory();
  const [logged_state, setLoggedState] = useState([]);

  const { loggin_check, loggin_state, user } = useContext(UserContext);
  const [logged_status, setLoggedStatus] = loggin_check;

  const [Authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  // useEffect(() => {
  //   axios.get(`/api/checkingAuthenticated`).then(res => {
  //     if (res.status === 200) {
  //       setAuthenticated(true)
  //     }
  //     else if (res.status === 401) {
  //       history.push("/login");
  //     }
  //     setLoading(false);
  //   });
  //   return () => {
  //     setAuthenticated(false);
  //   }
  // }, []);

  // axios.interceptors.response.use(undefined, function (err) {
  //   if (err.status === 401) {
  //     toast.error("Unauthorized! Access Deny.", err.response.data.message);
  //     history.push("/login");
  //   }
  //   return Promise.reject(err);
  // });
  // if (loading) {
  //   return <div className='text-center'>
  //     <div className="spinner-border spinner-border text-info" role="status">
  //     </div>
  //   </div>

  // }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={Forgotpassword} />
          <Route exact path="/login" component={Login} />

          {/* <PublicRoute path="/" name="Home" />
         <Route path="/403" component={Page403}/>
         <Route path="/404" component={Page404}/> */}

          {/* this will protect the route not to show if user have logged in already */}
          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/admin/index' /> : <Login />}
          </Route>
          <Route path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to='/admin/index' /> : <Register />}
          </Route>
          {/* Ends here  */}
          {/* {
            Authenticated ?
             
              :
              <Redirect to='/login' />
          } */}
          {/* this is admin route goes here and I want to protect the route or any other to protect it is fine */}

          <Route path="/admin" name="Admin" render={(props) => <Masterpage {...props} />} />

          {/* <AdminPrivateRoute path="/admin" name="Admin" /> */}
          <Route path="/staff" name="Staff" render={(props) => <StaffMasterpage {...props} />} />

          {/* Let define another method of routes in reacjs, we are going to 
         have a separate route file to handle all route then call it here. */}

        </Switch>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnFocusLoss
          draggable={true}
          pauseOnHover
        />
      </Router>
    </div>
  );
}

export default App;
