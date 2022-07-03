// @flow
import {
    HASHROOTPBILL_LIST,
    HASHROOTPBILL_LIST_SUCCESS,
    HASHROOTPBILL_LIST_FAILED,
    HASHROOTPBILL_ADD,
    HASHROOTPBILL_ADD_SUCCESS,
    HASHROOTPBILL_ADD_FAILED,
    HASHROOTPBILL_UPDATE,
    HASHROOTPBILL_UPDATE_SUCCESS,
    HASHROOTPBILL_UPDATE_FAILED,
    HASHROOTPBILL_DELETE,
    HASHROOTPBILL_DELETE_SUCCESS,
    HASHROOTPBILL_DELETE_FAILED,
    HASHROOTPBILL_CLONE,
    HASHROOTPBILL_CLONE_SUCCESS,
    HASHROOTPBILL_CLONE_FAILED,
    HASHROOTPBILL_DOWNLOAD_BILL,
    HASHROOTPBILL_DOWNLOAD_BILL_SUCCESS,
    HASHROOTPBILL_DOWNLOAD_BILL_FAILED
} from './constants';

type HashrootpBillAction = { type: string, payload: {} | string };

export const getHashrootpBillList = (): HashrootpBillAction => ({
    type: HASHROOTPBILL_LIST,
    payload: {},
});

export const getHashrootpBillListSuccess = (hashrootpbill: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_LIST_SUCCESS,
    payload: hashrootpbill,
});

export const getHashrootpBillListFailed = (error: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_LIST_FAILED,
    payload: error,
});

export const getHashrootpBillAdd = (data:{}): HashrootpBillAction => ({
    type: HASHROOTPBILL_ADD,
    payload: data,
});

export const getHashrootpBillAddSuccess = (hashrootpbillAdd: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_ADD_SUCCESS,
    payload: hashrootpbillAdd,
});

export const getHashrootpBillAddFailed = (error: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_ADD_FAILED,
    payload: error,
});

export const getHashrootpBillUpdate = (data:{}): HashrootpBillAction => ({
    type: HASHROOTPBILL_UPDATE,
    payload: data,
});

export const getHashrootpBillUpdateSuccess = (hashrootpbillUpdate: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_UPDATE_SUCCESS,
    payload: hashrootpbillUpdate,
});

export const getHashrootpBillUpdateFailed = (error: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_UPDATE_FAILED,
    payload: error,
});

export const getHashrootpBillDelete = (id): HashrootpBillAction => ({
    type: HASHROOTPBILL_DELETE,
    payload: id,
});

export const getHashrootpBillDeleteSuccess = (hashrootpbillDelete: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_DELETE_SUCCESS,
    payload: hashrootpbillDelete,
});

export const getHashrootpBillDeleteFailed = (error: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_DELETE_FAILED,
    payload: error,
});

export const getHashrootpCloneBill = (data:{}): HashrootpBillAction => ({
    type: HASHROOTPBILL_CLONE,
    payload: data,
});

export const getHashrootpCloneBillSuccess = (hashrootpClonebill: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_CLONE_SUCCESS,
    payload: hashrootpClonebill,
});

export const getHashrootpCloneBillFailed = (error: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_CLONE_FAILED,
    payload: error,
});


export const downloadBill = (data): HashrootpBillAction => ({
    type: HASHROOTPBILL_DOWNLOAD_BILL,
    payload: data,
});

export const downloadBillSuccess = (downloadBill: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_DOWNLOAD_BILL_SUCCESS,
    payload: downloadBill,
});

export const downloadBillFailed = (error: string): HashrootpBillAction => ({
    type: HASHROOTPBILL_DOWNLOAD_BILL_FAILED,
    payload: error,
});