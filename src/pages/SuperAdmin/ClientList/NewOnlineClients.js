import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { Row, Col, Card, CardBody, Input } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import PageTitle from "../../../components/PageTitle";

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

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

const AllClients = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isClickOnDelete, setisClickOnDelete] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [rowId, setrowId] = useState();
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let languageOptions = [
    "Choose",
    "NA",
    "Kannada",
    "Tamil",
    "Telegu",
    "Malayalam",
    "Hindi",
    "English",
  ];
  const [userId, setUserId] = useState("");

  const deleteFormatter = function () {
    return <Button className="btn btn-success">Delete</Button>;
  };

  const editFormatter = function () {
    return <Button type="button" className="btn " style={{ backgroundColor: "#636e72", border: "1px solid #636e72" }}>Edit</Button>;
  };
  const handleDeleteModal = () => {
    console.log("handle");

    setdeleteModal(false);
  };

  const deleteThis = async () => {
    console.log("time to delete this", rowId);
    if (localStorage.getItem("usertype") === "superadmin") {
      let res = await Axios.post(
        `${process.env.REACT_APP_API_URL}/sAdmin/deleteClient/${rowId}`
      );
      if (res.data.massage === "done") {
        alert("Deleted Client");
        window.location.reload(false);
      }
    } else {
      alert("You are Not Master Admin");
    }
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
    //   text: "Client ID",
    //   dataField: "_id",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap", width: "220px" };
    //   },
    //   sort: true,
    // },
    {
      text: "Name",
      dataField: "full_name",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "170px" };
      },
      sort: true,
    },
    {
      text: "Age",
      dataField: "age",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "100px" };
      },
      sort: true,
    },
    {
      text: "Gender",
      dataField: "gender",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "100px" };
      },
      sort: true,
    },
    {
      text: "Coach",
      dataField: "coachName",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "170px" };
      },
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row) => {
          if (localStorage.getItem("usertype") === "superadmin") {
            setUserId(row._id);
            handleShowCoach();
          }
        },
      },
    },
    {
      text: "Status",
      dataField: "status",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "100px" };
      },
      sort: true,
    },
    {
      text: "Contact",
      dataField: "phone_number",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "130px" };
      },
      sort: true,
    },
    {
      text: "Email",
      dataField: "email",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "200px" };
      },
      sort: true,
    },
    {
      text: "Pin",
      dataField: "pincode",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "100px" };
      },
      sort: true,
    },
    {
      text: "City",
      dataField: "city",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "140px" };
      },
      sort: true,
    },
    {
      text: "Branch Name",
      dataField: "branchName",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "180px" };
      },
      events: {
        onClick: (e, column, columnIndex, row) => {
          if (localStorage.getItem("usertype") === "superadmin") {
            setUserId(row._id);
            handleShow();
          }
        },
      },
      sort: true,
    },
    {
      text: "Mode",
      dataField: "mode",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "100px" };
      },
      sort: true,
    },
    // {
    //   text: "Edit",
    //   dataField: "Edit",
    //   formatter: editFormatter,
    //   sort: true,
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap", width: "100px" };
    //   },
    //   events: {
    //     onClick: async (e, column, columnIndex, row) => {
    //       if (localStorage.getItem("usertype") === "superadmin") {
    //         let res = await Axios.get(
    //           `${process.env.REACT_APP_API_URL}/sAdmin/getClient/${row._id}`
    //         );
    //         if (res.data) {
    //           setFormData(res.data);
    //           handleShowClients();
    //         }
    //       } else {
    //         alert("You are Not Super Admin");
    //       }
    //     },
    //   },
    // },
    {
      text: "Delete",
      dataField: "Delete",
      formatter: deleteFormatter,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "100px" };
      },
      events: {
        onClick: async (e, column, columnIndex, row) => {
          // setisClickOnDelete(true)
          // console.log(isClickOnDelete)
          setdeleteModal(true);
          setrowId(row._id);
          // if (localStorage.getItem("usertype") === "superadmin") {
          //   let res = await Axios.post(
          //     `${process.env.REACT_APP_API_URL}/sAdmin/deleteClient/${row._id}`
          //   );
          //   if (res.data.massage === "done") {
          //     alert("Deleted Client");
          //     window.location.reload(false);
          //   }
          // } else {
          //   alert("You are Not Super Admin");
          // }
        },
      },
    },
  ];
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [toggle, settoggle] = useState(true);
  const [branchOptions, setBranchOptions] = useState([
    { label: "Choose", value: "choose" },
  ]);
  const [coachOptions, setCoachOptions] = useState([
    { label: "Choose", value: "choose" },
  ]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      // const result = await Axios.get(
      //   `${process.env.REACT_APP_API_URL}/newClients`
      // );
      const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/newClients`
      );
      // console.log(result.data,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>this is new client")
      const branches = await Axios.get(
        `${process.env.REACT_APP_API_URL}/sAdmin/branches`
      );
      const coaches = await Axios.get(
        `${process.env.REACT_APP_API_URL}/sAdmin/coaches`
      );
      if (result) {
        let newClients = result.data.filter(
          (a) => a.branchName === "Click To Allocate"
        );
        setRecords(newClients);
      }
      let branchOptionsAll;
      if (branches)
        branchOptionsAll = branches?.data?.map((a) => {
          return { value: a._id, label: a.name };
        });
      if (branchOptionsAll.length) {
        branchOptionsAll.unshift({ label: "Choose", value: "" });
        setBranchOptions(branchOptionsAll);
      }
      let coachOptionsAll;
      if (coaches)
        coachOptionsAll = coaches?.data?.map((a) => {
          return { value: a._id, label: a.full_name };
        });
      if (coachOptionsAll.length) {
        coachOptionsAll.unshift({ label: "Choose", value: "" });
        setCoachOptions(coachOptionsAll);
        setLoading(false);
      }
    })();
  }, [toggle]);

  let [show, setShow] = useState(false);
  let [showClient, setShowClient] = useState(false);
  let [showCoach, setShowCoach] = useState(false);
  let [branchId, setBranchId] = useState();
  let [coachId, setCoachId] = useState();
  let [branchName, setBranchName] = useState();
  let [coachName, setCoachName] = useState();

  const handleChangeee = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setBranchId(e.target.value);
    setBranchName(label);
  };

  const handleChangeCoach = async (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setCoachId(e.target.value);
    setCoachName(label);
  };

  const submitBranch = async () => {
    await Axios.post(
      `${process.env.REACT_APP_API_URL}/sAdmin/allocateBranch/${userId}/${branchId}/${branchName}`
    );
    setShow(false);
    window.location.reload();
  };

  const handleCloseCommon = async () => {
    setShow(false);
    setShowCoach(false);
    setShowClient(false);
  };

  const submitCoach = async () => {
    await Axios.post(
      `${process.env.REACT_APP_API_URL}/sAdmin/allocateCoach/${userId}/${coachId}/${coachName}`
    );
    setShowCoach(false);
    window.location.reload();
  };

  const submitForm = async () => {
    const {
      full_name,
      phone_number,
      email,
      gender,
      age,
      city,
      state,
      pincode,
      language,
      DOB,
      isPatient,
    } = formData;
    if (
      !full_name ||
      !phone_number ||
      !email ||
      !gender ||
      !age ||
      !city ||
      !state ||
      !pincode ||
      !language ||
      !DOB ||
      !isPatient
    ) {
      alert("Fill all the Fields");
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_URL}/sAdmin/newClient`, {
        ...formData,
      });
      setShow(false);
      settoggle(!toggle);
      if (formData._id) {
        alert("Client Updated");
      } else {
        alert("Client Added");
      }
      window.location.reload();
    } catch (err) {
      alert("Duplicate values found , please check all values ");
    }
  };

  const handleShow = () => setShow(true);
  const handleShowClients = () => setShowClient(true);
  const handleShowCoach = () => setShowCoach(true);
  return (
    <React.Fragment>
      <Row className="page-title">
        <Col className="col-12">
          <PageTitle breadCrumbItems={[]} title={"All Clients"} />
        </Col>
      </Row>
      <Col className="text-right" style={{ marginBottom: 25 }}>
        <button className="btn btn-success" onClick={handleShowClients}>
          Add New Client
        </button>
      </Col>
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
                    {/* <Row style={{marginRight: 140}}> */}
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
                        width="150"
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
                      <h3 style={{ textAlign: "center" }}>
                        No new clients Found
                      </h3>
                    )}
                  </React.Fragment>
                )}
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal show={show} onHide={handleCloseCommon}>
        <Modal.Header closeButton>
          <Modal.Title>Allocate Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Select Branch </label>
          {branchOptions.length ? (
            <select onChange={handleChangeee}>
              {branchOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <div>No branches Available</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCommon}>
            Close
          </Button>
          <Button variant="success" onClick={submitBranch}>
            Allocate Branch
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCoach} onHide={handleCloseCommon}>
        <Modal.Header closeButton>
          <Modal.Title>Allocate Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Select Coach </label>
          {coachOptions.length ? (
            <select onChange={handleChangeCoach}>
              {coachOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <div>No coaches Availabel</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCommon}>
            Close
          </Button>
          <Button variant="success" onClick={submitCoach}>
            Allocate Coach
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showClient} onHide={handleCloseCommon}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Row>
                <Col>
                  <Form.Label>Full Name</Form.Label>
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
                <Col>
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    required
                    name="email"
                    onChange={handleFormData}
                    value={formData.email}
                    placeholder="Email"
                  />
                </Col>
                <Col style={{ marginLeft: "102px" }}>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    value={formData.gender}
                    as="select"
                    name="gender"
                    onChange={handleFormData}
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
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={formData.age}
                    required
                    onChange={handleFormData}
                    type="number"
                    name="age"
                    placeholder="Age"
                  />
                </Col>
                <Col style={{ marginLeft: "60px" }}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={formData.city}
                    required
                    name="city"
                    onChange={handleFormData}
                    placeholder="City"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    value={formData.state}
                    required
                    onChange={handleFormData}
                    name="state"
                    placeholder="State "
                  />
                </Col>
                <Col style={{ marginLeft: "60px" }}>
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    value={formData.pincode}
                    required
                    name="pincode"
                    type="Number"
                    onChange={handleFormData}
                    placeholder="Pin-Code"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    value={formData.language}
                    as="select"
                    name="language"
                    onChange={handleFormData}
                  >
                    {languageOptions.map((option) => (
                      <option value={option}>{option}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col style={{ marginLeft: "129px" }}>
                  <Form.Label>Date Of Birth</Form.Label>
                  <Form.Control
                    required
                    value={formData.DOB}
                    type="date"
                    name="DOB"
                    onChange={handleFormData}
                  />
                </Col>
              </Row>
              {/* <div>
                <Row>
                  <Col>
                    <Form.Label>Is Patient</Form.Label>
                    <Form.Control
                      value={formData.isPatient}
                      as="select"
                      name="isPatient"
                      onChange={handleFormData}
                      style={{ width: "116px" }}
                    >
                      <option>Choose..</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Form.Control>
                  </Col>
                </Row>
              </div> */}
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" className="btn " style={{ backgroundColor: "#636e72", border: "1px solid #636e72" }} onClick={handleCloseCommon}>
            Cancel
          </Button>
          <Button variant="success" onClick={submitForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {(() => {
        return (
          <Modal show={deleteModal} onHide={handleDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Do you want to delete ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <Form> */}
              {/* <Form.Row> */}
              {/* <Row> */}
              {/* <Col> */}
              {/* <Form.Label>Name</Form.Label> */}
              {/* <Form.Control
              required
              onChange={handleFormData}
              name="name"
              value={formData.name}
              placeholder="Name of disease"
            /> */}
              {/* </Col> */}
              {/* <Col> */}
              {/* <Form.Label>Price</Form.Label> */}
              {/* <Form.Control
              value={formData.price}
              required
              onChange={handleFormData}
              type="number"
              min="1"
              name="price"
              placeholder="Price"
            /> */}
              {/* </Col> */}
              {/* </Row> */}
              {/* </Form.Row> */}
              {/* </Form> */}
            </Modal.Body>
            {/* {(()=>{ setisClickOnDelete(false)} )()} */}
            <Modal.Footer>
              <Button style={{ backgroundColor: "#636e72", border: "1px solid #636e72" }} onClick={handleDeleteModal}>
                Cancel
              </Button>
              <Button variant="success" onClick={deleteThis}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        );
      })()}
    </React.Fragment>
  );
};

export default AllClients;
