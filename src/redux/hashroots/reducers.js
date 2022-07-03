// @flow
import {
    HASHROOTSINVOICE_LIST,
    HASHROOTSINVOICE_LIST_SUCCESS,
    HASHROOTSINVOICE_LIST_FAILED,
    HASHROOTSINVOICE_ADD,
    HASHROOTSINVOICE_ADD_SUCCESS,
    HASHROOTSINVOICE_ADD_FAILED,
    HASHROOTSINVOICE_UPDATE,
    HASHROOTSINVOICE_UPDATE_SUCCESS,
    HASHROOTSINVOICE_UPDATE_FAILED,
    HASHROOTSINVOICE_DELETE,
    HASHROOTSINVOICE_DELETE_SUCCESS,
    HASHROOTSINVOICE_DELETE_FAILED,
    HASHROOTSINVOICE_CLONE,
    HASHROOTSINVOICE_CLONE_SUCCESS,
    HASHROOTSINVOICE_CLONE_FAILED,
    HASHROOTSINVOICE_DOWNLOAD_INVOICE,
    HASHROOTSINVOICE_DOWNLOAD_INVOICE_SUCCESS,
    HASHROOTSINVOICE_DOWNLOAD_INVOICE_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type HashrootsInvoiceAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const HashrootsInvoice = (state: State = INIT_STATE, action: HashrootsInvoiceAction) => {
    switch (action.type) {
        case HASHROOTSINVOICE_LIST:
            return { ...state, listloading: true };
        case HASHROOTSINVOICE_LIST_SUCCESS:
            return { ...state, hashrootsinvoice: action.payload, listloading: false, error: null };
        case HASHROOTSINVOICE_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSINVOICE_ADD:
            return { ...state, loading: true };
        case HASHROOTSINVOICE_ADD_SUCCESS:
            return { ...state, hashrootsinvoiceAdd: action.payload, loading: false, error: null };
        case HASHROOTSINVOICE_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSINVOICE_UPDATE:
            return { ...state, loading: true };
        case HASHROOTSINVOICE_UPDATE_SUCCESS:
            return { ...state, hashrootsinvoiceUpdate: action.payload, loading: false, error: null };
        case HASHROOTSINVOICE_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSINVOICE_DELETE:
            return { ...state, loading: true };
        case HASHROOTSINVOICE_DELETE_SUCCESS:
            return { ...state, hashrootsinvoiceDelete: action.payload, loading: false, error: null };
        case HASHROOTSINVOICE_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSINVOICE_CLONE:
            return { ...state, loading: true };
        case HASHROOTSINVOICE_CLONE_SUCCESS:
            return { ...state, hashrootsCloneinvoice: action.payload, loading: false, error: null };
        case HASHROOTSINVOICE_CLONE_FAILED:
            return { ...state, error: action.payload };
        case HASHROOTSINVOICE_DOWNLOAD_INVOICE:
            return { ...state };
        case HASHROOTSINVOICE_DOWNLOAD_INVOICE_SUCCESS:
            return { ...state, downloadInvoices: action.payload, error: null };
        case HASHROOTSINVOICE_DOWNLOAD_INVOICE_FAILED:
            return { ...state, error: action.payload };
        default:
            return { ...state };
    }
};

export default HashrootsInvoice;
