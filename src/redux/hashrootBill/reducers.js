// @flow
import {
    HASHROOTBILL_LIST,
    HASHROOTBILL_LIST_SUCCESS,
    HASHROOTBILL_LIST_FAILED,
    HASHROOTBILL_ADD,
    HASHROOTBILL_ADD_SUCCESS,
    HASHROOTBILL_ADD_FAILED,
    HASHROOTBILL_UPDATE,
    HASHROOTBILL_UPDATE_SUCCESS,
    HASHROOTBILL_UPDATE_FAILED,
    HASHROOTBILL_DELETE,
    HASHROOTBILL_DELETE_SUCCESS,
    HASHROOTBILL_DELETE_FAILED,
    HASHROOTBILL_CLONE,
    HASHROOTBILL_CLONE_SUCCESS,
    HASHROOTBILL_CLONE_FAILED,
    HASHROOTBILL_DOWNLOAD_BILL,
    HASHROOTBILL_DOWNLOAD_BILL_SUCCESS,
    HASHROOTBILL_DOWNLOAD_BILL_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type HashrootBillAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const HashrootBill = (state: State = INIT_STATE, action: HashrootBillAction) => {
    switch (action.type) {
        case HASHROOTBILL_LIST:
            return { ...state, listloading: true };
        case HASHROOTBILL_LIST_SUCCESS:
            return { ...state, Hashrootbill: action.payload, listloading: false, error: null };
        case HASHROOTBILL_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTBILL_ADD:
            return { ...state, loading: true };
        case HASHROOTBILL_ADD_SUCCESS:
            return { ...state, HashrootbillAdd: action.payload, loading: false, error: null };
        case HASHROOTBILL_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTBILL_UPDATE:
            return { ...state, loading: true };
        case HASHROOTBILL_UPDATE_SUCCESS:
            return { ...state, HashrootbillUpdate: action.payload, loading: false, error: null };
        case HASHROOTBILL_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTBILL_DELETE:
            return { ...state, loading: true };
        case HASHROOTBILL_DELETE_SUCCESS:
            return { ...state, HashrootbillDelete: action.payload, loading: false, error: null };
        case HASHROOTBILL_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTBILL_CLONE:
            return { ...state, loading: true };
        case HASHROOTBILL_CLONE_SUCCESS:
            return { ...state, HashrootClonebill: action.payload, loading: false, error: null };
        case HASHROOTBILL_CLONE_FAILED:
            return { ...state, error: action.payload };
        case HASHROOTBILL_DOWNLOAD_BILL:
            return { ...state };
        case HASHROOTBILL_DOWNLOAD_BILL_SUCCESS:
            return { ...state, downloadBill: action.payload, error: null };
        case HASHROOTBILL_DOWNLOAD_BILL_FAILED:
            return { ...state, error: action.payload };
        default:
            return { ...state };
    }
};

export default HashrootBill;
