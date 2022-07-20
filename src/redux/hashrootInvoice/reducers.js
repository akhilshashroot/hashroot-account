// @flow
import {
    HASHROOTINVOICE_LIST,
    HASHROOTINVOICE_LIST_SUCCESS,
    HASHROOTINVOICE_LIST_FAILED,
    HASHROOTINVOICE_ADD,
    HASHROOTINVOICE_ADD_SUCCESS,
    HASHROOTINVOICE_ADD_FAILED,
    HASHROOTINVOICE_UPDATE,
    HASHROOTINVOICE_UPDATE_SUCCESS,
    HASHROOTINVOICE_UPDATE_FAILED,
    HASHROOTINVOICE_DELETE,
    HASHROOTINVOICE_DELETE_SUCCESS,
    HASHROOTINVOICE_DELETE_FAILED,
    HASHROOTINVOICE_CLONE,
    HASHROOTINVOICE_CLONE_SUCCESS,
    HASHROOTINVOICE_CLONE_FAILED,
    HASHROOTINVOICE_DOWNLOAD_INVOICE,
    HASHROOTINVOICE_DOWNLOAD_INVOICE_SUCCESS,
    HASHROOTINVOICE_DOWNLOAD_INVOICE_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type HashrootInvoiceAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const HashrootInvoice = (state: State = INIT_STATE, action: HashrootInvoiceAction) => {
    switch (action.type) {
        case HASHROOTINVOICE_LIST:
            return { ...state, listloading: true };
        case HASHROOTINVOICE_LIST_SUCCESS:
            return { ...state, hashrootinvoice: action.payload, listloading: false, error: null };
        case HASHROOTINVOICE_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTINVOICE_ADD:
            return { ...state, loading: true };
        case HASHROOTINVOICE_ADD_SUCCESS:
            return { ...state, hashrootinvoiceAdd: action.payload, loading: false, error: null };
        case HASHROOTINVOICE_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTINVOICE_UPDATE:
            return { ...state, loading: true };
        case HASHROOTINVOICE_UPDATE_SUCCESS:
            return { ...state, hashrootinvoiceUpdate: action.payload, loading: false, error: null };
        case HASHROOTINVOICE_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTINVOICE_DELETE:
            return { ...state, loading: true };
        case HASHROOTINVOICE_DELETE_SUCCESS:
            return { ...state, hashrootinvoiceDelete: action.payload, loading: false, error: null };
        case HASHROOTINVOICE_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTINVOICE_CLONE:
            return { ...state, loading: true };
        case HASHROOTINVOICE_CLONE_SUCCESS:
            return { ...state, hashrootCloneinvoice: action.payload, loading: false, error: null };
        case HASHROOTINVOICE_CLONE_FAILED:
            return { ...state, error: action.payload };
        case HASHROOTINVOICE_DOWNLOAD_INVOICE:
            return { ...state };
        case HASHROOTINVOICE_DOWNLOAD_INVOICE_SUCCESS:
            return { ...state, downloadInvoice: action.payload, error: null };
        case HASHROOTINVOICE_DOWNLOAD_INVOICE_FAILED:
            return { ...state, error: action.payload };
        default:
                return { ...state };
    }
};

export default HashrootInvoice;
