import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Route } from 'react-router';
import { Login } from './components/Login';
import { LoginToSystem } from './components/LoginToSystem';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <div>
            <Route exact path='/' component={Login} />
            <Route path='/homee' component={LoginToSystem} />
        </div>
    </BrowserRouter>,
    rootElement);

registerServiceWorker();

