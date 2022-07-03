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
    HASHROOTINVOICE_DELETE_FAILED
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
