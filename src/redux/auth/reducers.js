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
    HSN_LIST,
    HSN_LIST_SUCCESS,
    HSN_LIST_FAILED,
    PAYMENT_LIST,
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_FAILED,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type AuthAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const Auth = (state: State = INIT_STATE, action: AuthAction) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case LOGIN_USER_FAILED:
            return { ...state, error: action.payload, loading: false };
        case REGISTER_USER:
            return { ...state, loading: true };
        case REGISTER_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case REGISTER_USER_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOGOUT_USER:
            return { ...state, user: null };
        case FORGET_PASSWORD:
            return { ...state, loading: true };
        case FORGET_PASSWORD_SUCCESS:
            return { ...state, passwordResetStatus: action.payload, loading: false, error: null };
        case FORGET_PASSWORD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case RESET_PASSWORD:
            return { ...state, loading: true };
        case RESET_PASSWORD_SUCCESS:
            return { ...state, ResetStatus: action.payload, loading: false, error: null };
        case RESET_PASSWORD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case COUNTRIES_LIST:
            return { ...state, listloading: true };
        case COUNTRIES_LIST_SUCCESS:
            return { ...state, countriesList: action.payload, listloading: false, error: null };
        case COUNTRIES_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case PAYMENT_LIST:
            return { ...state, listloading: true };
        case PAYMENT_LIST_SUCCESS:
            return { ...state, paymentList: action.payload, listloading: false, error: null };
        case PAYMENT_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HSN_LIST:
            return { ...state, listloading: true };
        case HSN_LIST_SUCCESS:
            return { ...state, hsnList: action.payload, listloading: false, error: null };
        case HSN_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case UPDATE_PROFILE:
            return { ...state };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, error: null };
        case UPDATE_PROFILE_FAILED:
            return { ...state, error: action.payload };
        default:
            return { ...state };
    }
};

export default Auth;
