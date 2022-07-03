// @flow
// import { Cookies } from 'react-cookie';
// import { fetchJSON } from '../../helpers/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    HASHROOTSBILL_LIST,
    HASHROOTSBILL_ADD,
    HASHROOTSBILL_UPDATE,
    HASHROOTSBILL_DELETE,
    HASHROOTSBILL_CLONE,
    HASHROOTSBILL_DOWNLOAD_BILL,
} from './constants';

import {
    getHashrootsBillListSuccess,
    getHashrootsBillListFailed,
    getHashrootsBillAddSuccess,
    getHashrootsBillAddFailed,
    getHashrootsBillUpdateSuccess,
    getHashrootsBillUpdateFailed,
    getHashrootsBillDeleteSuccess,
    getHashrootsBillDeleteFailed,
    getHashrootsCloneBillSuccess,
    getHashrootsCloneBillFailed,
    downloadBillSuccess,
    downloadBillFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const hashrootpbillAddSucsess = () => toast.success('HashrootsBill Added Successfully', { transition: Zoom });
const hashrootpbillCloneSucsess = () => toast.success('Cloned Successfully', { transition: Zoom });
const hashrootpbillDeletedSuccess = () => toast.success('HashrootsBill Deleted Successfully', { transition: Zoom });
const hashrootpbillUpdated = () => toast.info('HashrootsBill Updated Successfully', { transition: Zoom });
// const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HashrootsBillList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewHashrootsBill,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getHashrootsBillListSuccess(response.data));
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
        yield put(getHashrootsBillListFailed(message));
    }
}

// HashrootsBill Add

function* HashrootsBillAdd({ payload: data }) {
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
            yield put(getHashrootsBillAddSuccess(response.data));
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
        yield put(getHashrootsBillAddFailed(message));
    }
}

// HashrootsBill Update

function* HashrootsBillUpdate({ payload: data }) {
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
        yield put(getHashrootsBillUpdateSuccess(response.data));
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
        yield put(getHashrootsBillUpdateFailed(message));
    }
}

// HashrootsBill Delete

function* HashrootsBillDelete({ payload: id }) {
    console.log(id);
    const user = getLoggedInUser();
    let data = {
        table_name: 'hashroots_bills',
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
        yield put(getHashrootsBillDeleteSuccess(response.data));
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
        yield put(getHashrootsBillDeleteFailed(message));
    }
}

// HashrootsCloneBill

function* HashrootsCloneBill({ payload: data }) {
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
            yield put(getHashrootsCloneBillSuccess(response.data));
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
        yield put(getHashrootsCloneBillFailed(message));
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

export function* watchHashrootsBillList(): any {
    yield takeEvery(HASHROOTSBILL_LIST, HashrootsBillList);
}
export function* watchHashrootsBillAdd(): any {
    yield takeEvery(HASHROOTSBILL_ADD, HashrootsBillAdd);
}
export function* watchHashrootsBillUpdate(): any {
    yield takeEvery(HASHROOTSBILL_UPDATE, HashrootsBillUpdate);
}
export function* watchHashrootsBillDelete(): any {
    yield takeEvery(HASHROOTSBILL_DELETE, HashrootsBillDelete);
}
export function* watchHashrootsBillClone(): any {
    yield takeEvery(HASHROOTSBILL_CLONE, HashrootsCloneBill);
}
export function* watchHashrootsBillDownload(): any {
    yield takeEvery(HASHROOTSBILL_DOWNLOAD_BILL, billDownload);
}

function* authSaga(): any {
    yield all([
        fork(watchHashrootsBillList),
        fork(watchHashrootsBillAdd),
        fork(watchHashrootsBillUpdate),
        fork(watchHashrootsBillDelete),
        fork(watchHashrootsBillClone),
        fork(watchHashrootsBillDownload),
    ]);
}

export default authSaga;
