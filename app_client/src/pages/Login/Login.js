import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
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
        console.log('=== frontend ===');
        console.log(userData);
        console.log('================');

        this.props.history.push('/home');

        // axios.post('/api/user/Form', userData)
        //     .then(response => {
        //         console.log('=== backend ===');
        //         console.log(response.data);
        //         console.log('===============');
        //         // alert('user successfully logged in');
        //         // window.location = '/home';
        //         this.props.history.push('/home');
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    }

    handleRegister(event) {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        console.log('=== frontend ===');
        console.log(userData);
        console.log('================');

        this.props.history.push('/home');

        // axios.post('/api/user/Form', userData)
        //     .then(response => {
        //         console.log('=== backend ===');
        //         console.log(response.data);
        //         console.log('===============');
        //         // alert('user successfully logged in');
        //         // window.location = '/home';
        //         this.props.history.push('/home');
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
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