import React from "react";
import { Navigate } from "react-router-dom";

// Pages Component
// import Chat from "../pages/Chat/Chat";

// // File Manager
import ProjectsTreeView from "../pages/ProjectStatusTree/index";


// Pages Calendar
import Calendar from "../pages/Calendar/index";

import ProjectLists from "../pages/Projects/ProjectStatusLists/index";


// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";



// // Dashboard
import Dashboard from "../pages/Dashboard/index";


// //Ui
import UiAlert from "../pages/Ui/UiAlerts/index";
import UiButtons from "../pages/Ui/UiButtons/index";
import UiCards from "../pages/Ui/UiCard/index";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiColors from "../pages/Ui/UiColors";
import UiDropdown from "../pages/Ui/UiDropdown/index";
import UiOffCanvas from "../pages/Ui/UiOffCanvas";

import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal/index";

import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/UINotifications";

import UiPlaceholders from "../pages/Ui/UiPlaceholders";
import UiToasts from "../pages/Ui/UiToast";
import UiUtilities from "../pages/Ui/UiUtilities";

// //Pages
import PagesStarter from "../pages/Utility/pages-starter";

import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";

import UiProgressbar from "../pages/Ui/UiProgressbar";
import { components } from "react-select";
// import UiProgressbar from "../../src/pages/Ui/UiProgressbar"
import Tree from "../pages/AddressStructure";
import ViewProjectPage from "../pages/Projects/ProjectStatusLists/ViewProjectPage";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  
  

  //File Manager
  { path: "/Project-Tree", component: <ProjectsTreeView /> },
  {path: '/address_structure', component: <AddressStructure/> },
  {path: '/department', component: <Department/> },
  {path: '/budget_request', component: <BudgetRequest/> },
  {path: '/budget_source', component: <BudgetSource/> },
  {path: '/budget_year', component: <BudgetYear/> },
  {path: '/contract_termination_reason', component: <ContractTerminationReason/> },
  {path: '/contractor_type', component: <ContractorType/> },
  {path: '/document_type', component: <DocumentType/> },
  {path: '/access_log', component: <AccessLog/> },
  

  // //calendar
  { path: "/calendar", component: <Calendar /> },

  
  { path: "/projects-status", component: <ProjectLists /> },
  { path: "/view-project", component: <ViewProjectPage /> },
  // { path :  "/ProjectNodetree",components: <ProjectTree/> },
  // { path: "/ecommerce-customers", component: <EcommerceCustomers /> },
  // { path: "/ecommerce-cart", component: <EcommerceCart /> },
  // { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
  // { path: "/ecommerce-shops", component: <EcommerceShops /> },
  // { path: "/ecommerce-add-product", component: <EcommerenceAddProduct /> },

  //   //Email
  // { path: "/email-inbox", component: <EmailInbox /> },
  // { path: "/email-read/:id?", component: <EmailRead /> },
  // { path: "/email-template-basic", component: <EmailBasicTemplte /> },
  // { path: "/email-template-alert", component: <EmailAlertTemplte /> },
  // { path: "/email-template-billing", component: <EmailTemplateBilling /> },

  //   //Invoices
  // { path: "/invoices-list", component: <InvoicesList /> },
  // { path: "/invoices-detail", component: <InvoiceDetail /> },
  // { path: "/invoices-detail/:id?", component: <InvoiceDetail /> },

  //   // Tasks
  // { path: "/tasks-list", component: <TasksList /> },
  // { path: "/tasks-create", component: <TasksCreate /> },
  // { path: "/tasks-kanban", component: <TasksKanban /> },

  //   //Projects
  // { path: "/projects-grid", component: <ProjectsGrid /> },
  // { path: "/projects-list", component: <ProjectsList /> },
  // { path: "/projects-overview", component: <ProjectsOverview /> },
  // { path: "/projects-overview/:id", component: <ProjectsOverview /> },
  // { path: "/projects-create", component: <ProjectsCreate /> },

  //   //Blog
  // { path: "/blog-list", component: <BlogList /> },
  // { path: "/blog-grid", component: <BlogGrid /> },
  // { path: "/blog-details", component: <BlogDetails /> },

  // { path: "/job-grid", component: <JobGrid /> },
  // { path: "/job-details", component: <JobDetails /> },
  // { path: "/job-categories", component: <JobCategories /> },
  // { path: "/job-list", component: <JobList /> },
  // { path: "/job-apply", component: <ApplyJobs /> },
  // { path: "/candidate-list", component: <CandidateList /> },
  // { path: "/candidate-overview", component: <CandidateOverview /> },

  // Contacts
  // { path: "/contacts-grid", component: <ContactsGrid /> },
  // { path: "/contacts-list", component: <ContactsList /> },
  // { path: "/contacts-profile", component: <ContactsProfile /> },

  //   //Charts
  // { path: "/apex-charts", component: <ChartApex /> },
  // { path: "/chartjs-charts", component: <ChartjsChart /> },
  // { path: "/e-charts", component: <EChart /> },
  // { path: "/sparkline-charts", component: <SparklineChart /> },
  // { path: "/charts-knob", component: <ChartsKnob /> },
  // { path: "/re-charts", component: <ReCharts /> },

  //   // Icons
  // { path: "/icons-boxicons", component: <IconBoxicons /> },
  // { path: "/icons-dripicons", component: <IconDripicons /> },
  // { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  // { path: "/icons-fontawesome", component: <IconFontawesome /> },

  //   // Tables
  // { path: "/tables-basic", component: <BasicTables /> },
  // { path: "/tables-datatable", component: <DatatableTables /> },

  //   // Maps
  // { path: "/maps-google", component: <MapsGoogle /> },

  //   // Forms
  // { path: "/form-elements", component: <FormElements /> },
  // { path: "/form-layouts", component: <FormLayouts /> },
  // { path: "/form-advanced", component: <FormAdvanced /> },
  // { path: "/form-editors", component: <FormEditors /> },
  // { path: "/form-mask", component: <FormMask /> },
  // { path: "/form-repeater", component: <FormRepeater /> },
  // { path: "/form-uploads", component: <FormUpload /> },
  // { path: "/form-wizard", component: <FormWizard /> },
  // { path: "/form-validation", component: <FormValidations /> },
  // { path: "/dual-listbox", component: <DualListbox /> },

  //   // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-offcanvas", component: <UiOffCanvas /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  { path: "/ui-rating", component: <UiRating /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-notifications", component: <UiNotifications /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-toasts", component: <UiToasts /> },
  { path: "/ui-utilities", component: <UiUtilities /> },

  //   //Utility
  { path: "/pages-starter", component: <PagesStarter /> },
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-faqs", component: <PagesFaqs /> },
  { path: "/pages-pricing", component: <PagesPricing /> },

  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
  { path: "/tree", component: <Tree /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
 
];

// export { authProtectedRoutes, publicRoutes };
export { authProtectedRoutes, publicRoutes };
