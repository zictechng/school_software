import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';

window.companyName = "LiftSoft";
window.BASE_URL = "http://localhost:8000/";
//creating IP state

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
