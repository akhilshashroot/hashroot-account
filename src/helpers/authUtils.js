// @flow
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }

    if (user && user.data && user.data.token) {
        const decoded = jwtDecode(user.data.token);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }
    }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    // let path = window.location.pathname;
    const user = cookies.get('user');
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
    // const user = cookies.get('user');

    // return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

const getUser = () => {
    let path = window.location.pathname;
    if (path === '/admin') {
        localStorage.setItem('loginmode', 'ADMIN');
    } else if (path === '/login') {
        localStorage.setItem('loginmode', 'USER');
    }
};

export { isUserAuthenticated, getLoggedInUser, getUser };
