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
import ProjectDocument from "../../pages/Documenttype/index";
const RightOffCanvas = ({ handleClick, showCanvas, canvasWidth ,data}) => {
  console.log(data);
  
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
        <OffcanvasHeader toggle={handleClick}>Project Id : {data.prs_id}</OffcanvasHeader>
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
                      <span className="d-none d-sm-block">Messages</span>
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
                      <span className="d-none d-sm-block">Settings</span>
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab1} className="p-3 text-muted">
                  <TabPane tabId="5">
                    {/* <Row>
                      <Col xl={8} className="mx-auto">
                        <Card>
                          <CardBody>
                            <CardTitle className="mb-4">
                              Fill and Attach all necessary things !
                            </CardTitle>
                            <Form onSubmit={horizontalformik.handleSubmit}>
                              <Row className="mb-4">
                                <Label
                                  htmlFor="horizontal-firstname-Input"
                                  className="col-sm-3 col-form-label"
                                >
                                  First name
                                </Label>
                                <Col sm={9}>
                                  <Input
                                    name="firstname"
                                    type="text"
                                    className="form-control"
                                    id="horizontal-firstname-Input"
                                    placeholder="Enter Your"
                                    value={horizontalformik.values.firstname}
                                    onChange={horizontalformik.handleChange}
                                    onBlur={horizontalformik.handleBlur}
                                    invalid={
                                      horizontalformik.touched.firstname &&
                                      horizontalformik.errors.firstname
                                        ? true
                                        : false
                                    }
                                  />
                                  {horizontalformik.errors.firstname &&
                                  horizontalformik.touched.firstname ? (
                                    <FormFeedback type="invalid">
                                      {horizontalformik.errors.firstname}
                                    </FormFeedback>
                                  ) : null}
                                </Col>
                              </Row>
                              <Row className="mb-4">
                                <Label
                                  htmlFor="horizontal-email-Input"
                                  className="col-sm-3 col-form-label"
                                >
                                  Email
                                </Label>
                                <Col sm={9}>
                                  <Input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="horizontal-email-Input"
                                    placeholder="Enter Your Email ID"
                                    value={horizontalformik.values.email}
                                    onChange={horizontalformik.handleChange}
                                    onBlur={horizontalformik.handleBlur}
                                    invalid={
                                      horizontalformik.touched.email &&
                                      horizontalformik.errors.email
                                        ? true
                                        : false
                                    }
                                  />
                                  {horizontalformik.errors.email &&
                                  horizontalformik.touched.email ? (
                                    <FormFeedback type="invalid">
                                      {horizontalformik.errors.email}
                                    </FormFeedback>
                                  ) : null}
                                </Col>
                              </Row>
                              <Row className="mb-4">
                                <Label
                                  htmlFor="horizontal-password-Input"
                                  className="col-sm-3 col-form-label"
                                >
                                  Password
                                </Label>
                                <Col sm={9}>
                                  <Input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="horizontal-password-Input"
                                    autoComplete="off"
                                    placeholder="Enter Your Password"
                                    value={horizontalformik.values.password}
                                    onChange={horizontalformik.handleChange}
                                    onBlur={horizontalformik.handleBlur}
                                    invalid={
                                      horizontalformik.touched.password &&
                                      horizontalformik.errors.password
                                        ? true
                                        : false
                                    }
                                  />
                                  {horizontalformik.errors.password &&
                                  horizontalformik.touched.password ? (
                                    <FormFeedback type="invalid">
                                      {horizontalformik.errors.password}
                                    </FormFeedback>
                                  ) : null}
                                </Col>
                              </Row>
                              <Row>
                                <Col className="col-12">
                                  <Card>
                                    <CardBody>
                                      <CardSubtitle className="mb-3">
                                        Attach or upload you file here !.
                                      </CardSubtitle>
                                      <Form>
                                        <Dropzone
                                          onDrop={(acceptedFiles) => {
                                            handleAcceptedFiles(acceptedFiles);
                                          }}
                                        >
                                          {({
                                            getRootProps,
                                            getInputProps,
                                          }) => (
                                            <div className="dropzone">
                                              <div
                                                className="dz-message needsclick mt-2"
                                                {...getRootProps()}
                                              >
                                                <input {...getInputProps()} />
                                                <div className="mb-3">
                                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                </div>
                                                <h4>
                                                  Drop files here or click to
                                                  upload.
                                                </h4>
                                              </div>
                                            </div>
                                          )}
                                        </Dropzone>
                                        <div
                                          className="dropzone-previews mt-3"
                                          id="file-previews"
                                        >
                                          {selectedFiles.map((f, i) => {
                                            return (
                                              <Card
                                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                key={i + "-file"}
                                              >
                                                <div className="p-2">
                                                  <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                      <img
                                                        data-dz-thumbnail=""
                                                        height="80"
                                                        className="avatar-sm rounded bg-light"
                                                        alt={f.name}
                                                        src={f.preview}
                                                      />
                                                    </Col>
                                                    <Col>
                                                      <Link
                                                        to="#"
                                                        className="text-muted font-weight-bold"
                                                      >
                                                        {f.name}
                                                      </Link>
                                                      <p className="mb-0">
                                                        <strong>
                                                          {f.formattedSize}
                                                        </strong>
                                                      </p>
                                                    </Col>
                                                  </Row>
                                                </div>
                                              </Card>
                                            );
                                          })}
                                        </div>
                                      </Form>
                                    </CardBody>
                                  </Card>
                                </Col>
                              </Row>

                              <Row className="justify-content-end">
                                <div>
                                  <button
                                    type="submit"
                                    className="btn btn-primary w-lg"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </Row>
                            </Form>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row> */}
                     <ProjectDocument/>
                  </TabPane>

                  <TabPane tabId="6">
                    <Row>
                      <Col xl={12}>
                        <Card>
                          <CardBody>
                            <CardTitle className="h4">Hoverable </CardTitle>

                            <div className="table-responsive">
                              <Table className="table table-hover mb-0">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="7">
                    <Row>
                      <Col sm="12">
                        <CardText className="mb-0">
                          Etsy mixtape wayfarers, ethical wes anderson tofu
                          before they sold out mcsweeney&apos;s organic lomo
                          retro fanny pack lo-fi farm-to-table readymade.
                          Messenger bag gentrify pitchfork tattooed craft beer,
                          iphone skateboard locavore carles etsy salvia banksy
                          hoodie helvetica. DIY synth PBR banksy irony. Leggings
                          gentrify squid 8-bit cred pitchfork. Williamsburg banh
                          mi whatever gluten-free, carles pitchfork biodiesel
                          fixie etsy retro mlkshk vice blog. Scenester cred you
                          probably haven&apos;t heard of them, vinyl craft beer
                          blog stumptown. Pitchfork sustainable tofu synth
                          chambray yr.
                        </CardText>
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="8">
                    <Row>
                      <Col sm="12">
                        <CardText className="mb-0">
                          Trust fund seitan letterpress, keytar raw denim
                          keffiyeh etsy art party before they sold out master
                          cleanse gluten-free squid scenester freegan cosby
                          sweater. Fanny pack portland seitan DIY, art party
                          locavore wolf cliche high life echo park Austin. Cred
                          vinyl keffiyeh DIY salvia PBR, banh mi before they
                          sold out farm-to-table VHS viral locavore cosby
                          sweater. Lomo wolf viral, mustache readymade
                          thundercats keffiyeh craft beer marfa ethical. Wolf
                          salvia freegan, sartorial keffiyeh echo park vegan.
                        </CardText>
                      </Col>
                    </Row>
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
