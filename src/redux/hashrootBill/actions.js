// @flow
import {
    HASHROOTBILL_LIST,
    HASHROOTBILL_LIST_SUCCESS,
    HASHROOTBILL_LIST_FAILED,
    HASHROOTBILL_ADD,
    HASHROOTBILL_ADD_SUCCESS,
    HASHROOTBILL_ADD_FAILED,
    HASHROOTBILL_UPDATE,
    HASHROOTBILL_UPDATE_SUCCESS,
    HASHROOTBILL_UPDATE_FAILED,
    HASHROOTBILL_DELETE,
    HASHROOTBILL_DELETE_SUCCESS,
    HASHROOTBILL_DELETE_FAILED,
    HASHROOTBILL_CLONE,
    HASHROOTBILL_CLONE_SUCCESS,
    HASHROOTBILL_CLONE_FAILED,
    HASHROOTBILL_DOWNLOAD_BILL,
    HASHROOTBILL_DOWNLOAD_BILL_SUCCESS,
    HASHROOTBILL_DOWNLOAD_BILL_FAILED
} from './constants';

type HashrootBillAction = { type: string, payload: {} | string };

export const getHashrootBillList = (): HashrootBillAction => ({
    type: HASHROOTBILL_LIST,
    payload: {},
});

export const getHashrootBillListSuccess = (Hashrootbill: string): HashrootBillAction => ({
    type: HASHROOTBILL_LIST_SUCCESS,
    payload: Hashrootbill,
});

export const getHashrootBillListFailed = (error: string): HashrootBillAction => ({
    type: HASHROOTBILL_LIST_FAILED,
    payload: error,
});

export const getHashrootBillAdd = (data:{}): HashrootBillAction => ({
    type: HASHROOTBILL_ADD,
    payload: data,
});

export const getHashrootBillAddSuccess = (HashrootbillAdd: string): HashrootBillAction => ({
    type: HASHROOTBILL_ADD_SUCCESS,
    payload: HashrootbillAdd,
});

export const getHashrootBillAddFailed = (error: string): HashrootBillAction => ({
    type: HASHROOTBILL_ADD_FAILED,
    payload: error,
});

export const getHashrootBillUpdate = (data:{}): HashrootBillAction => ({
    type: HASHROOTBILL_UPDATE,
    payload: data,
});

export const getHashrootBillUpdateSuccess = (HashrootbillUpdate: string): HashrootBillAction => ({
    type: HASHROOTBILL_UPDATE_SUCCESS,
    payload: HashrootbillUpdate,
});

export const getHashrootBillUpdateFailed = (error: string): HashrootBillAction => ({
    type: HASHROOTBILL_UPDATE_FAILED,
    payload: error,
});

export const getHashrootBillDelete = (id): HashrootBillAction => ({
    type: HASHROOTBILL_DELETE,
    payload: id,
});

export const getHashrootBillDeleteSuccess = (HashrootbillDelete: string): HashrootBillAction => ({
    type: HASHROOTBILL_DELETE_SUCCESS,
    payload: HashrootbillDelete,
});

export const getHashrootBillDeleteFailed = (error: string): HashrootBillAction => ({
    type: HASHROOTBILL_DELETE_FAILED,
    payload: error,
});

export const getHashrootCloneBill = (data:{}): HashrootBillAction => ({
    type: HASHROOTBILL_CLONE,
    payload: data,
});

export const getHashrootCloneBillSuccess = (HashrootClonebill: string): HashrootBillAction => ({
    type: HASHROOTBILL_CLONE_SUCCESS,
    payload: HashrootClonebill,
});

export const getHashrootCloneBillFailed = (error: string): HashrootBillAction => ({
    type: HASHROOTBILL_CLONE_FAILED,
    payload: error,
});


export const downloadBill = (data): HashrootBillAction => ({
    type: HASHROOTBILL_DOWNLOAD_BILL,
    payload: data,
});

export const downloadBillSuccess = (downloadBill: string): HashrootBillAction => ({
    type: HASHROOTBILL_DOWNLOAD_BILL_SUCCESS,
    payload: downloadBill,
});

export const downloadBillFailed = (error: string): HashrootBillAction => ({
    type: HASHROOTBILL_DOWNLOAD_BILL_FAILED,
    payload: error,
});