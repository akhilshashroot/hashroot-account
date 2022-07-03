// @flow
// import { Cookies } from 'react-cookie';
// import { fetchJSON } from '../../helpers/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    HASHROOTSINVOICE_LIST,
    HASHROOTSINVOICE_ADD,
    HASHROOTSINVOICE_UPDATE,
    HASHROOTSINVOICE_DELETE,
    HASHROOTSINVOICE_CLONE,
    HASHROOTSINVOICE_DOWNLOAD_INVOICE,
} from './constants';

import {
    getHashrootsInvoiceListSuccess,
    getHashrootsInvoiceListFailed,
    getHashrootsInvoiceAddSuccess,
    getHashrootsInvoiceAddFailed,
    getHashrootsInvoiceUpdateSuccess,
    getHashrootsInvoiceUpdateFailed,
    getHashrootsInvoiceDeleteSuccess,
    getHashrootsInvoiceDeleteFailed,
    getHashrootsCloneInvoiceSuccess,
    getHashrootsCloneInvoiceFailed,
    downloadInvoicesSuccess,
    downloadInvoicesFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const hashrootsinvoiceAddSucsess = () => toast.success('HashrootsInvoice Added Successfully', { transition: Zoom });
const hashrootsinvoiceCloneSucsess = () => toast.success('Cloned Successfully', { transition: Zoom });
const hashrootsinvoiceDeletedSuccess = () =>
    toast.success('HashrootsInvoice Deleted Successfully', { transition: Zoom });
const hashrootsinvoiceUpdated = () => toast.info('HashrootsInvoice Updated Successfully', { transition: Zoom });
// const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HashrootsInvoiceList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewHashrootsInvoice,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getHashrootsInvoiceListSuccess(response.data));
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
        yield put(getHashrootsInvoiceListFailed(message));
    }
}

// HashrootsInvoice Add

function* HashrootsInvoiceAdd({ payload: data }) {
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
            hashrootsinvoiceAddSucsess();
            yield put(getHashrootsInvoiceAddSuccess(response.data));
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
        yield put(getHashrootsInvoiceAddFailed(message));
    }
}

// HashrootsInvoice Update

function* HashrootsInvoiceUpdate({ payload: data }) {
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
        hashrootsinvoiceUpdated();
        yield put(getHashrootsInvoiceUpdateSuccess(response.data));
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
        yield put(getHashrootsInvoiceUpdateFailed(message));
    }
}

// HashrootsInvoice Delete

function* HashrootsInvoiceDelete({ payload: id }) {
    const user = getLoggedInUser();
    let data = {
        table_name: 'hashroots_invoice',
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
        hashrootsinvoiceDeletedSuccess();
        yield put(getHashrootsInvoiceDeleteSuccess(response.data));
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
        yield put(getHashrootsInvoiceDeleteFailed(message));
    }
}



// HashrootsCloneInvoice 

function* HashrootsCloneInvoice({ payload: data }) {
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
            hashrootsinvoiceCloneSucsess();
            yield put(getHashrootsCloneInvoiceSuccess(response.data));
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
        yield put(getHashrootsCloneInvoiceFailed(message));
    }
}


function* invoiceDownloadS({ payload: data }) {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.downloadInvoiceS + '/'+ data.id,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(downloadInvoicesSuccess(response.data));
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
        yield put(downloadInvoicesFailed(message));
    }
}

export function* watchHashrootsInvoiceList(): any {
    yield takeEvery(HASHROOTSINVOICE_LIST, HashrootsInvoiceList);
}
export function* watchHashrootsInvoiceAdd(): any {
    yield takeEvery(HASHROOTSINVOICE_ADD, HashrootsInvoiceAdd);
}
export function* watchHashrootsInvoiceUpdate(): any {
    yield takeEvery(HASHROOTSINVOICE_UPDATE, HashrootsInvoiceUpdate);
}
export function* watchHashrootsInvoiceDelete(): any {
    yield takeEvery(HASHROOTSINVOICE_DELETE, HashrootsInvoiceDelete);
}
export function* watchHashrootsInvoiceClone(): any {
    yield takeEvery(HASHROOTSINVOICE_CLONE, HashrootsCloneInvoice);
}
export function* watchHashrootsInvoiceDownload(): any {
    yield takeEvery(HASHROOTSINVOICE_DOWNLOAD_INVOICE, invoiceDownloadS);
}

function* authSaga(): any {
    yield all([
        fork(watchHashrootsInvoiceList),
        fork(watchHashrootsInvoiceAdd),
        fork(watchHashrootsInvoiceUpdate),
        fork(watchHashrootsInvoiceDelete),
        fork(watchHashrootsInvoiceClone),
        fork(watchHashrootsInvoiceDownload),
    ]);
}

export default authSaga;
