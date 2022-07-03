// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { toast, Zoom } from 'react-toastify';

import { fetchJSON } from '../../helpers/api';
import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';

import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD,
    COUNTRIES_LIST,
    HSN_LIST,
    PAYMENT_LIST,
    UPDATE_PROFILE,
} from './constants';

import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
    getCountriesSuccess,
    getCountriesFailed,
    getPaymentSuccess,
    getPaymentFailed,
    getHSNSuccess,
    getHSNFailed,
    updateProfileSuccess,
    updateProfileFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
const updateProfileSucsessToast = () => toast.success('Profile Updated Successfully', { transition: Zoom });

/**
 * Sets the session
 * @param {*} user
 */
const setSession = (user) => {
    let cookies = new Cookies();
    if (user) cookies.set('user', JSON.stringify(user), { path: '/' });
    else cookies.remove('user', { path: '/' });
};
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password } }) {
    let sendData = {};
    sendData.email = username;
    sendData.password = password;

    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: endpoints.loginUrl,
        data: sendData,
    };

    try {
        const response = yield call(ApiCall, options);
        if (response.data.error) {
            setSession(null);
            yield put(loginUserFailed(response.data.error));
        } else {
            setSession(response);
            yield put(loginUserSuccess(response));
        }
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(loginUserFailed(message));
        setSession(null);
    }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield call(() => {
            history.push('/account/login');
        });
    } catch (error) {}
}

/**
 * Register the user
 */
function* register({ payload: { fullname, email, password } }) {
    const options = {
        body: JSON.stringify({ fullname, email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, '/users/register', options);
        yield put(registerUserSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(registerUserFailed(message));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {
    const options = {
        body: JSON.stringify({ username }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = yield call(fetchJSON, '/users/password-reset', options);
        yield put(forgetPasswordSuccess(response.message));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* CountryList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewCountries,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getCountriesSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            case 404:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getCountriesFailed(message));
    }
}
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* PaymentList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewPayment,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getPaymentSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            case 404:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getPaymentFailed(message));
    }
}
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HSNList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewHSN,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getHSNSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            case 404:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getHSNFailed(message));
    }
}

//Update Profile
function* updateProfile({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'PUT',
        url: endpoints.updateProfile + '/' + user.data.id,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        console.log(response)
        if (response.status ==200) {
            updateProfileSucsessToast();
            yield put(updateProfileSuccess(response.data));
        } else {
            let message;
            message = response.data.message;
            WarnFields(message);
        }
    } catch (error) {
        let message;
        console.log(error)
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(updateProfileFailed(message));
    }
}

export function* watchLoginUser(): any {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser(): any {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser(): any {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword(): any {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

export function* watchCountryList(): any {
    yield takeEvery(COUNTRIES_LIST, CountryList);
}

export function* watchPaymentList(): any {
    yield takeEvery(PAYMENT_LIST, PaymentList);
}

export function* watchHSNList(): any {
    yield takeEvery(HSN_LIST, HSNList);
}

export function* watchUpdateProfile(): any {
    yield takeEvery(UPDATE_PROFILE, updateProfile);
}

function* authSaga(): any {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
        fork(watchCountryList),
        fork(watchPaymentList),
        fork(watchHSNList),
        fork(watchUpdateProfile),
    ]);
}

export default authSaga;
