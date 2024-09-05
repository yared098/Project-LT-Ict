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
// import dashboardSaga from "./dashboard/saga";
// import dashboardSaasSaga from "./dashboard-saas/saga";

// import dashboardBlogSaga from "./dashboard-blog/saga";
// import dashboardJobSaga from "./dashboard-jobs/saga";
import watchSearchSaga from "./search/sagas";

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
    // fork(chatSaga),
    fork(mailsSaga),
    // fork(cryptoSaga),
    fork(invoiceSaga),
    // fork(jobsSaga),
    // fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    // fork(dashboardSaga),
    // fork(dashboardSaasSaga),
    // fork(dashboardCryptoSaga),
    // fork(dashboardBlogSaga),
    // fork(dashboardJobSaga),
    fork(watchSearchSaga),
  ]);
}
