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
  getProjectDocument as onGetProjectDocument,
  addProjectDocument as onAddProjectDocument,
  updateProjectDocument as onUpdateProjectDocument,
  deleteProjectDocument as onDeleteProjectDocument,
} from "../../store/projectdocument/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import ProjectDocumentModal from "./ProjectDocumentModal";
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

const ProjectDocumentModel = () => {
  //meta title
  document.title = " ProjectDocument";

  const { t } = useTranslation();

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [projectDocument, setProjectDocument] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false); // Search-specific loading state
  const [showSearchResults, setShowSearchResults] = useState(false); // To determine if search results should be displayed
  //START FOREIGN CALLS
  const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  useEffect(() => {
    const fetchDocumentType = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}document_type/listgrid`
        );
        const transformedData = response.data.data.map((item) => ({
          label: item.pdt_doc_name_or.toString(),
          value: item.pdt_doc_name_or.toString(),
        }));
        const optionsWithDefault = [
          { label: "select budget year", value: "" },
          ...transformedData,
        ];
        setDocumentTypeOptions(optionsWithDefault);
      } catch (error) {
        console.error("Error fetching budget years:", error);
      }
    };
    fetchDocumentType();
  }, []);
  const handleDocumentTypeChange = (e) => {
    setSelectedDocumentType(e.target.value);
    validation.setFieldValue("prd_document_type_id", e.target.value);
  };
  // validation
  const validation = useFormik({
    // enableReinitialize: use this flag when initial values need to be changed
    enableReinitialize: true,

    initialValues: {
      prd_project_id: (projectDocument && projectDocument.prd_project_id) || "",
      prd_name: (projectDocument && projectDocument.prd_name) || "",
      prd_file_path: (projectDocument && projectDocument.prd_file_path) || "",
      prd_size: (projectDocument && projectDocument.prd_size) || "",
      prd_file_extension:
        (projectDocument && projectDocument.prd_file_extension) || "",
      prd_uploaded_date:
        (projectDocument && projectDocument.prd_uploaded_date) || "",
      prd_description:
        (projectDocument && projectDocument.prd_description) || "",
      prd_status: (projectDocument && projectDocument.prd_status) || "",

      is_deletable: (projectDocument && projectDocument.is_deletable) || 1,
      is_editable: (projectDocument && projectDocument.is_editable) || 1,
    },

    validationSchema: Yup.object({
      prd_project_id: Yup.string().required(t("prd_project_id")),
      prd_name: Yup.string().required(t("prd_name")),
      prd_file_path: Yup.string().required(t("prd_file_path")),
      prd_size: Yup.string().required(t("prd_size")),
      prd_file_extension: Yup.string().required(t("prd_file_extension")),
      prd_uploaded_date: Yup.string().required(t("prd_uploaded_date")),
      prd_description: Yup.string().required(t("prd_description")),
      prd_status: Yup.string().required(t("prd_status")),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      if (isEdit) {
        const updateProjectDocument = {
          prd_id: projectDocument ? projectDocument.prd_id : 0,
          prd_project_id: values.prd_project_id,
          prd_name: values.prd_name,
          prd_file_path: values.prd_file_path,
          prd_size: values.prd_size,
          prd_file_extension: values.prd_file_extension,
          prd_uploaded_date: values.prd_uploaded_date,
          prd_description: values.prd_description,
          prd_status: values.prd_status,

          is_deletable: values.is_deletable,
          is_editable: values.is_editable,
        };
        // update ProjectDocument
        dispatch(onUpdateProjectDocument(updateProjectDocument));
        validation.resetForm();
      } else {
        const newProjectDocument = {
          prd_project_id: values.prd_project_id,
          prd_name: values.prd_name,
          prd_file_path: values.prd_file_path,
          prd_size: values.prd_size,
          prd_file_extension: values.prd_file_extension,
          prd_uploaded_date: values.prd_uploaded_date,
          prd_description: values.prd_description,
          prd_status: values.prd_status,
        };
        // save new ProjectDocuments
        dispatch(onAddProjectDocument(newProjectDocument));
        validation.resetForm();
      }
    },
  });
  const [transaction, setTransaction] = useState({});
  const toggleViewModal = () => setModal1(!modal1);
  const dispatch = useDispatch();
  // Fetch ProjectDocument on component mount
  useEffect(() => {
    dispatch(onGetProjectDocument());
  }, [dispatch]);

  const projectDocumentProperties = createSelector(
    (state) => state.ProjectDocumentR, // this is geting from  reducer
    (ProjectDocumentReducer) => ({
      // this is from Project.reducer
      projectDocument: ProjectDocumentReducer.projectDocument,
      loading: ProjectDocumentReducer.loading,
      update_loading: ProjectDocumentReducer.update_loading,
    })
  );

  const {
    projectDocument: { data, previledge },
    loading,
    update_loading,
  } = useSelector(projectDocumentProperties);

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
    setProjectDocument(data);
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data) && !!isEdit) {
      setProjectDocument(data);
      setIsEdit(false);
    }
  }, [data]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setProjectDocument(null);
    } else {
      setModal(true);
    }
  };

  const handleProjectDocumentClick = (arg) => {
    const projectDocument = arg;
    // console.log("handleProjectDocumentClick", projectDocument);
    setProjectDocument({
      prd_id: projectDocument.prd_id,
      prd_project_id: projectDocument.prd_project_id,
      prd_name: projectDocument.prd_name,
      prd_file_path: projectDocument.prd_file_path,
      prd_size: projectDocument.prd_size,
      prd_file_extension: projectDocument.prd_file_extension,
      prd_uploaded_date: projectDocument.prd_uploaded_date,
      prd_description: projectDocument.prd_description,
      prd_status: projectDocument.prd_status,

      is_deletable: projectDocument.is_deletable,
      is_editable: projectDocument.is_editable,
    });

    setIsEdit(true);

    toggle();
  };

  //delete projects
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (projectDocument) => {
    setProjectDocument(projectDocument);
    setDeleteModal(true);
  };

  const handleDeleteProjectDocument = () => {
    if (projectDocument && projectDocument.prd_id) {
      dispatch(onDeleteProjectDocument(projectDocument.prd_id));
      setDeleteModal(false);
    }
  };
  const handleProjectDocumentClicks = () => {
    setIsEdit(false);
    setProjectDocument("");
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
      {
        header: "",
        accessorKey: "prd_project_id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prd_project_id, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prd_name",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prd_name, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prd_file_path",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prd_file_path, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prd_size",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prd_size, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prd_file_extension",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prd_file_extension, 30) ||
                "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prd_uploaded_date",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prd_uploaded_date, 30) ||
                "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prd_description",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prd_description, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "prd_status",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.prd_status, 30) || "-"}
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
                    handleProjectDocumentClick(data);
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
  }, [handleProjectDocumentClick, toggleViewModal, onClickDelete]);

  const project_status = [
    { label: "select Status name", value: "" },
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const dropdawntotal = [project_status];

  return (
    <React.Fragment>
      <ProjectDocumentModal
        isOpen={modal1}
        toggle={toggleViewModal}
        transaction={transaction}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProjectDocument}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title={t("project_document")}
            breadcrumbItem={t("project_document")}
          />
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
                      handleUserClick={handleProjectDocumentClicks}
                      isPagination={true}
                      // SearchPlaceholder="26 records..."
                      SearchPlaceholder={26 + " " + t("Results") + "..."}
                      buttonClass="btn btn-success waves-effect waves-light mb-2 me-2 addOrder-modal"
                      buttonName={t("add") + " " + t("project_document")}
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
                ? t("edit") + " " + t("project_document")
                : t("add") + " " + t("project_document")}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  const modalCallback = () => setModal(false);
                  if (isEdit) {
                    onUpdateProjectDocument(validation.values, modalCallback);
                  } else {
                    onAddProjectDocument(validation.values, modalCallback);
                  }
                  return false;
                }}
              >
                <Row>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prd_project_id")}</Label>
                    <Input
                      name="prd_project_id"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prd_project_id || ""}
                      invalid={
                        validation.touched.prd_project_id &&
                        validation.errors.prd_project_id
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prd_project_id &&
                    validation.errors.prd_project_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prd_project_id}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prd_document_type_id")}</Label>
                    <Input
                      name="prd_document_type_id"
                      type="select"
                      className="form-select"
                      onChange={handleDocumentTypeChange}
                      onBlur={validation.handleBlur}
                      value={selectedDocumentType}
                    >
                      {documentTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {t(`${option.label}`)}
                        </option>
                      ))}
                    </Input>
                    {validation.touched.prd_document_type_id &&
                    validation.errors.prd_document_type_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prd_document_type_id}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prd_name")}</Label>
                    <Input
                      name="prd_name"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prd_name || ""}
                      invalid={
                        validation.touched.prd_name &&
                        validation.errors.prd_name
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prd_name &&
                    validation.errors.prd_name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prd_name}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prd_file_path")}</Label>
                    <Input
                      name="prd_file_path"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prd_file_path || ""}
                      invalid={
                        validation.touched.prd_file_path &&
                        validation.errors.prd_file_path
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prd_file_path &&
                    validation.errors.prd_file_path ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prd_file_path}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prd_size")}</Label>
                    <Input
                      name="prd_size"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prd_size || ""}
                      invalid={
                        validation.touched.prd_size &&
                        validation.errors.prd_size
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prd_size &&
                    validation.errors.prd_size ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prd_size}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prd_file_extension")}</Label>
                    <Input
                      name="prd_file_extension"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prd_file_extension || ""}
                      invalid={
                        validation.touched.prd_file_extension &&
                        validation.errors.prd_file_extension
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prd_file_extension &&
                    validation.errors.prd_file_extension ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prd_file_extension}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prd_uploaded_date")}</Label>
                    <Input
                      name="prd_uploaded_date"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prd_uploaded_date || ""}
                      invalid={
                        validation.touched.prd_uploaded_date &&
                        validation.errors.prd_uploaded_date
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prd_uploaded_date &&
                    validation.errors.prd_uploaded_date ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prd_uploaded_date}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prd_description")}</Label>
                    <Input
                      name="prd_description"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prd_description || ""}
                      invalid={
                        validation.touched.prd_description &&
                        validation.errors.prd_description
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prd_description &&
                    validation.errors.prd_description ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prd_description}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("prd_status")}</Label>
                    <Input
                      name="prd_status"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.prd_status || ""}
                      invalid={
                        validation.touched.prd_status &&
                        validation.errors.prd_status
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.prd_status &&
                    validation.errors.prd_status ? (
                      <FormFeedback type="invalid">
                        {validation.errors.prd_status}
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
ProjectDocumentModel.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default ProjectDocumentModel;
