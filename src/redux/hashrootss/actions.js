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
    HASHROOTSSINVOICE_DOWNLOAD_INVOICE_FAILED
} from './constants';

type HashrootssInvoiceAction = { type: string, payload: {} | string };

export const getHashrootssInvoiceList = (): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_LIST,
    payload: {},
});

export const getHashrootssInvoiceListSuccess = (hashrootssinvoice: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_LIST_SUCCESS,
    payload: hashrootssinvoice,
});

export const getHashrootssInvoiceListFailed = (error: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_LIST_FAILED,
    payload: error,
});

export const getHashrootssInvoiceAdd = (data:{}): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_ADD,
    payload: data,
});

export const getHashrootssInvoiceAddSuccess = (hashrootssinvoiceAdd: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_ADD_SUCCESS,
    payload: hashrootssinvoiceAdd,
});

export const getHashrootssInvoiceAddFailed = (error: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_ADD_FAILED,
    payload: error,
});

export const getHashrootssInvoiceUpdate = (data:{}): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_UPDATE,
    payload: data,
});

export const getHashrootssInvoiceUpdateSuccess = (hashrootssinvoiceUpdate: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_UPDATE_SUCCESS,
    payload: hashrootssinvoiceUpdate,
});

export const getHashrootssInvoiceUpdateFailed = (error: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_UPDATE_FAILED,
    payload: error,
});

export const getHashrootssInvoiceDelete = (id): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_DELETE,
    payload: id,
});

export const getHashrootssInvoiceDeleteSuccess = (hashrootssinvoiceDelete: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_DELETE_SUCCESS,
    payload: hashrootssinvoiceDelete,
});

export const getHashrootssInvoiceDeleteFailed = (error: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_DELETE_FAILED,
    payload: error,
});

export const getHashrootssCloneInvoice = (data:{}): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_CLONE,
    payload: data,
});

export const getHashrootssCloneInvoiceSuccess = (hashrootssCloneinvoice: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_CLONE_SUCCESS,
    payload: hashrootssCloneinvoice,
});

export const getHashrootssCloneInvoiceFailed = (error: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_CLONE_FAILED,
    payload: error,
});


export const downloadInvoicess = (data): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_DOWNLOAD_INVOICE,
    payload: data,
});

export const downloadInvoicessSuccess = (downloadInvoicess: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_DOWNLOAD_INVOICE_SUCCESS,
    payload: downloadInvoicess,
});

export const downloadInvoicessFailed = (error: string): HashrootssInvoiceAction => ({
    type: HASHROOTSSINVOICE_DOWNLOAD_INVOICE_FAILED,
    payload: error,
});