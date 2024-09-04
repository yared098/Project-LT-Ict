import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../../../components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";
import Spinners from "../../../components/Common/Spinner";
import SearchComponent from "../../../components/Common/SearchComponent";
//import components
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import DeleteModal from "../../../components/Common/DeleteModal";

import {
  getProjects as onGetProjects,
  addNewProject as onAddNewProject,
  updateProject as onUpdateProject,
  deleteProject as onDeleteProject,
} from "../../../store/project/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import ProjectStatusModel from "./ProjectModel";
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

const ProjectModel = () => {
  //meta title
  document.title = "Orders | Skote - Vite React Admin & Dashboard Template";

  const { t } = useTranslation();

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [project, setProject] = useState(null);
  const [budgetYearOptions, setBudgetYearOptions] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false); // Search-specific loading state
  const [showSearchResults, setShowSearchResults] = useState(false); // To determine if search results should be displayed

  useEffect(() => {
    const fetchBudgetYears = async () => {
      try {
        const response = await axios.post(
          // `${import.meta.env.VITE_BASE_API_URL}budget_year/listgrid`
          `https://pms.awashsol.com/api/budget_year/listgrid`
        );
        const transformedData = response.data.data.map((item) => ({
          label: item.prp_budget_year.toString(),
          value: item.prp_budget_year.toString(),
        }));
        const optionsWithDefault = [
          { label: "select budget year", value: "" },
          ...transformedData,
        ];

        setBudgetYearOptions(optionsWithDefault);
      } catch (error) {
        console.error("Error fetching budget years:", error);
      }
    };
    fetchBudgetYears();
  }, []);

  // validation
  const validation = useFormik({
    // enableReinitialize: use this flag when initial values need to be changed
    enableReinitialize: true,

    initialValues: {
      prs_id: (project && project.prs_id) || "",
      prs_order_number: (project && project.prs_order_number) || "",
      prs_status_name_or: (project && project.prs_status_name_or) || "",
      prs_status_name_en: (project && project.prs_status_name_en) || "",
      prs_status_name_am: (project && project.prs_status_name_am) || "",
      prs_description: (project && project.prs_description) || "",
      prs_color_code: (project && project.prs_color_code) || "#fff",
      prs_status: (project && project.prs_status) || 0,
      is_deletable: (project && project.is_deletable) || 1,
      is_editable: (project && project.is_editable) || 1,
    },

    validationSchema: Yup.object({
      prs_order_number: Yup.number().required("Please Enter the Status"),
      prs_status_name_or: Yup.string().required(
        "Please Enter the Oromo Status Name"
      ),
      prs_status_name_en: Yup.string().required(
        "Please Enter the English Status Name"
      ),
      prs_status_name_am: Yup.string().required(
        "Please Enter the Amharic Status Name"
      ),
      prs_description: Yup.string(),
      prs_color_code: Yup.string().required("Please Enter the Color Code"),
      prs_status: Yup.number().required("Please Enter the Status"),
      is_deletable: Yup.number()
        .oneOf([0, 1])
        .required("Please Specify if Deletable"),
      is_editable: Yup.number()
        .oneOf([0, 1])
        .required("Please Specify if Editable"),
    }),

    onSubmit: (values) => {
      if (isEdit) {
        const updateProjects = {
          prs_id: project ? project.prs_id : 0,
          prs_order_number: values.prs_order_number,
          prs_status_name_or: values.prs_status_name_or,
          prs_status_name_en: values.prs_status_name_en,
          prs_status_name_am: values.prs_status_name_am,
          prs_description: values.prs_description,
          prs_color_code: values.prs_color_code,
          prs_status: values.prs_status,
          is_deletable: values.is_deletable,
          is_editable: values.is_editable,
        };
        // update projects
        dispatch(onUpdateProject(updateProjects));
        validation.resetForm();
      } else {
        const newProject = {
          prs_order_number: values.prs_order_number,
          prs_status_name_or: values.prs_status_name_or,
          prs_status_name_en: values.prs_status_name_en,
          prs_status_name_am: values.prs_status_name_am,
          prs_description: values.prs_description,
          prs_color_code: values.prs_color_code,
          prs_status: values.prs_status,
          prs_created_by: 1,
        };
        // save new projects
        dispatch(onAddNewProject(newProject));
        validation.resetForm();
      }
      toggle();
    },
  });
  const [transaction, setTransaction] = useState("");

  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();

  // Fetch projects on component mount
  useEffect(() => {
    dispatch(onGetProjects());
  }, [dispatch]);

  const ProjectStatusProperties = createSelector(
    (state) => state.ecommerce,
    (ProjectReducer) => ({
      projects: ProjectReducer.projects,
      loading: ProjectReducer.loading,
    })
  );

  const {
    projects: { data, previledge },
    loading,
  } = useSelector(ProjectStatusProperties);


  const selectSearchProperties = createSelector(
    (state) => state.search,
    (search) => ({
      results: search.results,
    })
  );

  const { results } = useSelector(selectSearchProperties);
  
  const [isLoading, setLoading] = useState(loading);

  useEffect(() => {
    if (data && !data.length) {
      dispatch(onGetProjects());
    }
  }, [dispatch, data]);

  useEffect(() => {
    setProject(data);
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data) && !!isEdit) {
      setProject(data);
      setIsEdit(false);
    }
  }, [data]);

  useEffect(()=>{},[])

  const toggle = () => {
    if (modal) {
      setModal(false);
      setProject(null);
    } else {
      setModal(true);
    }
  };

  const handleProjectClick = (arg) => {
    const project = arg;
    console.log(project);
    setProject({
      prs_id: project.prs_id,
      prs_order_number: project.prs_order_number,
      prs_status_name_or: project.prs_status_name_or,
      prs_status_name_en: project.prs_status_name_en,
      prs_status_name_am: project.prs_status_name_am,
      prs_create_time: project.prs_create_time,
      prs_status: project.prs_status,
      prs_description: project.prs_description,
      prs_color_code: project.prs_color_code,
      prs_created_by: project.prs_created_by,
      prs_update_time: project.prs_update_time,
      is_deletable: project.is_deletable,
      is_editable: project.is_editable,
    });

    setIsEdit(true);

    toggle();
  };

  //delete projects
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (project) => {
    setProject(project);
    setDeleteModal(true);
  };

  const handleDeleteProject = () => {
    if (project && project.prs_id) {
      dispatch(onDeleteProject(project.prs_id));
      setDeleteModal(false);
    }
  };
  const handleProjectClicks = () => {
    setIsEdit(false);
    setProject("");
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
        header: "Project Number",
        accessorKey: "prs_order_number",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <Link to="#" className="text-body fw-bold">
              {cellProps.row.original.prs_order_number}
            </Link>
          );
        },
      },
      {
        header: "Oromo Language",
        accessorKey: "prs_status_name_or",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "English Language",
        accessorKey: "prs_status_name_en",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Amharic Language",
        accessorKey: "prs_status_name_am",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Creation Date",
        accessorKey: "prs_create_time",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return new Date(
            cellProps.row.original.prs_create_time
          ).toLocaleDateString();
        },
      },
      {
        header: "Project Status",
        accessorKey: "prs_status",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <Badge
              className={`font-size-12 badge-soft-${
                cellProps.row.original.prs_status === 1 ? "success" : "danger"
              }`}
            >
              {cellProps.row.original.prs_status === 1 ? "Active" : "Inactive"}
            </Badge>
          );
        },
      },
      {
        header: "Project Description",
        accessorKey: "prs_description",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {cellProps.row.original.prs_description ||
                "No description available"}
            </span>
          );
        },
      },
      {
        header: t("View Details"),
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => {
                const ProjectData = cellProps.row.original;
                toggleViewModal(ProjectData);
                setTransaction(cellProps.row.original);
              }}
            >
              {t("View Details")}
            </Button>
          );
        },
      },
    ];
    if (previledge?.is_role_editable && previledge?.is_role_deletable) {
      baseColumns.push({
        header: t("Action"),
        accessorKey: t('Action'),
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
                    const ProjectData = cellProps.row.original;
                    console.log(ProjectData);
                    handleProjectClick(ProjectData);
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
                    const ProjectData = cellProps.row.original;
                    onClickDelete(ProjectData);
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
  }, [handleProjectClick, toggleViewModal, onClickDelete]);

  const project_status = [
    { label: "select Status name", value: "" },
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const dropdawntotal = [project_status, budgetYearOptions];

  return (
    <React.Fragment>
      <ProjectStatusModel
        isOpen={modal1}
        toggle={toggleViewModal}
        transaction={transaction}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProject}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Projects" breadcrumbItem="projects status" />
          <SearchComponent
            data={[]}
            dropdown={dropdawntotal}
            handleSearch={handleSearch}
            handleClearSearch={handleClearSearch}
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
                      handleUserClick={handleProjectClicks}
                      isPagination={true}
                      SearchPlaceholder={26+" "+t('Results')+"..."}
                      buttonClass="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 addOrder-modal"
                      buttonName={t("Add New Project")}
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
              {!!isEdit ? t("Edit Project Status") : t("Add Project Status")}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  const modalCallback = () => setModal(false);

                  if (isEdit) {
                    onUpdateProject(validation.values, modalCallback);
                  } else {
                    onAddNewProject(validation.values, modalCallback);
                  }
                  return false;
                }}
              >
                <Row>
                  <Row>
                    <Col className="col-md-6 mb-3">
                      <Label>{t("prs_order_number")}</Label>
                      <Input
                        name="prs_order_number"
                        type="text"
                        placeholder="Insert Order Number"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.prs_order_number || ""}
                        invalid={
                          validation.touched.prs_order_number &&
                          validation.errors.prs_order_number
                            ? true
                            : false
                        }
                      />
                      {validation.touched.prs_order_number &&
                      validation.errors.prs_order_number ? (
                        <FormFeedback type="invalid">
                          {validation.errors.prs_order_number}
                        </FormFeedback>
                      ) : null}
                    </Col>
                    <Col className="col-md-6 mb-3">
                      <Label>{t("prs_status_name_en")}</Label>
                      <Input
                        name="prs_status_name_en"
                        type="text"
                        placeholder="Insert Status Name (English)"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.prs_status_name_en || ""}
                        invalid={
                          validation.touched.prs_status_name_en &&
                          validation.errors.prs_status_name_en
                            ? true
                            : false
                        }
                      />
                      {validation.touched.prs_status_name_en &&
                      validation.errors.prs_status_name_en ? (
                        <FormFeedback type="invalid">
                          {validation.errors.prs_status_name_en}
                        </FormFeedback>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-md-6 mb-3">
                      <Label>{t("prs_status_name_or")}</Label>
                      <Input
                        name="prs_status_name_or"
                        type="text"
                        placeholder="Insert Status Name (Oromo)"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.prs_status_name_or || ""}
                        invalid={
                          validation.touched.prs_status_name_or &&
                          validation.errors.prs_status_name_or
                            ? true
                            : false
                        }
                      />
                      {validation.touched.prs_status_name_or &&
                      validation.errors.prs_status_name_or ? (
                        <FormFeedback type="invalid">
                          {validation.errors.prs_status_name_or}
                        </FormFeedback>
                      ) : null}
                    </Col>
                    <Col className="col-md-6 mb-3">
                      <Label>{t("prs_status_name_am")}</Label>
                      <Input
                        name="prs_status_name_am"
                        type="text"
                        placeholder="Insert Status Name (Amharic)"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.prs_status_name_am || ""}
                        invalid={
                          validation.touched.prs_status_name_am &&
                          validation.errors.prs_status_name_am
                            ? true
                            : false
                        }
                      />
                      {validation.touched.prs_status_name_am &&
                      validation.errors.prs_status_name_am ? (
                        <FormFeedback type="invalid">
                          {validation.errors.prs_status_name_am}
                        </FormFeedback>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-md-6 mb-3">
                      <Label>{t("prs_description")}</Label>
                      <Input
                        name="prs_description"
                        type="textarea"
                        placeholder="Insert Description"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.prs_description || ""}
                        invalid={
                          validation.touched.prs_description &&
                          validation.errors.prs_description
                            ? true
                            : false
                        }
                      />
                      {validation.touched.prs_description &&
                      validation.errors.prs_description ? (
                        <FormFeedback type="invalid">
                          {validation.errors.prs_description}
                        </FormFeedback>
                      ) : null}
                    </Col>
                    <Col className="col-md-6 mb-3">
                      <Label>{t("prs_status")}</Label>
                      <Input
                        name="prs_status"
                        type="select"
                        className="form-select"
                        onChange={(e) => {
                          validation.setFieldValue(
                            "prs_status",
                            Number(e.target.value)
                          );
                        }}
                        onBlur={validation.handleBlur}
                        value={validation.values.prs_status}
                      >
                        <option value={1}>{t("Active")}</option>
                        <option value={0}>{t("Inactive")}</option>
                      </Input>
                      {validation.touched.prs_status &&
                      validation.errors.prs_status ? (
                        <FormFeedback type="invalid">
                          {validation.errors.prs_status}
                        </FormFeedback>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-md-6 mb-3">
                      <Label>{t("prs_color_code")}</Label>
                      <Input
                        name="prs_color_code"
                        type="text"
                        placeholder="Insert Color Code"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.prs_color_code || ""}
                        invalid={
                          validation.touched.prs_color_code &&
                          validation.errors.prs_color_code
                            ? true
                            : false
                        }
                      />
                      {validation.touched.prs_color_code &&
                      validation.errors.prs_color_code ? (
                        <FormFeedback type="invalid">
                          {validation.errors.prs_color_code}
                        </FormFeedback>
                      ) : null}
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button
                        color="success"
                        type="submit"
                        className="save-user"
                      >
                        {t("Save")}
                      </Button>
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
ProjectModel.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default ProjectModel;
