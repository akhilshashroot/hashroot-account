// @flow
import {
    HASHROOTPINVOICE_LIST,
    HASHROOTPINVOICE_LIST_SUCCESS,
    HASHROOTPINVOICE_LIST_FAILED,
    HASHROOTPINVOICE_ADD,
    HASHROOTPINVOICE_ADD_SUCCESS,
    HASHROOTPINVOICE_ADD_FAILED,
    HASHROOTPINVOICE_UPDATE,
    HASHROOTPINVOICE_UPDATE_SUCCESS,
    HASHROOTPINVOICE_UPDATE_FAILED,
    HASHROOTPINVOICE_DELETE,
    HASHROOTPINVOICE_DELETE_SUCCESS,
    HASHROOTPINVOICE_DELETE_FAILED,
    HASHROOTPINVOICE_CLONE,
    HASHROOTPINVOICE_CLONE_SUCCESS,
    HASHROOTPINVOICE_CLONE_FAILED,
    HASHROOTPINVOICE_DOWNLOAD_INVOICE,
    HASHROOTPINVOICE_DOWNLOAD_INVOICE_SUCCESS,
    HASHROOTPINVOICE_DOWNLOAD_INVOICE_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type HashrootpInvoiceAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const HashrootpInvoice = (state: State = INIT_STATE, action: HashrootpInvoiceAction) => {
    switch (action.type) {
        case HASHROOTPINVOICE_LIST:
            return { ...state, listloading: true };
        case HASHROOTPINVOICE_LIST_SUCCESS:
            return { ...state, hashrootpinvoice: action.payload, listloading: false, error: null };
        case HASHROOTPINVOICE_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTPINVOICE_ADD:
            return { ...state, loading: true };
        case HASHROOTPINVOICE_ADD_SUCCESS:
            return { ...state, hashrootpinvoiceAdd: action.payload, loading: false, error: null };
        case HASHROOTPINVOICE_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTPINVOICE_UPDATE:
            return { ...state, loading: true };
        case HASHROOTPINVOICE_UPDATE_SUCCESS:
            return { ...state, hashrootpinvoiceUpdate: action.payload, loading: false, error: null };
        case HASHROOTPINVOICE_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTPINVOICE_DELETE:
            return { ...state, loading: true };
        case HASHROOTPINVOICE_DELETE_SUCCESS:
            return { ...state, hashrootpinvoiceDelete: action.payload, loading: false, error: null };
        case HASHROOTPINVOICE_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTPINVOICE_CLONE:
            return { ...state, loading: true };
        case HASHROOTPINVOICE_CLONE_SUCCESS:
            return { ...state, hashrootpCloneinvoice: action.payload, loading: false, error: null };
        case HASHROOTPINVOICE_CLONE_FAILED:
            return { ...state, error: action.payload };
        case HASHROOTPINVOICE_DOWNLOAD_INVOICE:
            return { ...state };
        case HASHROOTPINVOICE_DOWNLOAD_INVOICE_SUCCESS:
            return { ...state, downloadInvoice: action.payload, error: null };
        case HASHROOTPINVOICE_DOWNLOAD_INVOICE_FAILED:
            return { ...state, error: action.payload };
        default:
            return { ...state };
    }
};

export default HashrootpInvoice;
