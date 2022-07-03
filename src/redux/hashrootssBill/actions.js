// @flow
import {
    HASHROOTSSBILL_LIST,
    HASHROOTSSBILL_LIST_SUCCESS,
    HASHROOTSSBILL_LIST_FAILED,
    HASHROOTSSBILL_ADD,
    HASHROOTSSBILL_ADD_SUCCESS,
    HASHROOTSSBILL_ADD_FAILED,
    HASHROOTSSBILL_UPDATE,
    HASHROOTSSBILL_UPDATE_SUCCESS,
    HASHROOTSSBILL_UPDATE_FAILED,
    HASHROOTSSBILL_DELETE,
    HASHROOTSSBILL_DELETE_SUCCESS,
    HASHROOTSSBILL_DELETE_FAILED,
    HASHROOTSSBILL_CLONE,
    HASHROOTSSBILL_CLONE_SUCCESS,
    HASHROOTSSBILL_CLONE_FAILED,
    HASHROOTSSBILL_DOWNLOAD_BILL,
    HASHROOTSSBILL_DOWNLOAD_BILL_SUCCESS,
    HASHROOTSSBILL_DOWNLOAD_BILL_FAILED
} from './constants';

type HashrootssBillAction = { type: string, payload: {} | string };

export const getHashrootssBillList = (): HashrootssBillAction => ({
    type: HASHROOTSSBILL_LIST,
    payload: {},
});

export const getHashrootssBillListSuccess = (hashrootpbill: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_LIST_SUCCESS,
    payload: hashrootpbill,
});

export const getHashrootssBillListFailed = (error: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_LIST_FAILED,
    payload: error,
});

export const getHashrootssBillAdd = (data:{}): HashrootssBillAction => ({
    type: HASHROOTSSBILL_ADD,
    payload: data,
});

export const getHashrootssBillAddSuccess = (hashrootpbillAdd: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_ADD_SUCCESS,
    payload: hashrootpbillAdd,
});

export const getHashrootssBillAddFailed = (error: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_ADD_FAILED,
    payload: error,
});

export const getHashrootssBillUpdate = (data:{}): HashrootssBillAction => ({
    type: HASHROOTSSBILL_UPDATE,
    payload: data,
});

export const getHashrootssBillUpdateSuccess = (hashrootpbillUpdate: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_UPDATE_SUCCESS,
    payload: hashrootpbillUpdate,
});

export const getHashrootssBillUpdateFailed = (error: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_UPDATE_FAILED,
    payload: error,
});

export const getHashrootssBillDelete = (id): HashrootssBillAction => ({
    type: HASHROOTSSBILL_DELETE,
    payload: id,
});

export const getHashrootssBillDeleteSuccess = (hashrootpbillDelete: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_DELETE_SUCCESS,
    payload: hashrootpbillDelete,
});

export const getHashrootssBillDeleteFailed = (error: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_DELETE_FAILED,
    payload: error,
});

export const getHashrootssCloneBill = (data:{}): HashrootssBillAction => ({
    type: HASHROOTSSBILL_CLONE,
    payload: data,
});

export const getHashrootssCloneBillSuccess = (hashrootpClonebill: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_CLONE_SUCCESS,
    payload: hashrootpClonebill,
});

export const getHashrootssCloneBillFailed = (error: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_CLONE_FAILED,
    payload: error,
});


export const downloadBill = (data): HashrootssBillAction => ({
    type: HASHROOTSSBILL_DOWNLOAD_BILL,
    payload: data,
});

export const downloadBillSuccess = (downloadBill: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_DOWNLOAD_BILL_SUCCESS,
    payload: downloadBill,
});

export const downloadBillFailed = (error: string): HashrootssBillAction => ({
    type: HASHROOTSSBILL_DOWNLOAD_BILL_FAILED,
    payload: error,
});