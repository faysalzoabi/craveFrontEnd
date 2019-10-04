import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store/index';
import { Provider } from 'react-redux';
import { initializeFirebase } from './components/Push-Notification/Push-Notification';
import { askForPermissionToReceiveNotifications } from './components/Push-Notification/Push-Notification';
import LogRocket from 'logrocket';

ReactDOM.render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>, document.getElementById('root')
                );

LogRocket.init('s2rgah/craveuae');
initializeFirebase();             

if(!localStorage.getItem('notification-token')) {
    askForPermissionToReceiveNotifications();
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
