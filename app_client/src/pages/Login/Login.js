import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import axios from 'axios';
import ControlledCarousel from '../../components/Carousel';
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

    // =====================================================================================
    // VALIDATION FUNCTIONS
    // =====================================================================================
    validateEmail = email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    };

    validatePassword = pw => {
        return pw.length > 7;
    };

    validateLoginForm = (email, pw) => {
        return this.validateEmail(email) && this.validatePassword(pw);
    };

    validateRegisterForm = (email, pw, confirm) => {
        return this.validateEmail(email) && this.validatePassword(pw) && (pw === confirm);
    };

    validateZipCode = zc => {
        const re = /^\d{5}$/;
        return re.test(Number(zc));
    };

    isEmptyObj = obj => {
        return Object.keys(obj).length === 0;
    };

    // =====================================================================================
    // HANDLE FUNCTIONS
    // =====================================================================================
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

        // https://stackoverflow.com/questions/285522/find-html-label-associated-with-a-given-input
        // capture all labels into array called labels
        const labels = document.getElementsByTagName('label');
        // for each label
        for (let i = 0; i < labels.length; i++) {
            // if the htmlFor attribute has a value (e.g. <label htmlFor="email"></label>)
            if (labels[i].htmlFor !== '') {
                // assign the associated element with that id (e.g. <input id="email" />) to the variable elem
                const elem = document.getElementById(labels[i].htmlFor);
                if (elem)
                    // then associate that element's label with the current label in the array loop
                    elem.label = labels[i];
            }
        }

        const emailLabel = document.getElementById('email').label;
        const passwordLabel = document.getElementById('password').label;

        // form validation
        // no empty fields
        if (userData.email === '' ||
            userData.password === '') {
            alert('Please fill out all fields');
        } else if (!this.validateLoginForm(userData.email, userData.password)) {
            // validate email
            if (!this.validateEmail(userData.email)) {
                emailLabel.innerHTML = 'Please enter a valid email';
                emailLabel.style['text-transform'] = 'lowercase';
                emailLabel.style['letter-spacing'] = '0.2px';
                emailLabel.style.color = 'red';
            } else {
                emailLabel.innerHTML = 'Email';
                emailLabel.style['text-transform'] = 'uppercase';
                emailLabel.style['letter-spacing'] = '1px';
                emailLabel.style.color = 'rgb(0, 228, 197)';
            }

            // validate password
            if (userData.password.length < 8) {
                passwordLabel.innerHTML = 'Password too short';
                passwordLabel.style['text-transform'] = 'lowercase';
                passwordLabel.style['letter-spacing'] = '0.2px';
                passwordLabel.style.color = 'red';
            } else {
                passwordLabel.innerHTML = 'Password';
                passwordLabel.style['text-transform'] = 'uppercase';
                passwordLabel.style['letter-spacing'] = '1px';
                passwordLabel.style.color = 'rgb(0, 228, 197)';
            }
        } else { // if everything is validated
            emailLabel.innerHTML = 'Email';
            passwordLabel.innerHTML = 'Password';
        
            for (let i = 0; i < labels.length; i++) {
                labels[i].style['letter-spacing'] = '1px';
                labels[i].style['text-transform'] = 'uppercase';
                labels[i].style.color = 'rgb(0, 228, 197)';
            }

            axios.post('/auth/login', userData)
            .then(response => {
                console.log('post response: login success');
                window.localStorage.setItem('token', response.data.token);
                this.props.history.push('/');
            })
            .catch(err => {
                console.error(err.response);
                if (err.response.statusText === 'USER NOT FOUND' || err.response.statusText === 'INCORRECT PASSWORD') {
                    emailLabel.innerHTML = 'Invalid email or password';
                    emailLabel.style['text-transform'] = 'lowercase';
                    emailLabel.style['letter-spacing'] = '0.2px';
                    emailLabel.style.color = 'red';
                    
                    passwordLabel.innerHTML = 'Invalid email or password';
                    passwordLabel.style['text-transform'] = 'lowercase';
                    passwordLabel.style['letter-spacing'] = '0.2px';
                    passwordLabel.style.color = 'red';
                }
            });
        }
    }

    handleRegister(event) {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirm: this.state.confirmPassword
        }

        // https://stackoverflow.com/questions/285522/find-html-label-associated-with-a-given-input
        // capture all labels into array called labels
        const labels = document.getElementsByTagName('label');
        // for each label
        for (let i = 0; i < labels.length; i++) {
            // if the htmlFor attribute has a value (e.g. <label htmlFor="email"></label>)
            if (labels[i].htmlFor !== '') {
                // assign the associated element with that id (e.g. <input id="email" />) to the variable elem
                const elem = document.getElementById(labels[i].htmlFor);
                if (elem)
                    // then associate that element's label with the current label in the array loop
                    elem.label = labels[i];
            }
        }

        const emailLabel = document.getElementById('email').label;
        const passwordLabel = document.getElementById('password').label;
        const confirmLabel = document.getElementById('confirm-password').label;

        // form validation
        // no empty fields
        if (userData.email === '' ||
            userData.password === '' ||
            userData.confirm === '') {
            alert('Please fill out all fields');
        } else if (!this.validateRegisterForm(userData.email, userData.password, userData.confirm)) {
            // validate email
            if (!this.validateEmail(userData.email)) {
                emailLabel.innerHTML = 'Please enter a valid email';
                emailLabel.style['text-transform'] = 'lowercase';
                emailLabel.style['letter-spacing'] = '0.2px';
                emailLabel.style.color = 'red';
            } else {
                emailLabel.innerHTML = 'Email';
                emailLabel.style['text-transform'] = 'uppercase';
                emailLabel.style['letter-spacing'] = '1px';
                emailLabel.style.color = 'rgb(0, 228, 197)';
            }

            // validate password
            if (userData.password.length < 8) {
                passwordLabel.innerHTML = 'Must be at least 8 characters';
                passwordLabel.style['text-transform'] = 'lowercase';
                passwordLabel.style['letter-spacing'] = '0.2px';
                passwordLabel.style.color = 'red';
            } else {
                passwordLabel.innerHTML = 'Password';
                passwordLabel.style['text-transform'] = 'uppercase';
                passwordLabel.style['letter-spacing'] = '1px';
                passwordLabel.style.color = 'rgb(0, 228, 197)';

                // validate password match
                if (userData.password !== userData.confirm) {
                    confirmLabel.innerHTML = 'Passwords do not match';
                    confirmLabel.style['text-transform'] = 'lowercase';
                    confirmLabel.style['letter-spacing'] = '0.2px';
                    confirmLabel.style.color = 'red';
                } else {
                    confirmLabel.innerHTML = 'Confirm Password';
                    confirmLabel.style['text-transform'] = 'uppercase';
                    confirmLabel.style['letter-spacing'] = '1px';
                    confirmLabel.style.color = 'rgb(0, 228, 197)';
                }
            }
        } else { // if everything is validated
            emailLabel.innerHTML = 'Email';
            passwordLabel.innerHTML = 'Password';
            confirmLabel.innerHTML = 'Confirm Password';

            for (let i = 0; i < labels.length; i++) {
                labels[i].style['letter-spacing'] = '1px';
                labels[i].style['text-transform'] = 'uppercase';
                labels[i].style.color = 'rgb(0, 228, 197)';
            }

            axios.post('/auth/register', userData)
            .then(response => {
                console.log('post response: registration success');
                this.props.history.push('/login');
            })
            .catch(err => {
                console.error(err.response);
                if (err.response.statusText === 'USER ALREADY EXISTS') {
                    emailLabel.innerHTML = 'User already exists';
                    emailLabel.style['text-transform'] = 'lowercase';
                    emailLabel.style['letter-spacing'] = '0.2px';
                    emailLabel.style.color = 'red';
                }
            });
        }
    }

    render() {
        return (
            <div className="login-background">
                {this.props.location.pathname === '/login' ?
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
                <ControlledCarousel />
            </div>
        );
    };
};

export default Login;