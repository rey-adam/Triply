import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import axios from 'axios';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    };

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleLogin(event) {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        console.log('====== frontend ======');
        console.log(`email: ${userData.email}`);
        console.log('======================');

        axios.post('/auth/login', userData)
        .then(response => {
            console.log('====== backend ======');
            console.log('post response: login success');
            console.log(response.data);
            console.log('=====================');

            window.localStorage.setItem('token', response.data.token);
            this.props.history.push('/home');
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleRegister(event) {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        console.log('====== frontend ======');
        console.log(`email: ${userData.email}`);
        console.log('======================');

        axios.post('/auth/register', userData)
        .then(response => {
            console.log('====== backend ======');
            console.log('post response: registration success');
            console.log(response.data);
            console.log('=====================');

            this.props.history.push('/');
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        return (
            <div className="login-background">
                {this.props.location.pathname === '/' ?
                    <LoginForm
                        email={this.state.email}
                        password={this.state.password}
                        handleChange={this.handleChange}
                        handleLogin={this.handleLogin}
                    /> : 
                    <RegisterForm
                        email={this.state.email}
                        password={this.state.password}
                        confirmPassword={this.state.confirmPassword}
                        handleChange={this.handleChange}
                        handleRegister={this.handleRegister}
                    />
                }
            </div>
        );
    };
};

export default Login;