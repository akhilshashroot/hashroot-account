// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED,
    COUNTRIES_LIST,
    COUNTRIES_LIST_SUCCESS,
    COUNTRIES_LIST_FAILED,
    PAYMENT_LIST,
    PAYMENT_LIST_FAILED,
    PAYMENT_LIST_SUCCESS,
    HSN_LIST,
    HSN_LIST_SUCCESS,
    HSN_LIST_FAILED,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from './constants';

type AuthAction = { type: string, payload: {} | string };

export const loginUser = (username: string, password: string): AuthAction => ({
    type: LOGIN_USER,
    payload: { username, password },
});

export const loginUserSuccess = (user: string): AuthAction => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

export const loginUserFailed = (error: string): AuthAction => ({
    type: LOGIN_USER_FAILED,
    payload: error,
});

export const registerUser = (fullname: string, email: string, password: string): AuthAction => ({
    type: REGISTER_USER,
    payload: { fullname, email, password },
});

export const registerUserSuccess = (user: {}): AuthAction => ({
    type: REGISTER_USER_SUCCESS,
    payload: user,
});

export const registerUserFailed = (error: string): AuthAction => ({
    type: REGISTER_USER_FAILED,
    payload: error,
});

export const logoutUser = (history: any): AuthAction => ({
    type: LOGOUT_USER,
    payload: { history },
});

export const forgetPassword = (data): AuthAction => ({
    type: FORGET_PASSWORD,
    payload: data,
});

export const forgetPasswordSuccess = (passwordResetStatus: string): AuthAction => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus,
});

export const forgetPasswordFailed = (error: string): AuthAction => ({
    type: FORGET_PASSWORD_FAILED,
    payload: error,
});

export const getCountries = () => ({
    type: COUNTRIES_LIST,
    payload: {},
});

export const getCountriesSuccess = (countries) => ({
    type: COUNTRIES_LIST_SUCCESS,
    payload: countries,
});

export const getCountriesFailed = (error) => ({
    type: COUNTRIES_LIST_FAILED,
    payload: error,
});

export const getPayment = () => ({
    type: PAYMENT_LIST,
    payload: {},
});

export const getPaymentSuccess = (payment) => ({
    type: PAYMENT_LIST_SUCCESS,
    payload: payment,
});

export const getPaymentFailed = (error) => ({
    type: PAYMENT_LIST_FAILED,
    payload: error,
});

export const getHSN = () => ({
    type: HSN_LIST,
    payload: {},
});

export const getHSNSuccess = (hsn) => ({
    type: HSN_LIST_SUCCESS,
    payload: hsn,
});

export const getHSNFailed = (error) => ({
    type: HSN_LIST_FAILED,
    payload: error,
});


export const updateProfile = (data) => ({
    type: UPDATE_PROFILE,
    payload: data,
});

export const updateProfileSuccess = (profile) => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: profile,
});

export const updateProfileFailed = (error) => ({
    type: UPDATE_PROFILE_FAILED,
    payload: error,
});
export const resetPassword = (data): AuthAction => ({
    type: RESET_PASSWORD,
    payload: data,
});

export const resetPasswordSuccess = (ResetStatus: string): AuthAction => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: ResetStatus,
});

export const resetPasswordFailed = (error: string): AuthAction => ({
    type: RESET_PASSWORD_FAILED,
    payload: error,
});
