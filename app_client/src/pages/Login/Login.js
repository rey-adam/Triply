import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log('=== frontend ===');
        console.log(userData);
        console.log('================');

        this.props.history.push('/home');

        // axios.post('/api/user/login', userData)
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
                                value={this.state.email}
                                onChange={this.handleChange}
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
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <button
                            id="login-btn"
                            type="submit"
                            className="btn btn-info form-control"
                            onClick={this.handleSubmit}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    };
};

export default Login;