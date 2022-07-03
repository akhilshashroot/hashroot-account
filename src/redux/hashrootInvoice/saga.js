// @flow
// import { Cookies } from 'react-cookie';
// import { fetchJSON } from '../../helpers/api';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HASHROOTINVOICE_LIST, HASHROOTINVOICE_ADD, HASHROOTINVOICE_UPDATE, HASHROOTINVOICE_DELETE } from './constants';

import {
    getHashrootInvoiceListSuccess,
    getHashrootInvoiceListFailed,
    getHashrootInvoiceAddSuccess,
    getHashrootInvoiceAddFailed,
    getHashrootInvoiceUpdateSuccess,
    getHashrootInvoiceUpdateFailed,
    getHashrootInvoiceDeleteSuccess,
    getHashrootInvoiceDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const hashrootinvoiceAddedSucsess = () => toast.success('HashrootInvoice Added Successfully', { transition: Zoom });
const hashrootinvoiceDeletedSuccess = () => toast.success('HashrootInvoice Deleted Successfully', { transition: Zoom });
const hashrootinvoiceUpdated = () => toast.info('HashrootInvoice Updated Successfully', { transition: Zoom });
// const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* HashrootInvoiceList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.data.token,
        },
        method: 'GET',
        url: endpoints.viewHashrootInvoice,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);

        yield put(getHashrootInvoiceListSuccess(response.data));
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
        yield put(getHashrootInvoiceListFailed(message));
    }
}

// HashrootInvoice Add

function* HashrootInvoiceAdd({ payload: data }) {
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
        if(response.data.status){
            hashrootinvoiceAddedSucsess();
            yield put(getHashrootInvoiceAddSuccess(response.data));
        }else{
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
        yield put(getHashrootInvoiceAddFailed(message));
    }
}

// HashrootInvoice Update

function* HashrootInvoiceUpdate({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'PUT',
        url: endpoints.hashrootinvoiceUpdate + '/' + (data && data.dep_id),
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
        hashrootinvoiceUpdated();
        yield put(getHashrootInvoiceUpdateSuccess(response.data));
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
        yield put(getHashrootInvoiceUpdateFailed(message));
    }
}

// HashrootInvoice Delete

function* HashrootInvoiceDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        method: 'DELETE',
        url: endpoints.hashrootinvoiceDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        hashrootinvoiceDeletedSuccess();
        yield put(getHashrootInvoiceDeleteSuccess(response.data));
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
        yield put(getHashrootInvoiceDeleteFailed(message));
    }
}

export function* watchHashrootInvoiceList(): any {
    yield takeEvery(HASHROOTINVOICE_LIST, HashrootInvoiceList);
}
export function* watchHashrootInvoiceAdd(): any {
    yield takeEvery(HASHROOTINVOICE_ADD, HashrootInvoiceAdd);
}
export function* watchHashrootInvoiceUpdate(): any {
    yield takeEvery(HASHROOTINVOICE_UPDATE, HashrootInvoiceUpdate);
}
export function* watchHashrootInvoiceDelete(): any {
    yield takeEvery(HASHROOTINVOICE_DELETE, HashrootInvoiceDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchHashrootInvoiceList),
        fork(watchHashrootInvoiceAdd),
        fork(watchHashrootInvoiceUpdate),
        fork(watchHashrootInvoiceDelete),
    ]);
}

export default authSaga;
