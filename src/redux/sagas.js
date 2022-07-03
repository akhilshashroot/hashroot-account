// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import hashrootInvoiceSaga from './hashrootInvoice/saga';
import hashrootpSaga from './hashrootp/saga';
import hashrootsSaga from './hashroots/saga';
import hashrootssSaga from './hashrootss/saga';
import hashrootpBillSaga from './hashrootpBill/saga';
import hashrootsBillSaga from './hashrootsBill/saga';
import hashrootssBillSaga from './hashrootssBill/saga';
import hashrootBillSaga from './hashrootBill/saga';

export default function* rootSaga(getState: any): any {
    yield all([
        authSaga(),
        layoutSaga(),
        appMenuSaga(),
        hashrootInvoiceSaga(),
        hashrootpSaga(),
        hashrootsSaga(),
        hashrootssSaga(),
        hashrootpBillSaga(),
        hashrootsBillSaga(),
        hashrootssBillSaga(),
        hashrootBillSaga()
    ]);
}
