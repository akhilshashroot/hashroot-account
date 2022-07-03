// @flow
// import { Cookies } from 'react-cookie';
// import { fetchJSON } from '../../helpers/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    HASHROOTSSBILL_LIST,
    HASHROOTSSBILL_ADD,
    HASHROOTSSBILL_UPDATE,
    HASHROOTSSBILL_DELETE,
    HASHROOTSSBILL_CLONE,
    HASHROOTSSBILL_DOWNLOAD_BILL,
} from './constants';

import {
    getHashrootssBillListSuccess,
    getHashrootssBillListFailed,
    getHashrootssBillAddSuccess,
    getHashrootssBillAddFailed,
    getHashrootssBillUpdateSuccess,
    getHashrootssBillUpdateFailed,
    getHashrootssBillDeleteSuccess,
    getHashrootssBillDeleteFailed,
    getHashrootssCloneBillSuccess,
    getHashrootssCloneBillFailed,
    downloadBillSuccess,
    downloadBillFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const hashrootpbillAddSucsess = () => toast.success('HashrootssBill Added Successfully', { transition: Zoom });
const hashrootpbillCloneSucsess = () => toast.success('Cloned Successfully', { transition: Zoom });
const hashrootpbillDeletedSuccess = () => toast.success('HashrootssBill Deleted Successfully', { transition: Zoom });
const hashrootpbillUpdated = () => toast.info('HashrootssBill Updated Successfully', { transition: Zoom });
// const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HashrootssBillList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewHashrootssBill,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getHashrootssBillListSuccess(response.data));
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
        yield put(getHashrootssBillListFailed(message));
    }
}

// HashrootssBill Add

function* HashrootssBillAdd({ payload: data }) {
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
            yield put(getHashrootssBillAddSuccess(response.data));
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
        yield put(getHashrootssBillAddFailed(message));
    }
}

// HashrootssBill Update

function* HashrootssBillUpdate({ payload: data }) {
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
        yield put(getHashrootssBillUpdateSuccess(response.data));
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
        yield put(getHashrootssBillUpdateFailed(message));
    }
}

// HashrootssBill Delete

function* HashrootssBillDelete({ payload: id }) {
    console.log(id);
    const user = getLoggedInUser();
    let data = {
        table_name: 'hashrootss_bills',
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
        yield put(getHashrootssBillDeleteSuccess(response.data));
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
        yield put(getHashrootssBillDeleteFailed(message));
    }
}

// HashrootssCloneBill

function* HashrootssCloneBill({ payload: data }) {
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
            yield put(getHashrootssCloneBillSuccess(response.data));
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
        yield put(getHashrootssCloneBillFailed(message));
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

export function* watchHashrootssBillList(): any {
    yield takeEvery(HASHROOTSSBILL_LIST, HashrootssBillList);
}
export function* watchHashrootssBillAdd(): any {
    yield takeEvery(HASHROOTSSBILL_ADD, HashrootssBillAdd);
}
export function* watchHashrootssBillUpdate(): any {
    yield takeEvery(HASHROOTSSBILL_UPDATE, HashrootssBillUpdate);
}
export function* watchHashrootssBillDelete(): any {
    yield takeEvery(HASHROOTSSBILL_DELETE, HashrootssBillDelete);
}
export function* watchHashrootssBillClone(): any {
    yield takeEvery(HASHROOTSSBILL_CLONE, HashrootssCloneBill);
}
export function* watchHashrootssBillDownload(): any {
    yield takeEvery(HASHROOTSSBILL_DOWNLOAD_BILL, billDownload);
}

function* authSaga(): any {
    yield all([
        fork(watchHashrootssBillList),
        fork(watchHashrootssBillAdd),
        fork(watchHashrootssBillUpdate),
        fork(watchHashrootssBillDelete),
        fork(watchHashrootssBillClone),
        fork(watchHashrootssBillDownload),
    ]);
}

export default authSaga;
