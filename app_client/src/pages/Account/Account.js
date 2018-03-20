import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import AccountForm from '../../components/AccountForm';
import './Account.css';

class Account extends Component {
    render() {
        return (
            <div className="account-div">
                <Navbar />
                <AccountForm />
            </div>
        );
    };
};

export default Account;