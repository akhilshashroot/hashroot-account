// @flow
import {
    HASHROOTSSBILL_LIST,
    HASHROOTSSBILL_LIST_SUCCESS,
    HASHROOTSSBILL_LIST_FAILED,
    HASHROOTSSBILL_ADD,
    HASHROOTSSBILL_ADD_SUCCESS,
    HASHROOTSSBILL_ADD_FAILED,
    HASHROOTSSBILL_UPDATE,
    HASHROOTSSBILL_UPDATE_SUCCESS,
    HASHROOTSSBILL_UPDATE_FAILED,
    HASHROOTSSBILL_DELETE,
    HASHROOTSSBILL_DELETE_SUCCESS,
    HASHROOTSSBILL_DELETE_FAILED,
    HASHROOTSSBILL_CLONE,
    HASHROOTSSBILL_CLONE_SUCCESS,
    HASHROOTSSBILL_CLONE_FAILED,
    HASHROOTSSBILL_DOWNLOAD_BILL,
    HASHROOTSSBILL_DOWNLOAD_BILL_SUCCESS,
    HASHROOTSSBILL_DOWNLOAD_BILL_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type HashrootssBillAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const HashrootssBill = (state: State = INIT_STATE, action: HashrootssBillAction) => {
    switch (action.type) {
        case HASHROOTSSBILL_LIST:
            return { ...state, listloading: true };
        case HASHROOTSSBILL_LIST_SUCCESS:
            return { ...state, hashrootpbill: action.payload, listloading: false, error: null };
        case HASHROOTSSBILL_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSSBILL_ADD:
            return { ...state, loading: true };
        case HASHROOTSSBILL_ADD_SUCCESS:
            return { ...state, hashrootpbillAdd: action.payload, loading: false, error: null };
        case HASHROOTSSBILL_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSSBILL_UPDATE:
            return { ...state, loading: true };
        case HASHROOTSSBILL_UPDATE_SUCCESS:
            return { ...state, hashrootpbillUpdate: action.payload, loading: false, error: null };
        case HASHROOTSSBILL_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSSBILL_DELETE:
            return { ...state, loading: true };
        case HASHROOTSSBILL_DELETE_SUCCESS:
            return { ...state, hashrootpbillDelete: action.payload, loading: false, error: null };
        case HASHROOTSSBILL_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSSBILL_CLONE:
            return { ...state, loading: true };
        case HASHROOTSSBILL_CLONE_SUCCESS:
            return { ...state, hashrootpClonebill: action.payload, loading: false, error: null };
        case HASHROOTSSBILL_CLONE_FAILED:
            return { ...state, error: action.payload };
        case HASHROOTSSBILL_DOWNLOAD_BILL:
            return { ...state };
        case HASHROOTSSBILL_DOWNLOAD_BILL_SUCCESS:
            return { ...state, downloadBill: action.payload, error: null };
        case HASHROOTSSBILL_DOWNLOAD_BILL_FAILED:
            return { ...state, error: action.payload };
        default:
            return { ...state };
    }
};

export default HashrootssBill;
