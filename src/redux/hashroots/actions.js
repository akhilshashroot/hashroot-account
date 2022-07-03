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
    HASHROOTSINVOICE_DOWNLOAD_INVOICE_FAILED
} from './constants';

type HashrootsInvoiceAction = { type: string, payload: {} | string };

export const getHashrootsInvoiceList = (): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_LIST,
    payload: {},
});

export const getHashrootsInvoiceListSuccess = (hashrootsinvoice: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_LIST_SUCCESS,
    payload: hashrootsinvoice,
});

export const getHashrootsInvoiceListFailed = (error: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_LIST_FAILED,
    payload: error,
});

export const getHashrootsInvoiceAdd = (data:{}): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_ADD,
    payload: data,
});

export const getHashrootsInvoiceAddSuccess = (hashrootsinvoiceAdd: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_ADD_SUCCESS,
    payload: hashrootsinvoiceAdd,
});

export const getHashrootsInvoiceAddFailed = (error: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_ADD_FAILED,
    payload: error,
});

export const getHashrootsInvoiceUpdate = (data:{}): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_UPDATE,
    payload: data,
});

export const getHashrootsInvoiceUpdateSuccess = (hashrootsinvoiceUpdate: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_UPDATE_SUCCESS,
    payload: hashrootsinvoiceUpdate,
});

export const getHashrootsInvoiceUpdateFailed = (error: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_UPDATE_FAILED,
    payload: error,
});

export const getHashrootsInvoiceDelete = (id): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_DELETE,
    payload: id,
});

export const getHashrootsInvoiceDeleteSuccess = (hashrootsinvoiceDelete: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_DELETE_SUCCESS,
    payload: hashrootsinvoiceDelete,
});

export const getHashrootsInvoiceDeleteFailed = (error: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_DELETE_FAILED,
    payload: error,
});

export const getHashrootsCloneInvoice = (data:{}): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_CLONE,
    payload: data,
});

export const getHashrootsCloneInvoiceSuccess = (hashrootsCloneinvoice: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_CLONE_SUCCESS,
    payload: hashrootsCloneinvoice,
});

export const getHashrootsCloneInvoiceFailed = (error: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_CLONE_FAILED,
    payload: error,
});


export const downloadInvoices = (data): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_DOWNLOAD_INVOICE,
    payload: data,
});

export const downloadInvoicesSuccess = (downloadInvoices: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_DOWNLOAD_INVOICE_SUCCESS,
    payload: downloadInvoices,
});

export const downloadInvoicesFailed = (error: string): HashrootsInvoiceAction => ({
    type: HASHROOTSINVOICE_DOWNLOAD_INVOICE_FAILED,
    payload: error,
});