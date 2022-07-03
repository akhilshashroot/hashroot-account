// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import HashrootInvoice from './hashrootInvoice/reducers';
import Hashrootp from './hashrootp/reducers';
import Hashrootss from './hashrootss/reducers';
import Hashroots from './hashroots/reducers';
import HashrootpBill from './hashrootpBill/reducers';
import HashrootsBill from './hashrootsBill/reducers';
import HashrootssBill from './hashrootssBill/reducers';
import HashrootBill from './hashrootBill/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    HashrootInvoice,
    Hashrootp,
    Hashroots,
    Hashrootss,
    HashrootpBill,
    HashrootsBill,
    HashrootssBill,
    HashrootBill
});
