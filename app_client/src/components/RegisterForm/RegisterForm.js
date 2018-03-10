import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../LoginForm/LoginForm.css';
import './RegisterForm.css';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="form register-form">
                <form>
                    <div id="logo"></div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            autoFocus
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            value={this.props.email}
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            value={this.props.password}
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            value={this.props.confirmPassword}
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn login-btn form-control"
                        onClick={this.props.handleRegister}>
                        Register
                    </button>
                    <Link to='/' className="login-link">Have an account?</Link>
                </form>
            </div>
        );
    };
};

export default RegisterForm;