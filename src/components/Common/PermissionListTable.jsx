import React, { useState } from "react";
import {
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
//Import Breadcrumb
import classnames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import Permission from "../../pages/Permission";

const PermissionListTable = ({ handleClick, showCanvas, canvasWidth ,data}) => {

  //meta title PermissionListTable
  document.title = "Right OffCanvas | For Project";

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
        <OffcanvasHeader toggle={handleClick}>{data.rol_name}</OffcanvasHeader>
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
                      {/* <Permission/> */}
                      <span className="d-block d-sm-none">
                        <i className="fas fa-home"></i>
                      </span>
                      <span className="d-none d-sm-block">Permission</span>
                    </NavLink>
                  </NavItem>

                  
                </Nav>

                <TabContent activeTab={activeTab1} className="p-3 text-muted">
                  <TabPane tabId="5">
                    
                     {/* <ProjectDocument /> */}
                     <Permission rol_id={data.rol_id} />

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

export default PermissionListTable;

// import React from "react";
// import { Col, Card, CardBody, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
// import Permission from "../../pages/Permission";

// const PermissionListTable = ({ handleClick, showCanvas, canvasWidth, data }) => {

//   //meta title PermissionListTable
//   document.title = "Right OffCanvas | For Project";

//   return (
//     <React.Fragment>
//       {/* Right offcanvas */}
//       <Offcanvas
//         isOpen={showCanvas}
//         direction="end"
//         toggle={handleClick}
//         style={{ width: `${canvasWidth}vw` }}
//       > 
//         <OffcanvasHeader toggle={handleClick}>{data.rol_name}</OffcanvasHeader>
//         <OffcanvasBody>
//           <Col lg={15}>
//             <Card>
//               <CardBody>
//                 {/* Display the Permission component directly */}
//                 <Permission rol_id={data.rol_id} />
//               </CardBody>
//             </Card>
//           </Col>
//         </OffcanvasBody>
//       </Offcanvas>
//     </React.Fragment>
//   );
// };

// export default PermissionListTable;
