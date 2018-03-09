import React, { Component } from 'react';
import './LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="login-form">
                <form>
                    <div id="logo"></div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            placeholder="rangersmith@gmail.com"
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
                            placeholder="**********"
                            id="password"
                            name="password"
                            value={this.props.password}
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <button
                        id="login-btn"
                        type="submit"
                        className="btn btn-info form-control"
                        onClick={this.props.handleSubmit}>
                        Login
                    </button>
                </form>
            </div>
        );
    };
};

export default LoginForm;