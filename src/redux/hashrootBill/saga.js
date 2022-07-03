// @flow
// import { Cookies } from 'react-cookie';
// import { fetchJSON } from '../../helpers/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    HASHROOTBILL_LIST,
    HASHROOTBILL_ADD,
    HASHROOTBILL_UPDATE,
    HASHROOTBILL_DELETE,
    HASHROOTBILL_CLONE,
    HASHROOTBILL_DOWNLOAD_BILL,
} from './constants';

import {
    getHashrootBillListSuccess,
    getHashrootBillListFailed,
    getHashrootBillAddSuccess,
    getHashrootBillAddFailed,
    getHashrootBillUpdateSuccess,
    getHashrootBillUpdateFailed,
    getHashrootBillDeleteSuccess,
    getHashrootBillDeleteFailed,
    getHashrootCloneBillSuccess,
    getHashrootCloneBillFailed,
    downloadBillSuccess,
    downloadBillFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const HashrootbillAddSucsess = () => toast.success('HashrootBill Added Successfully', { transition: Zoom });
const HashrootbillCloneSucsess = () => toast.success('Cloned Successfully', { transition: Zoom });
const HashrootbillDeletedSuccess = () => toast.success('HashrootBill Deleted Successfully', { transition: Zoom });
const HashrootbillUpdated = () => toast.info('HashrootBill Updated Successfully', { transition: Zoom });
// const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HashrootBillList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewHashrootBill,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getHashrootBillListSuccess(response.data));
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
        yield put(getHashrootBillListFailed(message));
    }
}

// HashrootBill Add

function* HashrootBillAdd({ payload: data }) {
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
            HashrootbillAddSucsess();
            yield put(getHashrootBillAddSuccess(response.data));
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
        yield put(getHashrootBillAddFailed(message));
    }
}

// HashrootBill Update

function* HashrootBillUpdate({ payload: data }) {
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
        HashrootbillUpdated();
        yield put(getHashrootBillUpdateSuccess(response.data));
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
        yield put(getHashrootBillUpdateFailed(message));
    }
}

// HashrootBill Delete

function* HashrootBillDelete({ payload: id }) {
    console.log(id);
    const user = getLoggedInUser();
    let data = {
        table_name: 'hashroot_bills',
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
        HashrootbillDeletedSuccess();
        yield put(getHashrootBillDeleteSuccess(response.data));
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
        yield put(getHashrootBillDeleteFailed(message));
    }
}

// HashrootCloneBill

function* HashrootCloneBill({ payload: data }) {
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
            HashrootbillCloneSucsess();
            yield put(getHashrootCloneBillSuccess(response.data));
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
        yield put(getHashrootCloneBillFailed(message));
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

export function* watchHashrootBillList(): any {
    yield takeEvery(HASHROOTBILL_LIST, HashrootBillList);
}
export function* watchHashrootBillAdd(): any {
    yield takeEvery(HASHROOTBILL_ADD, HashrootBillAdd);
}
export function* watchHashrootBillUpdate(): any {
    yield takeEvery(HASHROOTBILL_UPDATE, HashrootBillUpdate);
}
export function* watchHashrootBillDelete(): any {
    yield takeEvery(HASHROOTBILL_DELETE, HashrootBillDelete);
}
export function* watchHashrootBillClone(): any {
    yield takeEvery(HASHROOTBILL_CLONE, HashrootCloneBill);
}
export function* watchHashrootBillDownload(): any {
    yield takeEvery(HASHROOTBILL_DOWNLOAD_BILL, billDownload);
}

function* authSaga(): any {
    yield all([
        fork(watchHashrootBillList),
        fork(watchHashrootBillAdd),
        fork(watchHashrootBillUpdate),
        fork(watchHashrootBillDelete),
        fork(watchHashrootBillClone),
        fork(watchHashrootBillDownload),
    ]);
}

export default authSaga;
