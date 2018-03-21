export default {
    isLoggedIn() {
        if (this.isValid(window.localStorage.getItem('token'))) {
            return true;
        }
        else {
            this.logOut();
            return false;
        }
        // if (window.localStorage.getItem('token') != null) {
        //     return true;
        // } else {
        //     alert('Current session has ended. Please log in again.');
        //     return false;
        // }
    },
    logOut() {
        window.localStorage.removeItem('token');
        alert('Current session has ended. Please log in again.');
        // on the button press to log out, do a this.props.history.push('/login');
        // so not just remove token but also redirect to login page
        // can also do getToken() function to be safe
    },
    deleteUser() {
        window.localStorage.removeItem('token');
        alert('Account has been deleted.');
    },
    getToken() {
        const token = localStorage.getItem('token');
        // can make this more complicated if you want to send error message, etc.

        // if token is not valid, log out
        if (!this.isValid(token)) {
            this.logOut();
        }
    },
    isValid(token) {
        /**
         * if token is not null/undefined/0/etc.
         * IMPORTANT NOTE: make sure to do non-strict equivalent comparison here
         * BECAUSE null is not the same DATA TYPE as undefined
         * BUT null/undefined/0 all have the same VALUE
         * so (token != null) is basically checking for all falsey values
         * whereas (token !== null) is only checking for a falsey value that is of the data type null
         */
        if (token != null) {
            const userData = this.splitToken(token);
            return userData.exp > Date.now() / 1000;
        }
        // in all other instances
        return false;
    },
    splitToken(token) {
        return JSON.parse(window.atob(token.split('.')[1]));
    }
}