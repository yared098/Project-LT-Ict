import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//E-commerce
import Projects from "./projects/reducer";

//Calendar
import calendar from "./calendar/reducer";

//chat
// import chat from "./chat/reducer";

//crypto
// import crypto from "./crypto/reducer";

//invoices
import invoices from "./invoices/reducer";

// //jobs
// import JobReducer from "./jobs/reducer";

// //projects
// import projects from "./projects/reducer";

//tasks
import tasks from "./tasks/reducer";

//contacts
import contacts from "./contacts/reducer";

//mails
import mails from "./mails/reducer";

//Dashboard
import Dashboard from "./dashboard/reducer";

//Dasboard saas
// import DashboardSaas from "./dashboard-saas/reducer";

// //Dasboard crypto
// import DashboardCrypto from "./dashboard-crypto/reducer";

//Dasboard blog
// import DashboardBlog from "./dashboard-blog/reducer";

// //Dasboard job
// import DashboardJob from "./dashboard-jobs/reducer";

import search from "./search/reducer";
import TreeReducer from "./tree/reducer";
<<<<<<< HEAD
import DocumentTypeR from "./documenttype/reducer";
import ProjectR from "./project/reducer";
import ProjectCategoryR from "./projectcategory/reducer";
import ProjectContractorR from "./projectcontractor/reducer";
import ProjectDocumentR from "./projectdocument/reducer";
import ProjectPaymentR from "./projectpayment/reducer";
import PagesR from "./pages/reducer";
import PermissionR from "./permission/reducer";
import ProjectStatusR from './projectstatus/reducer'; 
import ProjectStakeholderR from './projectstakeholder/reducer'; 
import RolesR from './roles/reducer'; 
import SectorCategoryR from './sectorcategory/reducer'; 
import SectorInformationR from './sectorinformation/reducer'; 
import StakeholderTypeR from './stakeholdertype/reducer'; 
import UserRoleR from './userrole/reducer'; 
import UsersR from './users/reducer';
=======
import DepartmentR from './department/reducer'; 
import BudgetSourceR from './budgetsource/reducer';
>>>>>>> ea6423b3c429a49d7ff52513631d85c488725fff

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Projects,
  calendar,
  // chat,
  mails,
  // crypto,
  invoices,
  // JobReducer,
  // projects,
  tasks,
  contacts,
  Dashboard,
  // DashboardSaas,
  // DashboardCrypto,
  // DashboardBlog,
  // DashboardJob,
  search,
  TreeReducer,
<<<<<<< HEAD
  DocumentTypeR,
  ProjectR,
  ProjectCategoryR,
  ProjectContractorR,
  ProjectDocumentR,
  ProjectPaymentR,
  PagesR,
  PermissionR,
  ProjectStatusR,
  ProjectStakeholderR,
  RolesR,
  SectorCategoryR,
  SectorInformationR,
  StakeholderTypeR,
  UserRoleR,
  UsersR
=======
  DepartmentR,
  BudgetSourceR
>>>>>>> ea6423b3c429a49d7ff52513631d85c488725fff
});

export default rootReducer;
