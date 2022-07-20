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
    HASHROOTINVOICE_DELETE_FAILED  ,
    HASHROOTINVOICE_CLONE,
    HASHROOTINVOICE_CLONE_SUCCESS,
    HASHROOTINVOICE_CLONE_FAILED,
    HASHROOTINVOICE_DOWNLOAD_INVOICE,
    HASHROOTINVOICE_DOWNLOAD_INVOICE_SUCCESS,
    HASHROOTINVOICE_DOWNLOAD_INVOICE_FAILED
} from './constants';

type HashrootInvoiceAction = { type: string, payload: {} | string };

export const getHashrootInvoiceList = (): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_LIST,
    payload: {},
});

export const getHashrootInvoiceListSuccess = (hashrootinvoice: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_LIST_SUCCESS,
    payload: hashrootinvoice,
});

export const getHashrootInvoiceListFailed = (error: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_LIST_FAILED,
    payload: error,
});

export const getHashrootInvoiceAdd = (data:{}): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_ADD,
    payload: data,
});

export const getHashrootInvoiceAddSuccess = (hashrootinvoiceAdd: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_ADD_SUCCESS,
    payload: hashrootinvoiceAdd,
});

export const getHashrootInvoiceAddFailed = (error: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_ADD_FAILED,
    payload: error,
});

export const getHashrootInvoiceUpdate = (data:{}): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_UPDATE,
    payload: data,
});

export const getHashrootInvoiceUpdateSuccess = (hashrootinvoiceUpdate: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_UPDATE_SUCCESS,
    payload: hashrootinvoiceUpdate,
});

export const getHashrootInvoiceUpdateFailed = (error: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_UPDATE_FAILED,
    payload: error,
});

export const getHashrootInvoiceDelete = (id): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_DELETE,
    payload: id,
});

export const getHashrootInvoiceDeleteSuccess = (hashrootinvoiceDelete: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_DELETE_SUCCESS,
    payload: hashrootinvoiceDelete,
});

export const getHashrootInvoiceDeleteFailed = (error: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_DELETE_FAILED,
    payload: error,
});
export const getHashrootCloneInvoice = (data:{}): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_CLONE,
    payload: data,
});

export const getHashrootCloneInvoiceSuccess = (hashrootpCloneinvoice: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_CLONE_SUCCESS,
    payload: hashrootpCloneinvoice,
});

export const getHashrootCloneInvoiceFailed = (error: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_CLONE_FAILED,
    payload: error,
});


export const downloadInvoice = (data): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_DOWNLOAD_INVOICE,
    payload: data,
});

export const downloadInvoiceSuccess = (downloadInvoice: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_DOWNLOAD_INVOICE_SUCCESS,
    payload: downloadInvoice,
});

export const downloadInvoiceFailed = (error: string): HashrootInvoiceAction => ({
    type: HASHROOTINVOICE_DOWNLOAD_INVOICE_FAILED,
    payload: error,
});