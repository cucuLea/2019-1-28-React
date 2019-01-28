import React, { Component } from 'react';
import '../css/login.css';
export class Login extends Component {

    constructor(props,context) {
        super(props, context);
        this.state = { user: null};
    }

    checkUser() {
        const userName = document.getElementById('userName').value;
        const password = document.getElementById('userPassword').value;
        const user = { userName: userName, password: password };
        fetch('api/Login/CheckUser',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.text())
            .then(data => {
                if ('userExist' == data) {
                    sessionStorage.setItem("user", this.state.user);
                    this.props.history.push('/homee');
                    alert('login sucess');                  
                }
                else {
                    alert('userName or password is not correct!');
                }
            });
    }

    render() {
        let body =  <div>
            <h1>Login</h1>
            <div className="login-form">
                <form>
                    <input className="login-text" type="text" id="userName" className="text" placeholder="username" />
                    <input type="password" id="userPassword" placeholder="password" />
                </form>
                <div className="signin">
                    <input type="submit" value="Login" onClick={() => this.checkUser()} />
                </div>
            </div>
        </div >; 

        return(body);
    }
}
