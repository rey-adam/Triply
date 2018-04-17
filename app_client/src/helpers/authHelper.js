export default {
    isLoggedIn() {
        if (this.isValid(window.localStorage.getItem('token'))) {
            return true;
        }
        else {
            this.logOut();
            return false;
        }
    },
    logOut() {
        window.localStorage.removeItem('token');
        alert('Current session has ended. Please log in again.');
    },
    deleteUser() {
        window.localStorage.removeItem('token');
        alert('Account has been deleted.');
    },
    getToken() {
        const token = localStorage.getItem('token');

        if (!this.isValid(token)) {
            this.logOut();
        }
        return token
    },
    isValid(token) {
        if (token != null) {
            const userData = this.splitToken(token);
            return userData.exp > Date.now() / 1000;
        }
        return false;
    },
    splitToken(token) {
        return JSON.parse(window.atob(token.split('.')[1]));
    }
}