// @flow
import {
    HASHROOTPBILL_LIST,
    HASHROOTPBILL_LIST_SUCCESS,
    HASHROOTPBILL_LIST_FAILED,
    HASHROOTPBILL_ADD,
    HASHROOTPBILL_ADD_SUCCESS,
    HASHROOTPBILL_ADD_FAILED,
    HASHROOTPBILL_UPDATE,
    HASHROOTPBILL_UPDATE_SUCCESS,
    HASHROOTPBILL_UPDATE_FAILED,
    HASHROOTPBILL_DELETE,
    HASHROOTPBILL_DELETE_SUCCESS,
    HASHROOTPBILL_DELETE_FAILED,
    HASHROOTPBILL_CLONE,
    HASHROOTPBILL_CLONE_SUCCESS,
    HASHROOTPBILL_CLONE_FAILED,
    HASHROOTPBILL_DOWNLOAD_BILL,
    HASHROOTPBILL_DOWNLOAD_BILL_SUCCESS,
    HASHROOTPBILL_DOWNLOAD_BILL_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type HashrootpBillAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const HashrootpBill = (state: State = INIT_STATE, action: HashrootpBillAction) => {
    switch (action.type) {
        case HASHROOTPBILL_LIST:
            return { ...state, listloading: true };
        case HASHROOTPBILL_LIST_SUCCESS:
            return { ...state, hashrootpbill: action.payload, listloading: false, error: null };
        case HASHROOTPBILL_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTPBILL_ADD:
            return { ...state, loading: true };
        case HASHROOTPBILL_ADD_SUCCESS:
            return { ...state, hashrootpbillAdd: action.payload, loading: false, error: null };
        case HASHROOTPBILL_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTPBILL_UPDATE:
            return { ...state, loading: true };
        case HASHROOTPBILL_UPDATE_SUCCESS:
            return { ...state, hashrootpbillUpdate: action.payload, loading: false, error: null };
        case HASHROOTPBILL_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTPBILL_DELETE:
            return { ...state, loading: true };
        case HASHROOTPBILL_DELETE_SUCCESS:
            return { ...state, hashrootpbillDelete: action.payload, loading: false, error: null };
        case HASHROOTPBILL_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTPBILL_CLONE:
            return { ...state, loading: true };
        case HASHROOTPBILL_CLONE_SUCCESS:
            return { ...state, hashrootpClonebill: action.payload, loading: false, error: null };
        case HASHROOTPBILL_CLONE_FAILED:
            return { ...state, error: action.payload };
        case HASHROOTPBILL_DOWNLOAD_BILL:
            return { ...state };
        case HASHROOTPBILL_DOWNLOAD_BILL_SUCCESS:
            return { ...state, downloadBill: action.payload, error: null };
        case HASHROOTPBILL_DOWNLOAD_BILL_FAILED:
            return { ...state, error: action.payload };
        default:
            return { ...state };
    }
};

export default HashrootpBill;
