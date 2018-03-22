export default {
    isLoggedIn() {
        return window.localStorage.getItem('token') !== null;
    },
    logOut() {
        window.localStorage.removeItem('token');
        // on the button press to log out, do a this.props.history.push('/login');
        // so not just remove token but also redirect to login page
        // can also do getToken() function to be safe
    },
    getToken() {
        const token = window.localStorage.getItem('token');
        // can make this more complicated if you want to send error message, etc.

        // if token is not valid, log out
        if (!this.isValid(token)) {
            this.logOut();
        }
    },
    isValid(token) {
        // if token is not null
        if (token !== null) {
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