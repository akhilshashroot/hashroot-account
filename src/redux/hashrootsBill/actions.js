// @flow
import {
    HASHROOTSBILL_LIST,
    HASHROOTSBILL_LIST_SUCCESS,
    HASHROOTSBILL_LIST_FAILED,
    HASHROOTSBILL_ADD,
    HASHROOTSBILL_ADD_SUCCESS,
    HASHROOTSBILL_ADD_FAILED,
    HASHROOTSBILL_UPDATE,
    HASHROOTSBILL_UPDATE_SUCCESS,
    HASHROOTSBILL_UPDATE_FAILED,
    HASHROOTSBILL_DELETE,
    HASHROOTSBILL_DELETE_SUCCESS,
    HASHROOTSBILL_DELETE_FAILED,
    HASHROOTSBILL_CLONE,
    HASHROOTSBILL_CLONE_SUCCESS,
    HASHROOTSBILL_CLONE_FAILED,
    HASHROOTSBILL_DOWNLOAD_BILL,
    HASHROOTSBILL_DOWNLOAD_BILL_SUCCESS,
    HASHROOTSBILL_DOWNLOAD_BILL_FAILED
} from './constants';

type HashrootsBillAction = { type: string, payload: {} | string };

export const getHashrootsBillList = (): HashrootsBillAction => ({
    type: HASHROOTSBILL_LIST,
    payload: {},
});

export const getHashrootsBillListSuccess = (hashrootpbill: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_LIST_SUCCESS,
    payload: hashrootpbill,
});

export const getHashrootsBillListFailed = (error: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_LIST_FAILED,
    payload: error,
});

export const getHashrootsBillAdd = (data:{}): HashrootsBillAction => ({
    type: HASHROOTSBILL_ADD,
    payload: data,
});

export const getHashrootsBillAddSuccess = (hashrootpbillAdd: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_ADD_SUCCESS,
    payload: hashrootpbillAdd,
});

export const getHashrootsBillAddFailed = (error: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_ADD_FAILED,
    payload: error,
});

export const getHashrootsBillUpdate = (data:{}): HashrootsBillAction => ({
    type: HASHROOTSBILL_UPDATE,
    payload: data,
});

export const getHashrootsBillUpdateSuccess = (hashrootpbillUpdate: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_UPDATE_SUCCESS,
    payload: hashrootpbillUpdate,
});

export const getHashrootsBillUpdateFailed = (error: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_UPDATE_FAILED,
    payload: error,
});

export const getHashrootsBillDelete = (id): HashrootsBillAction => ({
    type: HASHROOTSBILL_DELETE,
    payload: id,
});

export const getHashrootsBillDeleteSuccess = (hashrootpbillDelete: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_DELETE_SUCCESS,
    payload: hashrootpbillDelete,
});

export const getHashrootsBillDeleteFailed = (error: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_DELETE_FAILED,
    payload: error,
});

export const getHashrootsCloneBill = (data:{}): HashrootsBillAction => ({
    type: HASHROOTSBILL_CLONE,
    payload: data,
});

export const getHashrootsCloneBillSuccess = (hashrootpClonebill: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_CLONE_SUCCESS,
    payload: hashrootpClonebill,
});

export const getHashrootsCloneBillFailed = (error: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_CLONE_FAILED,
    payload: error,
});


export const downloadBill = (data): HashrootsBillAction => ({
    type: HASHROOTSBILL_DOWNLOAD_BILL,
    payload: data,
});

export const downloadBillSuccess = (downloadBill: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_DOWNLOAD_BILL_SUCCESS,
    payload: downloadBill,
});

export const downloadBillFailed = (error: string): HashrootsBillAction => ({
    type: HASHROOTSBILL_DOWNLOAD_BILL_FAILED,
    payload: error,
});