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
import BudgetSourceSaga from './budgetsource/saga';
import Departmentsaga from './department/saga';

import AddressStructuresaga from './addressstructure/saga';
import BudgetRequestsaga from './budgetrequest/saga';
import BudgetSourcesaga from './budgetsource/saga';
import BudgetYearsaga from './budgetyear/saga';
import ContractTerminationReasonsaga from './contractterminationreason/saga';
import ContractorTypesaga from './contractortype/saga';
// import DocumentTypesaga from './documenttype/saga';
import DocumentTypesaga from './documenttype/saga';



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
    fork(BudgetSourceSaga),
    fork(Departmentsaga),
    fork(AddressStructuresaga),
    fork(Departmentsaga),
    fork(BudgetRequestsaga),
    fork(BudgetSourcesaga),
    fork(BudgetYearsaga),
    fork(ContractTerminationReasonsaga),
    fork(ContractorTypesaga),
    fork(DocumentTypesaga)

  ]);
}
