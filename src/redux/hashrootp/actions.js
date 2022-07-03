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
    HASHROOTPINVOICE_DOWNLOAD_INVOICE_FAILED
} from './constants';

type HashrootpInvoiceAction = { type: string, payload: {} | string };

export const getHashrootpInvoiceList = (): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_LIST,
    payload: {},
});

export const getHashrootpInvoiceListSuccess = (hashrootpinvoice: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_LIST_SUCCESS,
    payload: hashrootpinvoice,
});

export const getHashrootpInvoiceListFailed = (error: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_LIST_FAILED,
    payload: error,
});

export const getHashrootpInvoiceAdd = (data:{}): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_ADD,
    payload: data,
});

export const getHashrootpInvoiceAddSuccess = (hashrootpinvoiceAdd: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_ADD_SUCCESS,
    payload: hashrootpinvoiceAdd,
});

export const getHashrootpInvoiceAddFailed = (error: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_ADD_FAILED,
    payload: error,
});

export const getHashrootpInvoiceUpdate = (data:{}): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_UPDATE,
    payload: data,
});

export const getHashrootpInvoiceUpdateSuccess = (hashrootpinvoiceUpdate: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_UPDATE_SUCCESS,
    payload: hashrootpinvoiceUpdate,
});

export const getHashrootpInvoiceUpdateFailed = (error: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_UPDATE_FAILED,
    payload: error,
});

export const getHashrootpInvoiceDelete = (id): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_DELETE,
    payload: id,
});

export const getHashrootpInvoiceDeleteSuccess = (hashrootpinvoiceDelete: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_DELETE_SUCCESS,
    payload: hashrootpinvoiceDelete,
});

export const getHashrootpInvoiceDeleteFailed = (error: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_DELETE_FAILED,
    payload: error,
});

export const getHashrootpCloneInvoice = (data:{}): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_CLONE,
    payload: data,
});

export const getHashrootpCloneInvoiceSuccess = (hashrootpCloneinvoice: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_CLONE_SUCCESS,
    payload: hashrootpCloneinvoice,
});

export const getHashrootpCloneInvoiceFailed = (error: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_CLONE_FAILED,
    payload: error,
});


export const downloadInvoice = (data): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_DOWNLOAD_INVOICE,
    payload: data,
});

export const downloadInvoiceSuccess = (downloadInvoice: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_DOWNLOAD_INVOICE_SUCCESS,
    payload: downloadInvoice,
});

export const downloadInvoiceFailed = (error: string): HashrootpInvoiceAction => ({
    type: HASHROOTPINVOICE_DOWNLOAD_INVOICE_FAILED,
    payload: error,
});