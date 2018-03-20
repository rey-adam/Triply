import React, { Component } from 'react';
import './AccountForm.css';

class AccountForm extends Component {
    render() {
        return (
            <div className="account-form-div">
                <div className="account-form-header">
                    <p className="text-center">Account Details</p>
                </div>
                <form id="account-form">
                    <div className="form-group">
                        <label htmlFor="account-email">Email:</label>
                        <input id="account-email" className="form-control" type="email" value="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="account-new-pw">New Password:</label>
                        <input id="account-new-pw" className="form-control" type="password" value="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="account-confm-pw">Confirm Password:</label>
                        <input id="account-confm-pw" className="form-control" type="password" value="" />
                    </div>
                    <div className="account-btn-div">
                        <button id="update-account-btn" className="pull-right btn btn-default">
                            Update
                        </button>
                        <button id="delete-account-btn" className="pull-right btn btn-default">
                            Delete
                        </button>
                    </div>

                    <dialog className="mdl-dialog" id="confirm-delete-modal">
                        <h4 className="mdl-dialog__title"></h4>
                        <div id="delete-modal__content" className="mdl-dialog__content">
                             Are you sure you want to delete your account?
                        </div>
                        <div className="mdl-dialog__actions">
                            <button type="button" className="mdl-button close-modal">NO</button>
                            <button id="confirm-delete-btn" type="button" className="mdl-button">YES</button>
                        </div>
                    </dialog>
                </form>
            </div>
        );
    };
};

export default AccountForm;