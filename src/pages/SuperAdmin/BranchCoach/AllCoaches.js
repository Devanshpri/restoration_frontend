import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import { Row, Col, Card, CardBody, Input } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import PageTitle from "../../../components/PageTitle";

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange,
}) => (
  <React.Fragment>
    <label className="d-inline mr-1">Show</label>
    <Input
      type="select"
      name="select"
      id="no-entries"
      className="custom-select custom-select-sm d-inline col-1"
      defaultValue={currSizePerPage}
      onChange={(e) => onSizePerPageChange(e.target.value)}
    >
      {options.map((option, idx) => {
        return <option key={idx}>{option.text}</option>;
      })}
    </Input>
    <label className="d-inline ml-1">entries</label>
  </React.Fragment>
);

const AllCoaches = () => {
  const deleteFormatter = function () {
    return <Button className="btn btn-success">Download</Button>;
  };

  const editFormatter = function () {
    return (
      <Button
        type="button"
        className="btn "
        style={{ backgroundColor: "#636e72", border: "1px solid #636e72" }}
      >
        Edit
      </Button>
    );
  };

  const columns = [
    {
      text: "Index",
      dataField: "indexId",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "150px" };
      },
      sort: true,
    },
    // {
    //   text: "Coach ID",
    //   dataField: "_id",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap", width: "90px" };
    //   },
    //   sort: true,
    // },
    {
      text: "Name",
      dataField: "full_name",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "100px" };
      },
      sort: true,
    },
    // {
    //   text: "Clients",
    //   dataField: "clients",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap" };
    //   },
    //   sort: true,
    // },
    // {
    //   text: "Appointments",
    //   dataField: "app",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap" };
    //   },
    //   sort: true,
    // },
    // {
    //   text: "Branch",
    //   dataField: "branch",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap" };
    //   },
    //   sort: true,
    // },
    {
      text: "Contact",
      dataField: "phone_number",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "80px" };
      },
      sort: true,
    },
    {
      text: "Download Docs",
      dataField: "Download Docs",
      formatter: deleteFormatter,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "100px" };
      },
    },
    // {
    //   text: "Edit",
    //   dataField: "Edit",
    //   formatter: editFormatter,
    //   sort: true,
    //   events: {
    //     onClick: async (e, column, columnIndex, row) => {
    //       if (localStorage.getItem("usertype") === "superadmin") {
    //         let res = await Axios.get(
    //           `${process.env.REACT_APP_API_URL}/sAdmin/getCoach/${row._id}`
    //         );
    //         if (res.data) {
    //           setFormData(res.data);
    //           setShow(true);
    //         }
    //       } else {
    //         alert("You are Not Super Admin");
    //       }
    //     },
    //   },
    // },
    // {
    //   text: "Delete",
    //   dataField: "Delete",
    //   formatter: deleteFormatter,
    //   sort: true,
    //   events: {
    //     onClick: async (e, column, columnIndex, row) => {
    //       if (localStorage.getItem("usertype") === "superadmin") {
    //         let res = await Axios.post(
    //           `${process.env.REACT_APP_API_URL}/sAdmin/deleteCoach/${row._id}`
    //         );
    //         if (res.data.massage === "done") {
    //           alert("Deleted Coach");
    //           window.location.reload();
    //         }
    //       } else {
    //         alert("You are Not Super Admin");
    //       }
    //     },
    //   },
    // },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/sAdmin/coaches`
      );
      if (result) {
        setRecords(result.data);
        console.log(result.data, "******* This is coach");
        setLoading(false);
      }
    })();
  }, []);

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setShow(false);
  };

  const submitForm = async () => {
    console.log("yes this is opern");
    const {
      DOB,
      eduQual,
      full_name,
      gender,
      idProof,
      phone_number,
      userName,
      password,
      coachName,
      idNumber,
    } = formData;
    if (
      !DOB ||
      !eduQual ||
      !full_name ||
      !gender ||
      !idProof ||
      !phone_number ||
      !userName ||
      !password ||
      !coachName ||
      !idNumber
    ) {
      alert("Fill all the Fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Password Not Matched Please Enter Again");
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_URL}/sAdmin/newCoach`, {
        // await Axios.post(`http://localhost:8000/api/sAdmin/newCoach`, {
        ...formData,
      });
      setShow(false);
      if (formData._id) {
        alert("Coach Updated");
      } else {
        alert("Coach Added");
      }
      window.location.reload();
    } catch (err) {
      alert("Duplicate values found , please check all values ");
    }
  };

  const handleShow = () => {
    setFormData({});
    setShow(true);
  };
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    console.log("Make something");
  };

  return (
    <React.Fragment>
      <Row className="page-title">
        <Col className="col-12">
          <PageTitle breadCrumbItems={[]} title={"All Coaches"} />
        </Col>
        <Col className="text-right" style={{ marginTop: 10 }}>
          {localStorage.getItem("usertype") === "superadmin" && (
            <button className="btn btn-success" onClick={handleShow}>
              Add New Coach
            </button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                bootstrap4
                keyField="id"
                data={records}
                columns={columns}
                search
                exportCSV={{ onlyExportFiltered: true, exportAll: false }}
              >
                {(props) => (
                  <React.Fragment>
                    <Row>
                      <Col>
                        <SearchBar {...props.searchProps} />
                      </Col>
                      <Col className="text-right">
                        <ExportCSVButton
                          {...props.csvProps}
                          className="btn btn-success"
                        >
                          Export CSV
                        </ExportCSVButton>
                      </Col>
                    </Row>

                    {records.length ? (
                      <BootstrapTable
                        {...props.baseProps}
                        bordered={false}
                        defaultSorted={defaultSorted}
                        pagination={paginationFactory({
                          sizePerPage: 5,
                          sizePerPageRenderer: sizePerPageRenderer,
                          sizePerPageList: [
                            { text: "5", value: 5 },
                            { text: "10", value: 10 },
                            { text: "25", value: 25 },
                            { text: "All", value: records.length },
                          ],
                        })}
                        wrapperClasses="table-responsive"
                      />
                    ) : loading ? (
                      <h3 style={{ textAlign: "center" }}>Loading...</h3>
                    ) : (
                      <h3 style={{ textAlign: "center" }}>No coaches Found</h3>
                    )}
                  </React.Fragment>
                )}
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Coach</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Row>
                  <Col>
                    <Form.Label>Coach Name</Form.Label>
                    <Form.Control
                      required
                      value={formData.coachName}
                      type="text"
                      name="coachName"
                      placeholder="Coach Name"
                      onChange={handleFormData}
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>User Name (For login)</Form.Label>
                    <Form.Control
                      required
                      value={formData.userName}
                      type="text"
                      name="userName"
                      placeholder="User Name"
                      onChange={handleFormData}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Branch Name</Form.Label>
                    <Form.Control
                      value={formData.full_name}
                      required
                      onChange={handleFormData}
                      name="full_name"
                      placeholder="Full Name"
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      value={formData.phone_number}
                      required
                      type="number"
                      name="phone_number"
                      onChange={handleFormData}
                      placeholder="Contact Number"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginRight: "10px" }}>
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control
                      required
                      value={formData.DOB}
                      type="date"
                      name="DOB"
                      onChange={handleFormData}
                    />
                  </Col>
                  <Col style={{ marginLeft: "74px" }}>
                    <Form.Label>Education Qualification</Form.Label>
                    <Form.Control
                      value={formData.eduQual}
                      as="select"
                      name="eduQual"
                      onChange={handleFormData}
                    >
                      <option>Choose..</option>
                      <option>10Th Pass</option>
                      <option>12Th Pass</option>
                      <option>Graduate</option>
                      <option>Post-Graduate</option>
                      <option>Other</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginRight: "40px" }}>
                    <Form.Label style={{width: "174px"}}>Id Proof</Form.Label>
                    <Form.Control
                      value={formData.idProof}
                      as="select"
                      name="idProof"
                      onChange={handleFormData}
                    >
                      <option>Choose..</option>
                      <option>Adhaar Card</option>
                      <option>Pan Card</option>
                      <option>Voter Id Card</option>
                      <option>Driving Licence</option>
                      <option>Other</option>
                    </Form.Control>
                  </Col>
                  <Col style={{ marginLeft: "42px" }}>
                    <Form.Label style={{width: "157px"}}>Gender</Form.Label>
                    <Form.Control
                      value={formData.gender}
                      as="select"
                      name="gender"
                      onChange={handleFormData}
                      // style={{margineft: "140px"}}
                    >
                      <option>Choose..</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control
                      value={formData.idNumber}
                      required
                      type="number"
                      name="idNumber"
                      onChange={handleFormData}
                      placeholder="Aadhar Number"
                    />
                  </Col>
                  <Col>
                    <Form.Label style={{ marginLeft: "80px" }}>
                      Attach ID
                    </Form.Label>
                    <div style={{ alignSelf: "center", textAlignLast: "end", marginRight: "10px"}}>
                      <input
                        style={{paddingTop: "4px", paddingBottom: "4px"}}
                        type="file"
                        onChange={(e) => handleFileChange(e)}
                        ref={fileInput}
                      />
                      {/* <div style={{marginLeft: "80px"}} onClick={() => handleClick()}></div> */}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Password (For login)</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={handleFormData}
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      onChange={handleFormData}
                    />
                  </Col>
                </Row>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                backgroundColor: "#636e72",
                border: "1px solid #636e72",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={submitForm}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </React.Fragment>
  );
};

export default AllCoaches;
