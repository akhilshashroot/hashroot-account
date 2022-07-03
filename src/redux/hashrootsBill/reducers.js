// @flow
import {
    HASHROOTSBILL_LIST,
    HASHROOTSBILL_LIST_SUCCESS,
    HASHROOTSBILL_LIST_FAILED,
    HASHROOTSBILL_ADD,
    HASHROOTSBILL_ADD_SUCCESS,
    HASHROOTSBILL_ADD_FAILED,
    HASHROOTSBILL_UPDATE,
    HASHROOTSBILL_UPDATE_SUCCESS,
    HASHROOTSBILL_UPDATE_FAILED,
    HASHROOTSBILL_DELETE,
    HASHROOTSBILL_DELETE_SUCCESS,
    HASHROOTSBILL_DELETE_FAILED,
    HASHROOTSBILL_CLONE,
    HASHROOTSBILL_CLONE_SUCCESS,
    HASHROOTSBILL_CLONE_FAILED,
    HASHROOTSBILL_DOWNLOAD_BILL,
    HASHROOTSBILL_DOWNLOAD_BILL_SUCCESS,
    HASHROOTSBILL_DOWNLOAD_BILL_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type HashrootsBillAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const HashrootsBill = (state: State = INIT_STATE, action: HashrootsBillAction) => {
    switch (action.type) {
        case HASHROOTSBILL_LIST:
            return { ...state, listloading: true };
        case HASHROOTSBILL_LIST_SUCCESS:
            return { ...state, hashrootpbill: action.payload, listloading: false, error: null };
        case HASHROOTSBILL_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSBILL_ADD:
            return { ...state, loading: true };
        case HASHROOTSBILL_ADD_SUCCESS:
            return { ...state, hashrootpbillAdd: action.payload, loading: false, error: null };
        case HASHROOTSBILL_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSBILL_UPDATE:
            return { ...state, loading: true };
        case HASHROOTSBILL_UPDATE_SUCCESS:
            return { ...state, hashrootpbillUpdate: action.payload, loading: false, error: null };
        case HASHROOTSBILL_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSBILL_DELETE:
            return { ...state, loading: true };
        case HASHROOTSBILL_DELETE_SUCCESS:
            return { ...state, hashrootpbillDelete: action.payload, loading: false, error: null };
        case HASHROOTSBILL_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSBILL_CLONE:
            return { ...state, loading: true };
        case HASHROOTSBILL_CLONE_SUCCESS:
            return { ...state, hashrootpClonebill: action.payload, loading: false, error: null };
        case HASHROOTSBILL_CLONE_FAILED:
            return { ...state, error: action.payload };
        case HASHROOTSBILL_DOWNLOAD_BILL:
            return { ...state };
        case HASHROOTSBILL_DOWNLOAD_BILL_SUCCESS:
            return { ...state, downloadBill: action.payload, error: null };
        case HASHROOTSBILL_DOWNLOAD_BILL_FAILED:
            return { ...state, error: action.payload };
        default:
            return { ...state };
    }
};

export default HashrootsBill;
