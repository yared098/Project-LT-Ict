import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import ProjectStatusSaga from "./projects/saga";
import calendarSaga from "./calendar/saga";
// import chatSaga from "./chat/saga";
// import cryptoSaga from "./crypto/saga";
import invoiceSaga from "./invoices/saga";
// import jobsSaga from "./jobs/saga";
// import projectsSaga from "./projects/saga";
import tasksSaga from "./tasks/saga";
import mailsSaga from "./mails/saga";
import contactsSaga from "./contacts/saga";

import watchSearchSaga from "./search/sagas";
import treeSaga from "./tree/saga";
import Departmentsaga from './department/saga';
import BudgetSourcesaga from './budgetsource/saga';


export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(ProjectStatusSaga),
    fork(calendarSaga),
    
    fork(mailsSaga),
  
    fork(invoiceSaga),
 
    fork(tasksSaga),
    fork(contactsSaga),
   
    fork(watchSearchSaga),
    fork(treeSaga),
    fork(Departmentsaga),
    fork(BudgetSourcesaga)

  ]);
}
