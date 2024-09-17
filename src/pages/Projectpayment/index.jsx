import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty, update } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../../components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Spinner } from "reactstrap";
import Spinners from "../../components/Common/Spinner";
import SearchComponent from "../../components/Common/SearchComponent";
//import components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/DeleteModal";

import {
  getProjectPayment as onGetProjectPayment,
  addProjectPayment as onAddProjectPayment,
  updateProjectPayment as onUpdateProjectPayment,
  deleteProjectPayment as onDeleteProjectPayment,
} from "../../store/projectpayment/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import ProjectPaymentModal from "./ProjectPaymentModal";
import { useTranslation } from "react-i18next";

import {
  Button,
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  FormGroup,
  Badge,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import moment from "moment";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

const truncateText = (text, maxLength) => {
  if (typeof text !== "string") {
    return text;
  }
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
};

const ProjectPaymentModel = (props) => {
  //  get passed data from tab
  const {projectid}=props
  console.log("project payment id ",projectid)
  //meta title
  document.title = " ProjectPayment";

  const { t } = useTranslation();

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [projectPayment, setProjectPayment] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false); // Search-specific loading state
  const [showSearchResults, setShowSearchResults] = useState(false); // To determine if search results should be displayed
  //START FOREIGN CALLS

  // validation
  const validation = useFormik({
    // enableReinitialize: use this flag when initial values need to be changed
    enableReinitialize: true,

    initialValues: {
      prp_project_id: (projectPayment && projectPayment.prp_project_id) || "",
      prp_type: (projectPayment && projectPayment.prp_type) || "",
      prp_payment_date_et:
        (projectPayment && projectPayment.prp_payment_date_et) || "",
      prp_payment_date_gc:
        (projectPayment && projectPayment.prp_payment_date_gc) || "",
      prp_payment_amount:
        (projectPayment && projectPayment.prp_payment_amount) || "",
      prp_payment_percentage:
        (projectPayment && projectPayment.prp_payment_percentage) || "",
      prp_description: (projectPayment && projectPayment.prp_description) || "",
      prp_status: (projectPayment && projectPayment.prp_status) || "",

      is_deletable: (projectPayment && projectPayment.is_deletable) || 1,
      is_editable: (projectPayment && projectPayment.is_editable) || 1,
    },

    validationSchema: Yup.object({
      prp_project_id: Yup.string().required(t("prp_project_id")),
      prp_type: Yup.string().required(t("prp_type")),
      prp_payment_date_et: Yup.string().required(t("prp_payment_date_et")),
      prp_payment_date_gc: Yup.string().required(t("prp_payment_date_gc")),
      prp_payment_amount: Yup.string().required(t("prp_payment_amount")),
      prp_payment_percentage: Yup.string().required(
        t("prp_payment_percentage")
      ),
      prp_description: Yup.string().required(t("prp_description")),
      prp_status: Yup.string().required(t("prp_status")),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      if (isEdit) {
        const updateProjectPayment = {
          prp_id: projectPayment ? projectPayment.prp_id : 0,
          prp_project_id: values.prp_project_id,
          prp_type: values.prp_type,
          prp_payment_date_et: values.prp_payment_date_et,
          prp_payment_date_gc: values.prp_payment_date_gc,
          prp_payment_amount: values.prp_payment_amount,
          prp_payment_percentage: values.prp_payment_percentage,
          prp_description: values.prp_description,
          prp_status: values.prp_status,

          is_deletable: values.is_deletable,
          is_editable: values.is_editable,
        };
        // update ProjectPayment
        dispatch(onUpdateProjectPayment(updateProjectPayment));
        validation.resetForm();
      } else {
        const newProjectPayment = {
          prp_project_id: values.prp_project_id,
          prp_type: values.prp_type,
          prp_payment_date_et: values.prp_payment_date_et,
          prp_payment_date_gc: values.prp_payment_date_gc,
          prp_payment_amount: values.prp_payment_amount,
          prp_payment_percentage: values.prp_payment_percentage,
          prp_description: values.prp_description,
          prp_status: values.prp_status,
        };
        // save new ProjectPayments
        dispatch(onAddProjectPayment(newProjectPayment));
        validation.resetForm();
      }
    },
  });
  const [transaction, setTransaction] = useState({});
  const toggleViewModal = () => setModal1(!modal1);
  const dispatch = useDispatch();
  // Fetch ProjectPayment on component mount
  useEffect(() => {
    dispatch(onGetProjectPayment(projectid));
  }, [dispatch]);

  const projectPaymentProperties = createSelector(
    (state) => state.ProjectPaymentR, // this is geting from  reducer
    (ProjectPaymentReducer) => ({
      // this is from Project.reducer
      projectPayment: ProjectPaymentReducer.projectPayment,
      loading: ProjectPaymentReducer.loading,
      update_loading: ProjectPaymentReducer.update_loading,
    })
  );

  const {
    projectPayment: { data, previledge },
    loading,
    update_loading,
  } = useSelector(projectPaymentProperties);

  useEffect(() => {
    console.log("update_loading in useEffect", update_loading);
    setModal(false);
  }, [update_loading]);

  const selectSearchProperties = createSelector(
    (state) => state.search,
    (search) => ({
      results: search.results,
    })
  );

  const { results } = useSelector(selectSearchProperties);

  const [isLoading, setLoading] = useState(loading);
  useEffect(() => {
    setProjectPayment(data);
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data) && !!isEdit) {
      setProjectPayment(data);
      setIsEdit(false);
    }
  }, [data]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setProjectPayment(null);
    } else {
      setModal(true);
    }
  };

  const handleProjectPaymentClick = (arg) => {
    const projectPayment = arg;
    // console.log("handleProjectPaymentClick", projectPayment);
    setProjectPayment({
      prp_id: projectPayment.prp_id,
      prp_project_id: projectPayment.prp_project_id,
      prp_type: projectPayment.prp_type,
      prp_payment_date_et: projectPayment.prp_payment_date_et,
      prp_payment_date_gc: projectPayment.prp_payment_date_gc,
      prp_payment_amount: projectPayment.prp_payment_amount,
      prp_payment_percentage: projectPayment.prp_payment_percentage,
      prp_description: projectPayment.prp_description,
      prp_status: projectPayment.prp_status,

      is_deletable: projectPayment.is_deletable,
      is_editable: projectPayment.is_editable,
    });

    setIsEdit(true);

    toggle();
  };

  //delete projects
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (projectPayment) => {
    setProjectPayment(projectPayment);
    setDeleteModal(true);
  };

  const handleDeleteProjectPayment = () => {
    if (projectPayment && projectPayment.prp_id) {
      dispatch(onDeleteProjectPayment(projectPayment.prp_id));
      setDeleteModal(false);
    }
  };
  const handleProjectPaymentClicks = () => {
    setIsEdit(false);
    setProjectPayment("");
    toggle();
  };
  const handleSearch = () => {
    setSearchLoading(true); // Set loading to true when search is initiated// Update filtered data with search results
    setShowSearchResults(true); // Show search results
    setSearchLoading(false);
  };

  const handleClearSearch = () => {
    setShowSearchResults(false);
  };

  const columns = useMemo(() => {
    const baseColumns = [
      // {
      //   header: "",
      //   accessorKey: "prp_project_id",
      //   enableColumnFilter: false,
      //   enableSorting: true,
      //   cell: (cellProps) => {
      //     return (
      //       <span>
      //         {truncateText(cellProps.row.original.prp_project_id, 30) || "-"}
      //       </span>
      //     );
      //   },
      // },
      {
        header: "",
        accessorKey: "prp_type",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prp_type, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prp_payment_date_et",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prp_payment_date_et, 30) ||
                "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prp_payment_date_gc",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prp_payment_date_gc, 30) ||
                "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prp_payment_amount",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prp_payment_amount, 30) ||
                "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prp_payment_percentage",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(
                cellProps.row.original.prp_payment_percentage,
                30
              ) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prp_description",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prp_description, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prp_status",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prp_status, 30) || "-"}
            </span>
          );
        },
      },

      {
        header: t("view_detail"),
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm"
              onClick={() => {
                const data = cellProps.row.original;
                toggleViewModal(data);
                setTransaction(cellProps.row.original);
              }}
            >
              {t("view_detail")}
            </Button>
          );
        },
      },
    ];
    if (previledge?.is_role_editable && previledge?.is_role_deletable) {
      baseColumns.push({
        header: t("Action"),
        accessorKey: t("Action"),
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              {cellProps.row.original.is_editable && (
                <Link
                  to="#"
                  className="text-success"
                  onClick={() => {
                    const data = cellProps.row.original;
                    handleProjectPaymentClick(data);
                  }}
                >
                  <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
              )}

              {cellProps.row.original.is_deletable && (
                <Link
                  to="#"
                  className="text-danger"
                  onClick={() => {
                    const data = cellProps.row.original;
                    onClickDelete(data);
                  }}
                >
                  <i
                    className="mdi mdi-delete font-size-18"
                    id="deletetooltip"
                  />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
              )}
            </div>
          );
        },
      });
    }

    return baseColumns;
  }, [handleProjectPaymentClick, toggleViewModal, onClickDelete]);

  const project_status = [
    { label: "select Status name", value: "" },
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const dropdawntotal = [project_status];

  return (
    <React.Fragment>
      <ProjectPaymentModal
        isOpen={modal1}
        toggle={toggleViewModal}
        transaction={transaction}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProjectPayment}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          {/* <Breadcrumbs
            title={t("project_payment")}
            breadcrumbItem={t("project_payment")}
          /> */}

           {projectid?null : <Breadcrumbs
              title={t("project_document")}
              breadcrumbItem={t("project_document")}
            />}

          {isLoading || searchLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={showSearchResults ? results : data}
                      isGlobalFilter={true}
                      isAddButton={true}
                      isCustomPageSize={true}
                      handleUserClick={handleProjectPaymentClicks}
                      isPagination={true}
                      // SearchPlaceholder="26 records..."
                      SearchPlaceholder={26 + " " + t("Results") + "..."}
                      buttonClass="btn btn-success waves-effect waves-light mb-2 me-2 addOrder-modal"
                      buttonName={t("add") + " " + t("project_payment")}
                      tableClass="align-middle table-nowrap dt-responsive nowrap w-100 table-check dataTable no-footer dtr-inline"
                      theadClass="table-light"
                      pagination="pagination"
                      paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
          <Modal isOpen={modal} toggle={toggle} className="modal-xl">
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit
                ? t("edit") + " " + t("project_payment")
                : t("add") + " " + t("project_payment")}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  const modalCallback = () => setModal(false);
                  if (isEdit) {
                    onUpdateProjectPayment(validation.values, modalCallback);
                  } else {
                    onAddProjectPayment(validation.values, modalCallback);
                  }
                  return false;
                }}
              >
                <Row>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prp_project_id")}</Label>
                    <Input
                      name="prp_project_id"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prp_project_id || ""}
                      invalid={
                        validation.touched.prp_project_id &&
                        validation.errors.prp_project_id
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prp_project_id &&
                    validation.errors.prp_project_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prp_project_id}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prp_type")}</Label>
                    <Input
                      name="prp_type"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prp_type || ""}
                      invalid={
                        validation.touched.prp_type &&
                        validation.errors.prp_type
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prp_type &&
                    validation.errors.prp_type ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prp_type}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prp_payment_date_et")}</Label>
                    <Input
                      name="prp_payment_date_et"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prp_payment_date_et || ""}
                      invalid={
                        validation.touched.prp_payment_date_et &&
                        validation.errors.prp_payment_date_et
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prp_payment_date_et &&
                    validation.errors.prp_payment_date_et ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prp_payment_date_et}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prp_payment_date_gc")}</Label>
                    <Input
                      name="prp_payment_date_gc"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prp_payment_date_gc || ""}
                      invalid={
                        validation.touched.prp_payment_date_gc &&
                        validation.errors.prp_payment_date_gc
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prp_payment_date_gc &&
                    validation.errors.prp_payment_date_gc ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prp_payment_date_gc}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prp_payment_amount")}</Label>
                    <Input
                      name="prp_payment_amount"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prp_payment_amount || ""}
                      invalid={
                        validation.touched.prp_payment_amount &&
                        validation.errors.prp_payment_amount
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prp_payment_amount &&
                    validation.errors.prp_payment_amount ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prp_payment_amount}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prp_payment_percentage")}</Label>
                    <Input
                      name="prp_payment_percentage"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prp_payment_percentage || ""}
                      invalid={
                        validation.touched.prp_payment_percentage &&
                        validation.errors.prp_payment_percentage
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prp_payment_percentage &&
                    validation.errors.prp_payment_percentage ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prp_payment_percentage}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prp_description")}</Label>
                    <Input
                      name="prp_description"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prp_description || ""}
                      invalid={
                        validation.touched.prp_description &&
                        validation.errors.prp_description
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prp_description &&
                    validation.errors.prp_description ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prp_description}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prp_status")}</Label>
                    <Input
                      name="prp_status"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prp_status || ""}
                      invalid={
                        validation.touched.prp_status &&
                        validation.errors.prp_status
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prp_status &&
                    validation.errors.prp_status ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prp_status}
                      </FormFeedback>
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      {update_loading ? (
                        <Button
                          color="success"
                          type="submit"
                          className="save-user"
                          disabled={update_loading || !validation.dirty}
                        >
                          <Spinner size={"sm"} color="#fff" />
                          {t("Save")}
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          type="submit"
                          className="save-user"
                          disabled={update_loading || !validation.dirty}
                        >
                          {t("Save")}
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};
ProjectPaymentModel.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default ProjectPaymentModel;
