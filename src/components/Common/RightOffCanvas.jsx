import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Label,
  Form,
  Input,
  FormFeedback,
  CardSubtitle,
} from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import classnames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import ProjectDocument from "../../pages/Projectdocument/index";
import ProjectPayment  from "../../pages/Projectpayment";
import ProjectStakeholder from "../../pages/Projectstakeholder";
import Projectcontractor from "../../pages/Projectcontractor";

const RightOffCanvas = ({ handleClick, showCanvas, canvasWidth ,data}) => {

  
  //meta title
  document.title = "Right OffCanvas | For Project";

  //   const [isRight, setIsRight] = useState(false);

  //   const toggleRightCanvas = () => {
  //     setIsRight(!isRight);
  //   };

  const toggle1 = (tab) => {
    if (activeTab1 !== tab) {
      setActiveTab1(tab);
    }
  };

  const [activeTab1, setActiveTab1] = useState("5");

  //Horizontal form
  const horizontalformik = useFormik({
    initialValues: {
      firstname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("This field is required"),
      email: Yup.string()
        .email()
        .matches(/^(?!.*@[^,]*,)/)
        .required("Please Enter Your Email"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(RegExp("(.*[a-z].*)"), "At least lowercase letter")
        .matches(RegExp("(.*[A-Z].*)"), "At least uppercase letter")
        .matches(RegExp("(.*[0-9].*)"), "At least one number")
        .required("This field is required"),
    }),

    onSubmit: (values) => {
      // console.log("value", values.password);
    },
  });

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  return (
    <React.Fragment>
      {/* Right offcanvas */}
      <Offcanvas
        isOpen={showCanvas}
        direction="end"
        toggle={handleClick}
        style={{ width: `${canvasWidth}vw` }}
      > 
        <OffcanvasHeader toggle={handleClick}>Project Id : {data.prj_name}</OffcanvasHeader>
        <OffcanvasBody>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Nav pills className="navtab-bg nav-justified">

                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab1 === "5",

                      })}
                      onClick={() => {
                        toggle1("5");
                      }}
                     >
                      {/* <ProjectDocument/> */}
                      <span className="d-block d-sm-none">
                        <i className="fas fa-home"></i>
                      </span>
                      <span className="d-none d-sm-block">Documents</span>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab1 === "6",
                      })}
                      onClick={() => {
                        toggle1("6");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="far fa-user"></i>
                      </span>
                      <span className="d-none d-sm-block">Payments</span>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab1 === "7",
                      })}
                      onClick={() => {
                        toggle1("7");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="far fa-envelope"></i>
                      </span>
                      <span className="d-none d-sm-block">Project Stakeholder</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab1 === "8",
                      })}
                      onClick={() => {
                        toggle1("8");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="fas fa-cog"></i>
                      </span>
                      <span className="d-none d-sm-block">Projectcontractor</span>
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab1} className="p-3 text-muted">
                  <TabPane tabId="5">
                    
                     {/* <ProjectDocument /> */}
                     <ProjectDocument documentData={data.prj_id} />

                  </TabPane>

                  <TabPane tabId="6">
                   
                    <ProjectPayment projectid={data.prj_id} />

                  </TabPane>

                  <TabPane tabId="7">
                   
                    <ProjectStakeholder projectid={data.prj_id} />
                  </TabPane>

                  <TabPane tabId="8">
                   {/* <Projectcontractor/> */}
                   <Projectcontractor projectid={data.prj_id} />

                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </OffcanvasBody>
      </Offcanvas>
    </React.Fragment>
  );
};

export default RightOffCanvas;
