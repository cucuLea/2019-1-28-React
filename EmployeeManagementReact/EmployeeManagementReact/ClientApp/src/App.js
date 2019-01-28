import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Employee } from './components/Employee';
import { Counter } from './components/Counter';
import { CreateEmployee } from './components/CreateEmployee';
import { UpdateEmployee } from './components/UpdateEmployee';


export default class App extends Component {
  displayName = App.name

  render() {
      return (   
    <BrowserRouter basename={'/homee'}>
       <Layout>
        <Route exact path='/' component={Employee} />         
        <Route path='/home' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/createEmployee' component={CreateEmployee} />
        <Route path='/updateEmployee' component={UpdateEmployee} />
       </Layout>
    </BrowserRouter>    
      
    );
  }
}
