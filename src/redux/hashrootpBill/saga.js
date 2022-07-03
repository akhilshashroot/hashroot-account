// @flow
// import { Cookies } from 'react-cookie';
// import { fetchJSON } from '../../helpers/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    HASHROOTPBILL_LIST,
    HASHROOTPBILL_ADD,
    HASHROOTPBILL_UPDATE,
    HASHROOTPBILL_DELETE,
    HASHROOTPBILL_CLONE,
    HASHROOTPBILL_DOWNLOAD_BILL,
} from './constants';

import {
    getHashrootpBillListSuccess,
    getHashrootpBillListFailed,
    getHashrootpBillAddSuccess,
    getHashrootpBillAddFailed,
    getHashrootpBillUpdateSuccess,
    getHashrootpBillUpdateFailed,
    getHashrootpBillDeleteSuccess,
    getHashrootpBillDeleteFailed,
    getHashrootpCloneBillSuccess,
    getHashrootpCloneBillFailed,
    downloadBillSuccess,
    downloadBillFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const hashrootpbillAddSucsess = () => toast.success('HashrootpBill Added Successfully', { transition: Zoom });
const hashrootpbillCloneSucsess = () => toast.success('Cloned Successfully', { transition: Zoom });
const hashrootpbillDeletedSuccess = () => toast.success('HashrootpBill Deleted Successfully', { transition: Zoom });
const hashrootpbillUpdated = () => toast.info('HashrootpBill Updated Successfully', { transition: Zoom });
// const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HashrootpBillList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewHashrootpBill,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getHashrootpBillListSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            case 404:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getHashrootpBillListFailed(message));
    }
}

// HashrootpBill Add

function* HashrootpBillAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'POST',
        url: endpoints.addHashrootpBill,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if (response.data.status) {
            hashrootpbillAddSucsess();
            yield put(getHashrootpBillAddSuccess(response.data));
        } else {
            let message;
            message = response.data.message;
            WarnFields(message);
        }
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getHashrootpBillAddFailed(message));
    }
}

// HashrootpBill Update

function* HashrootpBillUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'POST',
        url: endpoints.HashrooteditpBill,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        hashrootpbillUpdated();
        yield put(getHashrootpBillUpdateSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getHashrootpBillUpdateFailed(message));
    }
}

// HashrootpBill Delete

function* HashrootpBillDelete({ payload: id }) {
    console.log(id);
    const user = getLoggedInUser();
    let data = {
        table_name: 'hashrootp_bills',
    };
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'DELETE',
        url: endpoints.deleteHashrootpBill + '/' + id,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        hashrootpbillDeletedSuccess();
        yield put(getHashrootpBillDeleteSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getHashrootpBillDeleteFailed(message));
    }
}

// HashrootpCloneBill

function* HashrootpCloneBill({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'POST',
        url: endpoints.cloneBill,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if (response.data.status) {
            hashrootpbillCloneSucsess();
            yield put(getHashrootpCloneBillSuccess(response.data));
        } else {
            let message;
            message = response.data.message;
            WarnFields(message);
        }
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getHashrootpCloneBillFailed(message));
    }
}

function* billDownload({ payload: data }) {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.downloadBill + '/' + data.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(downloadBillSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            case 404:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(downloadBillFailed(message));
    }
}

export function* watchHashrootpBillList(): any {
    yield takeEvery(HASHROOTPBILL_LIST, HashrootpBillList);
}
export function* watchHashrootpBillAdd(): any {
    yield takeEvery(HASHROOTPBILL_ADD, HashrootpBillAdd);
}
export function* watchHashrootpBillUpdate(): any {
    yield takeEvery(HASHROOTPBILL_UPDATE, HashrootpBillUpdate);
}
export function* watchHashrootpBillDelete(): any {
    yield takeEvery(HASHROOTPBILL_DELETE, HashrootpBillDelete);
}
export function* watchHashrootpBillClone(): any {
    yield takeEvery(HASHROOTPBILL_CLONE, HashrootpCloneBill);
}
export function* watchHashrootpBillDownload(): any {
    yield takeEvery(HASHROOTPBILL_DOWNLOAD_BILL, billDownload);
}

function* authSaga(): any {
    yield all([
        fork(watchHashrootpBillList),
        fork(watchHashrootpBillAdd),
        fork(watchHashrootpBillUpdate),
        fork(watchHashrootpBillDelete),
        fork(watchHashrootpBillClone),
        fork(watchHashrootpBillDownload),
    ]);
}

export default authSaga;
