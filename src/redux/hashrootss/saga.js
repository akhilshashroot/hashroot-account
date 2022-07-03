// @flow
// import { Cookies } from 'react-cookie';
// import { fetchJSON } from '../../helpers/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    HASHROOTSSINVOICE_LIST,
    HASHROOTSSINVOICE_ADD,
    HASHROOTSSINVOICE_UPDATE,
    HASHROOTSSINVOICE_DELETE,
    HASHROOTSSINVOICE_CLONE,
    HASHROOTSSINVOICE_DOWNLOAD_INVOICE,
} from './constants';

import {
    getHashrootssInvoiceListSuccess,
    getHashrootssInvoiceListFailed,
    getHashrootssInvoiceAddSuccess,
    getHashrootssInvoiceAddFailed,
    getHashrootssInvoiceUpdateSuccess,
    getHashrootssInvoiceUpdateFailed,
    getHashrootssInvoiceDeleteSuccess,
    getHashrootssInvoiceDeleteFailed,
    getHashrootssCloneInvoiceSuccess,
    getHashrootssCloneInvoiceFailed,
    downloadInvoicessSuccess,
    downloadInvoicessFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const hashrootssinvoiceAddSucsess = () => toast.success('HashrootssInvoice Added Successfully', { transition: Zoom });
const hashrootssinvoiceCloneSucsess = () => toast.success('Cloned Successfully', { transition: Zoom });
const hashrootssinvoiceDeletedSuccess = () =>
    toast.success('HashrootssInvoice Deleted Successfully', { transition: Zoom });
const hashrootssinvoiceUpdated = () => toast.info('HashrootssInvoice Updated Successfully', { transition: Zoom });
// const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HashrootssInvoiceList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewHashrootssInvoice,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);
        
        yield put(getHashrootssInvoiceListSuccess(response.data));
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
        yield put(getHashrootssInvoiceListFailed(message));
    }
}

// HashrootssInvoice Add

function* HashrootssInvoiceAdd({ payload: data }) {
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
            hashrootssinvoiceAddSucsess();
            yield put(getHashrootssInvoiceAddSuccess(response.data));
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
        yield put(getHashrootssInvoiceAddFailed(message));
    }
}

// HashrootssInvoice Update

function* HashrootssInvoiceUpdate({ payload: data }) {
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
        hashrootssinvoiceUpdated();
        yield put(getHashrootssInvoiceUpdateSuccess(response.data));
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
        yield put(getHashrootssInvoiceUpdateFailed(message));
    }
}

// HashrootssInvoice Delete

function* HashrootssInvoiceDelete({ payload: id }) {
    const user = getLoggedInUser();
    let data = {
        table_name: 'hashrootss_invoice',
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
        hashrootssinvoiceDeletedSuccess();
        yield put(getHashrootssInvoiceDeleteSuccess(response.data));
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
        yield put(getHashrootssInvoiceDeleteFailed(message));
    }
}



// HashrootssCloneInvoice 

function* HashrootssCloneInvoice({ payload: data }) {
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
            hashrootssinvoiceCloneSucsess();
            yield put(getHashrootssCloneInvoiceSuccess(response.data));
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
        yield put(getHashrootssCloneInvoiceFailed(message));
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
        url: endpoints.downloadInvoiceSS + '/'+ data.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(downloadInvoicessSuccess(response.data));
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
        yield put(downloadInvoicessFailed(message));
    }
}

export function* watchHashrootssInvoiceList(): any {
    yield takeEvery(HASHROOTSSINVOICE_LIST, HashrootssInvoiceList);
}
export function* watchHashrootssInvoiceAdd(): any {
    yield takeEvery(HASHROOTSSINVOICE_ADD, HashrootssInvoiceAdd);
}
export function* watchHashrootssInvoiceUpdate(): any {
    yield takeEvery(HASHROOTSSINVOICE_UPDATE, HashrootssInvoiceUpdate);
}
export function* watchHashrootssInvoiceDelete(): any {
    yield takeEvery(HASHROOTSSINVOICE_DELETE, HashrootssInvoiceDelete);
}
export function* watchHashrootssInvoiceClone(): any {
    yield takeEvery(HASHROOTSSINVOICE_CLONE, HashrootssCloneInvoice);
}
export function* watchHashrootssInvoiceDownload(): any {
    yield takeEvery(HASHROOTSSINVOICE_DOWNLOAD_INVOICE, invoiceDownload);
}

function* authSaga(): any {
    yield all([
        fork(watchHashrootssInvoiceList),
        fork(watchHashrootssInvoiceAdd),
        fork(watchHashrootssInvoiceUpdate),
        fork(watchHashrootssInvoiceDelete),
        fork(watchHashrootssInvoiceClone),
        fork(watchHashrootssInvoiceDownload),
    ]);
}

export default authSaga;
