import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../LoginForm/LoginForm.css';
import './RegisterForm.css';

class RegisterForm extends Component {
    render() {
        return (
            <div className="form register-form">
                <form>
                    <div id="logo"></div>
                    <div className="form-group">
                        <input
                            autoFocus
                            autoComplete="true"
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            value={this.props.email}
                            onChange={this.props.handleChange}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-group">
                        <input
                            autoComplete="true"
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            value={this.props.password}
                            onChange={this.props.handleChange}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            value={this.props.confirmPassword}
                            onChange={this.props.handleChange}
                        />
                        <label htmlFor="confirm-password">Confirm Password</label>
                    </div>
                    <button
                        type="submit"
                        className="btn login-btn form-control"
                        onClick={this.props.handleRegister}>
                        Register
                    </button>
                    <Link to='/login' className="login-link">Have an account?</Link>
                </form>
            </div>
        );
    };
};

export default RegisterForm;