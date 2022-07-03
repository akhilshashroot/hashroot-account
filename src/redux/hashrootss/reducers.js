// @flow
import {
    HASHROOTSSINVOICE_LIST,
    HASHROOTSSINVOICE_LIST_SUCCESS,
    HASHROOTSSINVOICE_LIST_FAILED,
    HASHROOTSSINVOICE_ADD,
    HASHROOTSSINVOICE_ADD_SUCCESS,
    HASHROOTSSINVOICE_ADD_FAILED,
    HASHROOTSSINVOICE_UPDATE,
    HASHROOTSSINVOICE_UPDATE_SUCCESS,
    HASHROOTSSINVOICE_UPDATE_FAILED,
    HASHROOTSSINVOICE_DELETE,
    HASHROOTSSINVOICE_DELETE_SUCCESS,
    HASHROOTSSINVOICE_DELETE_FAILED,
    HASHROOTSSINVOICE_CLONE,
    HASHROOTSSINVOICE_CLONE_SUCCESS,
    HASHROOTSSINVOICE_CLONE_FAILED,
    HASHROOTSSINVOICE_DOWNLOAD_INVOICE,
    HASHROOTSSINVOICE_DOWNLOAD_INVOICE_SUCCESS,
    HASHROOTSSINVOICE_DOWNLOAD_INVOICE_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type HashrootssInvoiceAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value?: boolean };

const HashrootssInvoice = (state: State = INIT_STATE, action: HashrootssInvoiceAction) => {
    switch (action.type) {
        case HASHROOTSSINVOICE_LIST:
            return { ...state, listloading: true };
        case HASHROOTSSINVOICE_LIST_SUCCESS:
            return { ...state, hashrootssinvoice: action.payload, listloading: false, error: null };
        case HASHROOTSSINVOICE_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSSINVOICE_ADD:
            return { ...state, loading: true };
        case HASHROOTSSINVOICE_ADD_SUCCESS:
            return { ...state, hashrootssinvoiceAdd: action.payload, loading: false, error: null };
        case HASHROOTSSINVOICE_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSSINVOICE_UPDATE:
            return { ...state, loading: true };
        case HASHROOTSSINVOICE_UPDATE_SUCCESS:
            return { ...state, hashrootssinvoiceUpdate: action.payload, loading: false, error: null };
        case HASHROOTSSINVOICE_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSSINVOICE_DELETE:
            return { ...state, loading: true };
        case HASHROOTSSINVOICE_DELETE_SUCCESS:
            return { ...state, hashrootssinvoiceDelete: action.payload, loading: false, error: null };
        case HASHROOTSSINVOICE_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case HASHROOTSSINVOICE_CLONE:
            return { ...state, loading: true };
        case HASHROOTSSINVOICE_CLONE_SUCCESS:
            return { ...state, hashrootssCloneinvoice: action.payload, loading: false, error: null };
        case HASHROOTSSINVOICE_CLONE_FAILED:
            return { ...state, error: action.payload };
        case HASHROOTSSINVOICE_DOWNLOAD_INVOICE:
            return { ...state };
        case HASHROOTSSINVOICE_DOWNLOAD_INVOICE_SUCCESS:
            return { ...state, downloadInvoicess: action.payload, error: null };
        case HASHROOTSSINVOICE_DOWNLOAD_INVOICE_FAILED:
            return { ...state, error: action.payload };
        default:
            return { ...state };
    }
};

export default HashrootssInvoice;
