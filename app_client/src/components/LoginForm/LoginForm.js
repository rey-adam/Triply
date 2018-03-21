import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './LoginForm.css';

class LoginForm extends Component {
    render() {
        return (
            
            <div className="form login-form">
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
                    <button
                        type="submit"
                        className="btn login-btn form-control"
                        onClick={this.props.handleLogin}>
                        Login
                    </button>
                    <Link to='/register' className="link register-link">New user?</Link>
                </form>
                
                
            </div>
        );
    };
};

export default LoginForm;