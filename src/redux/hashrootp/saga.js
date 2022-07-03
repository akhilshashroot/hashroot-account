// @flow
// import { Cookies } from 'react-cookie';
// import { fetchJSON } from '../../helpers/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    HASHROOTPINVOICE_LIST,
    HASHROOTPINVOICE_ADD,
    HASHROOTPINVOICE_UPDATE,
    HASHROOTPINVOICE_DELETE,
    HASHROOTPINVOICE_CLONE,
    HASHROOTPINVOICE_DOWNLOAD_INVOICE,
} from './constants';

import {
    getHashrootpInvoiceListSuccess,
    getHashrootpInvoiceListFailed,
    getHashrootpInvoiceAddSuccess,
    getHashrootpInvoiceAddFailed,
    getHashrootpInvoiceUpdateSuccess,
    getHashrootpInvoiceUpdateFailed,
    getHashrootpInvoiceDeleteSuccess,
    getHashrootpInvoiceDeleteFailed,
    getHashrootpCloneInvoiceSuccess,
    getHashrootpCloneInvoiceFailed,
    downloadInvoiceSuccess,
    downloadInvoiceFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const hashrootpinvoiceAddSucsess = () => toast.success('HashrootpInvoice Added Successfully', { transition: Zoom });
const hashrootpinvoiceCloneSucsess = () => toast.success('Cloned Successfully', { transition: Zoom });
const hashrootpinvoiceDeletedSuccess = () =>
    toast.success('HashrootpInvoice Deleted Successfully', { transition: Zoom });
const hashrootpinvoiceUpdated = () => toast.info('HashrootpInvoice Updated Successfully', { transition: Zoom });
// const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HashrootpInvoiceList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewHashrootpInvoice,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getHashrootpInvoiceListSuccess(response.data));
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
        yield put(getHashrootpInvoiceListFailed(message));
    }
}

// HashrootpInvoice Add

function* HashrootpInvoiceAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'POST',
        url: endpoints.addHashrootInvoice,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if (response.data.status) {
            hashrootpinvoiceAddSucsess();
            yield put(getHashrootpInvoiceAddSuccess(response.data));
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
        yield put(getHashrootpInvoiceAddFailed(message));
    }
}

// HashrootpInvoice Update

function* HashrootpInvoiceUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'POST',
        url: endpoints.HashrooteditpInvoice,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        hashrootpinvoiceUpdated();
        yield put(getHashrootpInvoiceUpdateSuccess(response.data));
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
        yield put(getHashrootpInvoiceUpdateFailed(message));
    }
}

// HashrootpInvoice Delete

function* HashrootpInvoiceDelete({ payload: id }) {
    const user = getLoggedInUser();
    let data = {
        table_name: 'hashrootp_invoice',
    };
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'DELETE',
        url: endpoints.deleteHashrootpInvoice + '/' + id,
        data: data,
    };


    try {
        const response = yield call(ApiCall, options);
        hashrootpinvoiceDeletedSuccess();
        yield put(getHashrootpInvoiceDeleteSuccess(response.data));
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
        yield put(getHashrootpInvoiceDeleteFailed(message));
    }
}



// HashrootpCloneInvoice 

function* HashrootpCloneInvoice({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'POST',
        url: endpoints.cloneInvoice,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        if (response.data.status) {
            hashrootpinvoiceCloneSucsess();
            yield put(getHashrootpCloneInvoiceSuccess(response.data));
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
        yield put(getHashrootpCloneInvoiceFailed(message));
    }
}


function* invoiceDownload({ payload: data }) {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.downloadInvoice + '/'+ data.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(downloadInvoiceSuccess(response.data));
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
        yield put(downloadInvoiceFailed(message));
    }
}

export function* watchHashrootpInvoiceList(): any {
    yield takeEvery(HASHROOTPINVOICE_LIST, HashrootpInvoiceList);
}
export function* watchHashrootpInvoiceAdd(): any {
    yield takeEvery(HASHROOTPINVOICE_ADD, HashrootpInvoiceAdd);
}
export function* watchHashrootpInvoiceUpdate(): any {
    yield takeEvery(HASHROOTPINVOICE_UPDATE, HashrootpInvoiceUpdate);
}
export function* watchHashrootpInvoiceDelete(): any {
    yield takeEvery(HASHROOTPINVOICE_DELETE, HashrootpInvoiceDelete);
}
export function* watchHashrootpInvoiceClone(): any {
    yield takeEvery(HASHROOTPINVOICE_CLONE, HashrootpCloneInvoice);
}
export function* watchHashrootpInvoiceDownload(): any {
    yield takeEvery(HASHROOTPINVOICE_DOWNLOAD_INVOICE, invoiceDownload);
}

function* authSaga(): any {
    yield all([
        fork(watchHashrootpInvoiceList),
        fork(watchHashrootpInvoiceAdd),
        fork(watchHashrootpInvoiceUpdate),
        fork(watchHashrootpInvoiceDelete),
        fork(watchHashrootpInvoiceClone),
        fork(watchHashrootpInvoiceDownload),
    ]);
}

export default authSaga;
