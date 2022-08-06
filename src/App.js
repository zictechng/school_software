import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Masterpage from "./layouts/adminlayout/Masterpage";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Forgotpassword from "./component/auth/Forgotpassword";
//import Dashboard from "./component/admin/Dashboard";

import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function App() {
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
          {/* <Route path="/login">
          {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
         </Route>
         <Route path="/register">
          {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
         </Route> */}
          {/* Ends here  */}
          <Route path="/admin" name="Admin" render={(props) => <Masterpage {...props} />} />

          {/* Let define another method of routes in reacjs, we are going to 
         have a separate route file to handle all route then call it here. */}

        </Switch>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>



    </div>
  );
}

export default App;
