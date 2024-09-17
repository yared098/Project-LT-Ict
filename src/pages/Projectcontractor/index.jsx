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
  getProjectContractor as onGetProjectContractor,
  addProjectContractor as onAddProjectContractor,
  updateProjectContractor as onUpdateProjectContractor,
  deleteProjectContractor as onDeleteProjectContractor,
} from "../../store/projectcontractor/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import ProjectContractorModal from "./ProjectContractorModal";
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

const ProjectContractorModel = (props) => {
  //  get passed data from tab
  const {projectid}=props
  //meta title
  document.title = " ProjectContractor";

  const { t } = useTranslation();

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [projectContractor, setProjectContractor] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false); // Search-specific loading state
  const [showSearchResults, setShowSearchResults] = useState(false); // To determine if search results should be displayed
  //START FOREIGN CALLS
  const [contractorTypeOptions, setContractorTypeOptions] = useState([]);
  const [selectedContractorType, setSelectedContractorType] = useState("");

  useEffect(() => {
    const fetchContractorType = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}contractor_type/listgrid`
        );
        const transformedData = response.data.data.map((item) => ({
          label: item.cnt_type_name_or.toString(),
          value: item.cnt_type_name_or.toString(),
        }));
        const optionsWithDefault = [
          { label: "select budget year", value: "" },
          ...transformedData,
        ];
        setContractorTypeOptions(optionsWithDefault);
      } catch (error) {
        console.error("Error fetching budget years:", error);
      }
    };
    fetchContractorType();
  }, []);
  const handleContractorTypeChange = (e) => {
    setSelectedContractorType(e.target.value);
    validation.setFieldValue("cni_contractor_type_id", e.target.value);
  };
  // validation
  const validation = useFormik({
    // enableReinitialize: use this flag when initial values need to be changed
    enableReinitialize: true,

    initialValues: {
      cni_name: (projectContractor && projectContractor.cni_name) || "",
      cni_tin_num: (projectContractor && projectContractor.cni_tin_num) || "",
      cni_vat_num: (projectContractor && projectContractor.cni_vat_num) || "",
      cni_total_contract_price:
        (projectContractor && projectContractor.cni_total_contract_price) || "",
      cni_contract_start_date_et:
        (projectContractor && projectContractor.cni_contract_start_date_et) ||
        "",
      cni_contract_start_date_gc:
        (projectContractor && projectContractor.cni_contract_start_date_gc) ||
        "",
      cni_contract_end_date_et:
        (projectContractor && projectContractor.cni_contract_end_date_et) || "",
      cni_contract_end_date_gc:
        (projectContractor && projectContractor.cni_contract_end_date_gc) || "",
      cni_contact_person:
        (projectContractor && projectContractor.cni_contact_person) || "",
      cni_phone_number:
        (projectContractor && projectContractor.cni_phone_number) || "",
      cni_address: (projectContractor && projectContractor.cni_address) || "",
      cni_email: (projectContractor && projectContractor.cni_email) || "",
      cni_website: (projectContractor && projectContractor.cni_website) || "",
      cni_project_id:projectid,
      cni_procrument_method:
        (projectContractor && projectContractor.cni_procrument_method) || "",
      cni_bid_invitation_date:
        (projectContractor && projectContractor.cni_bid_invitation_date) || "",
      cni_bid_opening_date:
        (projectContractor && projectContractor.cni_bid_opening_date) || "",
      cni_bid_evaluation_date:
        (projectContractor && projectContractor.cni_bid_evaluation_date) || "",
      cni_bid_award_date:
        (projectContractor && projectContractor.cni_bid_award_date) || "",
      cni_bid_contract_signing_date:
        (projectContractor &&
          projectContractor.cni_bid_contract_signing_date) ||
        "",
      cni_description:
        (projectContractor && projectContractor.cni_description) || "",
      cni_status: (projectContractor && projectContractor.cni_status) || "",

      is_deletable: (projectContractor && projectContractor.is_deletable) || 1,
      is_editable: (projectContractor && projectContractor.is_editable) || 1,
    },

    validationSchema: Yup.object({
      cni_name: Yup.string().required(t("cni_name")),
      cni_tin_num: Yup.string().required(t("cni_tin_num")),
      cni_vat_num: Yup.string().required(t("cni_vat_num")),
      cni_total_contract_price: Yup.string().required(
        t("cni_total_contract_price")
      ),
      cni_contract_start_date_et: Yup.string().required(
        t("cni_contract_start_date_et")
      ),
      cni_contract_start_date_gc: Yup.string().required(
        t("cni_contract_start_date_gc")
      ),
      cni_contract_end_date_et: Yup.string().required(
        t("cni_contract_end_date_et")
      ),
      cni_contract_end_date_gc: Yup.string().required(
        t("cni_contract_end_date_gc")
      ),
      cni_contact_person: Yup.string().required(t("cni_contact_person")),
      cni_phone_number: Yup.string().required(t("cni_phone_number")),
      cni_address: Yup.string().required(t("cni_address")),
      cni_email: Yup.string().required(t("cni_email")),
      cni_website: Yup.string().required(t("cni_website")),
      // cni_project_id: Yup.string().required(t("cni_project_id")),
      cni_procrument_method: Yup.string().required(t("cni_procrument_method")),
      cni_bid_invitation_date: Yup.string().required(
        t("cni_bid_invitation_date")
      ),
      cni_bid_opening_date: Yup.string().required(t("cni_bid_opening_date")),
      cni_bid_evaluation_date: Yup.string().required(
        t("cni_bid_evaluation_date")
      ),
      cni_bid_award_date: Yup.string().required(t("cni_bid_award_date")),
      cni_bid_contract_signing_date: Yup.string().required(
        t("cni_bid_contract_signing_date")
      ),
      cni_description: Yup.string().required(t("cni_description")),
      cni_status: Yup.string().required(t("cni_status")),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      if (isEdit) {
        const updateProjectContractor = {
          cni_id: projectContractor ? projectContractor.cni_id : 0,
          cni_name: values.cni_name,
          cni_tin_num: values.cni_tin_num,
          cni_vat_num: values.cni_vat_num,
          cni_total_contract_price: values.cni_total_contract_price,
          cni_contract_start_date_et: values.cni_contract_start_date_et,
          cni_contract_start_date_gc: values.cni_contract_start_date_gc,
          cni_contract_end_date_et: values.cni_contract_end_date_et,
          cni_contract_end_date_gc: values.cni_contract_end_date_gc,
          cni_contact_person: values.cni_contact_person,
          cni_phone_number: values.cni_phone_number,
          cni_address: values.cni_address,
          cni_email: values.cni_email,
          cni_website: values.cni_website,
          cni_project_id: values.cni_project_id,
          cni_procrument_method: values.cni_procrument_method,
          cni_bid_invitation_date: values.cni_bid_invitation_date,
          cni_bid_opening_date: values.cni_bid_opening_date,
          cni_bid_evaluation_date: values.cni_bid_evaluation_date,
          cni_bid_award_date: values.cni_bid_award_date,
          cni_bid_contract_signing_date: values.cni_bid_contract_signing_date,
          cni_description: values.cni_description,
          cni_status: values.cni_status,

          is_deletable: values.is_deletable,
          is_editable: values.is_editable,
        };
        // update ProjectContractor
        dispatch(onUpdateProjectContractor(updateProjectContractor));
        validation.resetForm();
      } else {
        const newProjectContractor = {
          cni_name: values.cni_name,
          cni_tin_num: values.cni_tin_num,
          cni_vat_num: values.cni_vat_num,
          cni_total_contract_price: values.cni_total_contract_price,
          cni_contract_start_date_et: values.cni_contract_start_date_et,
          cni_contract_start_date_gc: values.cni_contract_start_date_gc,
          cni_contract_end_date_et: values.cni_contract_end_date_et,
          cni_contract_end_date_gc: values.cni_contract_end_date_gc,
          cni_contact_person: values.cni_contact_person,
          cni_phone_number: values.cni_phone_number,
          cni_address: values.cni_address,
          cni_email: values.cni_email,
          cni_website: values.cni_website,
          cni_project_id: values.cni_project_id,
          cni_procrument_method: values.cni_procrument_method,
          cni_bid_invitation_date: values.cni_bid_invitation_date,
          cni_bid_opening_date: values.cni_bid_opening_date,
          cni_bid_evaluation_date: values.cni_bid_evaluation_date,
          cni_bid_award_date: values.cni_bid_award_date,
          cni_bid_contract_signing_date: values.cni_bid_contract_signing_date,
          cni_description: values.cni_description,
          cni_status: values.cni_status,
        };
        // save new ProjectContractors
        dispatch(onAddProjectContractor(newProjectContractor));
        validation.resetForm();
      }
    },
  });
  const [transaction, setTransaction] = useState({});
  const toggleViewModal = () => setModal1(!modal1);
  const dispatch = useDispatch();
  // Fetch ProjectContractor on component mount
  useEffect(() => {
    dispatch(onGetProjectContractor(projectid));
  }, [dispatch]);

  const projectContractorProperties = createSelector(
    (state) => state.ProjectContractorR, // this is geting from  reducer
    (ProjectContractorReducer) => ({
      // this is from Project.reducer
      projectContractor: ProjectContractorReducer.projectContractor,
      loading: ProjectContractorReducer.loading,
      update_loading: ProjectContractorReducer.update_loading,
    })
  );

  const {
    projectContractor: { data, previledge },
    loading,
    update_loading,
  } = useSelector(projectContractorProperties);

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
    setProjectContractor(data);
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data) && !!isEdit) {
      setProjectContractor(data);
      setIsEdit(false);
    }
  }, [data]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setProjectContractor(null);
    } else {
      setModal(true);
    }
  };

  const handleProjectContractorClick = (arg) => {
    const projectContractor = arg;
    // console.log("handleProjectContractorClick", projectContractor);
    setProjectContractor({
      cni_id: projectContractor.cni_id,
      cni_name: projectContractor.cni_name,
      cni_tin_num: projectContractor.cni_tin_num,
      cni_vat_num: projectContractor.cni_vat_num,
      cni_total_contract_price: projectContractor.cni_total_contract_price,
      cni_contract_start_date_et: projectContractor.cni_contract_start_date_et,
      cni_contract_start_date_gc: projectContractor.cni_contract_start_date_gc,
      cni_contract_end_date_et: projectContractor.cni_contract_end_date_et,
      cni_contract_end_date_gc: projectContractor.cni_contract_end_date_gc,
      cni_contact_person: projectContractor.cni_contact_person,
      cni_phone_number: projectContractor.cni_phone_number,
      cni_address: projectContractor.cni_address,
      cni_email: projectContractor.cni_email,
      cni_website: projectContractor.cni_website,
      cni_project_id: projectContractor.cni_project_id,
      cni_procrument_method: projectContractor.cni_procrument_method,
      cni_bid_invitation_date: projectContractor.cni_bid_invitation_date,
      cni_bid_opening_date: projectContractor.cni_bid_opening_date,
      cni_bid_evaluation_date: projectContractor.cni_bid_evaluation_date,
      cni_bid_award_date: projectContractor.cni_bid_award_date,
      cni_bid_contract_signing_date:
        projectContractor.cni_bid_contract_signing_date,
      cni_description: projectContractor.cni_description,
      cni_status: projectContractor.cni_status,

      is_deletable: projectContractor.is_deletable,
      is_editable: projectContractor.is_editable,
    });

    setIsEdit(true);

    toggle();
  };

  //delete projects
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (projectContractor) => {
    setProjectContractor(projectContractor);
    setDeleteModal(true);
  };

  const handleDeleteProjectContractor = () => {
    if (projectContractor && projectContractor.cni_id) {
      dispatch(onDeleteProjectContractor(projectContractor.cni_id));
      setDeleteModal(false);
    }
  };
  const handleProjectContractorClicks = () => {
    setIsEdit(false);
    setProjectContractor("");
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
        accessorKey: "cni_name",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_name, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_tin_num",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_tin_num, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_vat_num",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_vat_num, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_total_contract_price",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(
                cellProps.row.original.cni_total_contract_price,
                30
              ) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_contract_start_date_et",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(
                cellProps.row.original.cni_contract_start_date_et,
                30
              ) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_contract_start_date_gc",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(
                cellProps.row.original.cni_contract_start_date_gc,
                30
              ) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_contract_end_date_et",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(
                cellProps.row.original.cni_contract_end_date_et,
                30
              ) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_contract_end_date_gc",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(
                cellProps.row.original.cni_contract_end_date_gc,
                30
              ) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_contact_person",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_contact_person, 30) ||
                "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_phone_number",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_phone_number, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_address",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_address, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_email",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_email, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_website",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_website, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_project_id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_project_id, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_procrument_method",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_procrument_method, 30) ||
                "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_bid_invitation_date",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(
                cellProps.row.original.cni_bid_invitation_date,
                30
              ) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_bid_opening_date",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_bid_opening_date, 30) ||
                "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_bid_evaluation_date",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(
                cellProps.row.original.cni_bid_evaluation_date,
                30
              ) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_bid_award_date",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_bid_award_date, 30) ||
                "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_bid_contract_signing_date",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(
                cellProps.row.original.cni_bid_contract_signing_date,
                30
              ) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_description",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_description, 30) || "-"}
            </span>
          );
        },
      },
      {
        header: "",
        accessorKey: "cni_status",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              {truncateText(cellProps.row.original.cni_status, 30) || "-"}
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
                    handleProjectContractorClick(data);
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
  }, [handleProjectContractorClick, toggleViewModal, onClickDelete]);

  const project_status = [
    { label: "select Status name", value: "" },
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const dropdawntotal = [project_status];

  return (
    <React.Fragment>
      <ProjectContractorModal
        isOpen={modal1}
        toggle={toggleViewModal}
        transaction={transaction}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProjectContractor}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          {/* <Breadcrumbs
            title={t("project_contractor")}
            breadcrumbItem={t("project_contractor")}
          /> */}
           {projectid?null : <Breadcrumbs
            title={t("project_contractor")}
            breadcrumbItem={t("project_contractor")}
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
                      handleUserClick={handleProjectContractorClicks}
                      isPagination={true}
                      // SearchPlaceholder="26 records..."
                      SearchPlaceholder={26 + " " + t("Results") + "..."}
                      buttonClass="btn btn-success waves-effect waves-light mb-2 me-2 addOrder-modal"
                      buttonName={t("add") + " " + t("project_contractor")}
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
                ? t("edit") + " " + t("project_contractor")
                : t("add") + " " + t("project_contractor")}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  const modalCallback = () => setModal(false);
                  if (isEdit) {
                    onUpdateProjectContractor(validation.values, modalCallback);
                  } else {
                    onAddProjectContractor(validation.values, modalCallback);
                  }
                  return false;
                }}
              >
                <Row>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_name")}</Label>
                    <Input
                      name="cni_name"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_name || ""}
                      invalid={
                        validation.touched.cni_name &&
                        validation.errors.cni_name
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_name &&
                    validation.errors.cni_name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_name}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_tin_num")}</Label>
                    <Input
                      name="cni_tin_num"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_tin_num || ""}
                      invalid={
                        validation.touched.cni_tin_num &&
                        validation.errors.cni_tin_num
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_tin_num &&
                    validation.errors.cni_tin_num ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_tin_num}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_contractor_type_id")}</Label>
                    <Input
                      name="cni_contractor_type_id"
                      type="select"
                      className="form-select"
                      onChange={handleContractorTypeChange}
                      onBlur={validation.handleBlur}
                      value={selectedContractorType}
                    >
                      {contractorTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {t(`${option.label}`)}
                        </option>
                      ))}
                    </Input>
                    {validation.touched.cni_contractor_type_id &&
                    validation.errors.cni_contractor_type_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_contractor_type_id}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_vat_num")}</Label>
                    <Input
                      name="cni_vat_num"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_vat_num || ""}
                      invalid={
                        validation.touched.cni_vat_num &&
                        validation.errors.cni_vat_num
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_vat_num &&
                    validation.errors.cni_vat_num ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_vat_num}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_total_contract_price")}</Label>
                    <Input
                      name="cni_total_contract_price"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_total_contract_price || ""}
                      invalid={
                        validation.touched.cni_total_contract_price &&
                        validation.errors.cni_total_contract_price
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_total_contract_price &&
                    validation.errors.cni_total_contract_price ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_total_contract_price}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_contract_start_date_et")}</Label>
                    <Input
                      name="cni_contract_start_date_et"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_contract_start_date_et || ""}
                      invalid={
                        validation.touched.cni_contract_start_date_et &&
                        validation.errors.cni_contract_start_date_et
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_contract_start_date_et &&
                    validation.errors.cni_contract_start_date_et ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_contract_start_date_et}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_contract_start_date_gc")}</Label>
                    <Input
                      name="cni_contract_start_date_gc"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_contract_start_date_gc || ""}
                      invalid={
                        validation.touched.cni_contract_start_date_gc &&
                        validation.errors.cni_contract_start_date_gc
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_contract_start_date_gc &&
                    validation.errors.cni_contract_start_date_gc ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_contract_start_date_gc}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_contract_end_date_et")}</Label>
                    <Input
                      name="cni_contract_end_date_et"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_contract_end_date_et || ""}
                      invalid={
                        validation.touched.cni_contract_end_date_et &&
                        validation.errors.cni_contract_end_date_et
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_contract_end_date_et &&
                    validation.errors.cni_contract_end_date_et ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_contract_end_date_et}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_contract_end_date_gc")}</Label>
                    <Input
                      name="cni_contract_end_date_gc"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_contract_end_date_gc || ""}
                      invalid={
                        validation.touched.cni_contract_end_date_gc &&
                        validation.errors.cni_contract_end_date_gc
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_contract_end_date_gc &&
                    validation.errors.cni_contract_end_date_gc ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_contract_end_date_gc}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_contact_person")}</Label>
                    <Input
                      name="cni_contact_person"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_contact_person || ""}
                      invalid={
                        validation.touched.cni_contact_person &&
                        validation.errors.cni_contact_person
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_contact_person &&
                    validation.errors.cni_contact_person ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_contact_person}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_phone_number")}</Label>
                    <Input
                      name="cni_phone_number"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_phone_number || ""}
                      invalid={
                        validation.touched.cni_phone_number &&
                        validation.errors.cni_phone_number
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_phone_number &&
                    validation.errors.cni_phone_number ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_phone_number}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_address")}</Label>
                    <Input
                      name="cni_address"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_address || ""}
                      invalid={
                        validation.touched.cni_address &&
                        validation.errors.cni_address
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_address &&
                    validation.errors.cni_address ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_address}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_email")}</Label>
                    <Input
                      name="cni_email"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_email || ""}
                      invalid={
                        validation.touched.cni_email &&
                        validation.errors.cni_email
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_email &&
                    validation.errors.cni_email ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_email}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_website")}</Label>
                    <Input
                      name="cni_website"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_website || ""}
                      invalid={
                        validation.touched.cni_website &&
                        validation.errors.cni_website
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_website &&
                    validation.errors.cni_website ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_website}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* <Col className="col-md-6 mb-3">
                    <Label>{t("cni_project_id")}</Label>
                    <Input
                      name="cni_project_id"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_project_id || ""}
                      invalid={
                        validation.touched.cni_project_id &&
                        validation.errors.cni_project_id
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_project_id &&
                    validation.errors.cni_project_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_project_id}
                      </FormFeedback>
                    ) : null}
                  </Col> */}
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_procrument_method")}</Label>
                    <Input
                      name="cni_procrument_method"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_procrument_method || ""}
                      invalid={
                        validation.touched.cni_procrument_method &&
                        validation.errors.cni_procrument_method
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_procrument_method &&
                    validation.errors.cni_procrument_method ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_procrument_method}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_bid_invitation_date")}</Label>
                    <Input
                      name="cni_bid_invitation_date"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_bid_invitation_date || ""}
                      invalid={
                        validation.touched.cni_bid_invitation_date &&
                        validation.errors.cni_bid_invitation_date
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_bid_invitation_date &&
                    validation.errors.cni_bid_invitation_date ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_bid_invitation_date}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_bid_opening_date")}</Label>
                    <Input
                      name="cni_bid_opening_date"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_bid_opening_date || ""}
                      invalid={
                        validation.touched.cni_bid_opening_date &&
                        validation.errors.cni_bid_opening_date
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_bid_opening_date &&
                    validation.errors.cni_bid_opening_date ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_bid_opening_date}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_bid_evaluation_date")}</Label>
                    <Input
                      name="cni_bid_evaluation_date"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_bid_evaluation_date || ""}
                      invalid={
                        validation.touched.cni_bid_evaluation_date &&
                        validation.errors.cni_bid_evaluation_date
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_bid_evaluation_date &&
                    validation.errors.cni_bid_evaluation_date ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_bid_evaluation_date}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_bid_award_date")}</Label>
                    <Input
                      name="cni_bid_award_date"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_bid_award_date || ""}
                      invalid={
                        validation.touched.cni_bid_award_date &&
                        validation.errors.cni_bid_award_date
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_bid_award_date &&
                    validation.errors.cni_bid_award_date ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_bid_award_date}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_bid_contract_signing_date")}</Label>
                    <Input
                      name="cni_bid_contract_signing_date"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={
                        validation.values.cni_bid_contract_signing_date || ""
                      }
                      invalid={
                        validation.touched.cni_bid_contract_signing_date &&
                        validation.errors.cni_bid_contract_signing_date
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_bid_contract_signing_date &&
                    validation.errors.cni_bid_contract_signing_date ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_bid_contract_signing_date}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_description")}</Label>
                    <Input
                      name="cni_description"
                      type="text"
                      placeholder={t("insert_status_name_amharic")}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_description || ""}
                      invalid={
                        validation.touched.cni_description &&
                        validation.errors.cni_description
                          ? true
                          : false
                      }
                      maxLength={20}
                    />
                    {validation.touched.cni_description &&
                    validation.errors.cni_description ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_description}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  {/* status */}
                  <Col className="col-md-6 mb-3">
                    <Label>{t("cni_status")}</Label>
                    <Input
                      name="cni_status"
                      type="select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cni_status || ""}
                      invalid={
                        validation.touched.cni_status &&
                        validation.errors.cni_status
                          ? true
                          : false
                      }
                    >
                      <option value="" disabled>{t("select_status")}</option>
                      <option value="1">{t("active")}</option>
                      <option value="0">{t("inactive")}</option>
                    </Input>
                    {validation.touched.cni_status &&
                    validation.errors.cni_status ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cni_status}
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
ProjectContractorModel.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default ProjectContractorModel;
