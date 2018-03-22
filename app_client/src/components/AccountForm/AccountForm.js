import React from 'react';
import './AccountForm.css';

const AccountForm = props =>
    <div className="account-form-div">
        <div className="account-form-header">
            <p className="text-center">Account Details</p>
        </div>
        <form id="account-form">
            <div className="form-group">
                <label htmlFor="account-email">Email:</label>
                <input id="account-email"
                    className="form-control"
                    type="email"
                    name="userEmail"
                    value={props.userEmail}
                    onChange={props.handleInputChange}
                    autoComplete='true'
                />
            </div>
            <div className="form-group">
                <label htmlFor="account-new-pw">New Password:</label>
                <input
                    id="account-new-pw"
                    className="form-control"
                    type="password"
                    name="userPass"
                    value={props.userPass}
                    onChange={props.handleInputChange}
                    autoComplete='true'
                />
            </div>
            <div className="form-group">
                <label htmlFor="account-confm-pw">Confirm Password:</label>
                <input
                    id="account-confm-pw"
                    className="form-control"
                    type="password"
                    name="userConfirmPass"
                    value={props.userConfirmPass}
                    onChange={props.handleInputChange}
                    autoComplete='true'
                />
            </div>
            <div className="account-btn-div">
                <button 
                    id="update-account-btn"
                    className="pull-right btn btn-default"
                    onClick={props.handleUpdateUser}
                >Update</button>
                <button
                    id="delete-account-btn"
                    className="pull-right btn btn-default"
                    onClick={props.handleDeleteUser}
                >Delete</button>
            </div>
        </form>
    </div>;

export default AccountForm;