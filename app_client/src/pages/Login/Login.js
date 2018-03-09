import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
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
                <LoginForm
                    email={this.state.email}
                    password={this.state.password}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    };
};

export default Login;