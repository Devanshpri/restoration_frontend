import React, { useState, useEffect } from "react";
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
import PageTitle from "../../components/PageTitle";

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

const AllBranches = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClickOnDelete, setisClickOnDelete] = useState(false);
  const [rowId, setrowId] = useState();
  const { SearchBar } = Search;

  const { ExportCSVButton } = CSVExport;
  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/sAdmin/getAdmins`
      );
      if (result) {
        setRecords(result.data);

        setLoading(false);
      }
    })();
  }, []);

  const [showAdmin, setShowAdmin] = useState(false);
  const [formData, setFormData] = useState({});
  const [deleteModal, setdeleteModal] = useState(false);

  const handleClose = () => {
    setShowAdmin(false);
  };
  const handleDeleteModal = () => {
    console.log("handle");

    setdeleteModal(false);
  };

  const deleteThis = async () => {
    console.log("time to delete this", rowId);
    setisClickOnDelete(true);
    console.log(isClickOnDelete);
    setrowId(rowId);
    if (localStorage.getItem("usertype") === "superadmin") {
      let res = await Axios.post(
        `${process.env.REACT_APP_API_URL}/sAdmin/deleteAdmin/${rowId}`
      );
      if (res.data.massage === "done") {
        alert("Deleted Admin");
        window.location.reload();
      }
    } else {
      alert("You are Not Master Admin");
    }
  };
  const submitFormAdmin = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Password Not Matched Please Enter Again");
      return;
    }
    const { userName, adminName, password, adminContact } = formData;
    if (!userName || !adminName || !password || !adminContact) {
      alert("Fill All the Fileds");
      return;
    }

    let res = await Axios.post(
      `${process.env.REACT_APP_API_URL}/sAdmin/newAdmin`,
      // `http://localhost:8000/api/sAdmin/newAdmin`,
      { ...formData }
    );
    if (res.data.massage === "done") {
      if (formData._id) {
        alert("Admin Updated");
      } else {
        alert("Admin Added successfully");
        // window.location.reload();
      }
      window.location.reload();
      setShowAdmin(false);
      return;
    } else {
      alert("Validation error");
      return;
    }
  };

  const handleShowAdmin = () => {
    setShowAdmin(true);
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteFormatter = function () {
    return <Button className="btn btn-success">Delete</Button>;
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
    {
      text: "Admin Name",
      dataField: "adminName",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "200px" };
      },
      sort: true,
    },
    // {
    //   text: "Admin Name",
    //   dataField: "adminName",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap" };
    //   },
    //   sort: true,
    // },
    {
      text: "User Name",
      dataField: "userName",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "200px" };
      },
      sort: true,
    },
    {
      text: "Contact Number",
      dataField: "adminContact",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "150px" };
      },
      sort: true,
    },
    {
      text: "Edit",
      dataField: "Edit",
      formatter: editFormatter,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: "90px" };
      },
      events: {
        onClick: async (e, column, columnIndex, row) => {
          if (localStorage.getItem("usertype") === "superadmin") {
            let res = await Axios.get(
              `${process.env.REACT_APP_API_URL}/sAdmin/getAdmin/${row._id}`
            );
            if (res.data) {
              setFormData(res.data);
              setShowAdmin(true);
            }
          } else {
            alert("You are Not Master Admin");
          }
        },
      },
    },
    {
      text: "Delete",
      dataField: "Delete",
      formatter: deleteFormatter,
      sort: true,
      events: {
        onClick: async (e, column, columnIndex, row) => {
          setdeleteModal(true);
          setrowId(row._id);
          // if (localStorage.getItem("usertype") === "superadmin") {
          //   let res = await Axios.post(
          //     `${process.env.REACT_APP_API_URL}/sAdmin/deleteAdmin/${row._id}`
          //   );
          //   if (res.data.massage === "done") {
          //     alert("Deleted Admin");
          //     window.location.reload();
          //   }
          // } else {
          //   alert("You are Not Super Admin");
          // }
        },
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];
  // const [adminId, setAdminId] = useState();
  // const [adminName, setAdminName] = useState();
  // const handleChange=(e)=>{
  // 	let index = e.nativeEvent.target.selectedIndex;
  // 	let label = e.nativeEvent.target[index].text;
  // 	setAdminId(e.target.value)
  // 	setAdminName(label)
  // }
  return (
    <React.Fragment>
      <Row className="page-title">
        <Col className="col-12">
          <PageTitle breadCrumbItems={[]} title={"All Admins"} />
        </Col>
        <Col className="text-right" style={{ marginTop: 10 }}>
          <button className="btn btn-success" onClick={handleShowAdmin}>
            Add New Admin
          </button>
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
                deleteRow={true}
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
                            { text: "All", value: records?.length || 0 },
                          ],
                        })}
                        wrapperClasses="table-responsive"
                      />
                    ) : loading ? (
                      <h3 style={{ textAlign: "center" }}>Loading...</h3>
                    ) : (
                      <h3 style={{ textAlign: "center" }}>No clients Found</h3>
                    )}
                  </React.Fragment>
                )}
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Modal show={showAdmin} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Row>
                  <Col>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      required
                      onChange={handleFormData}
                      name="userName"
                      value={formData.userName}
                      placeholder="User Name"
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>Admin Name</Form.Label>
                    <Form.Control
                      value={formData.adminName}
                      required
                      onChange={handleFormData}
                      name="adminName"
                      placeholder="Admin name"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      onChange={handleFormData}
                      placeholder="password"
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      name="confirmPassword"
                      onChange={handleFormData}
                      placeholder="confirm password"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      value={formData.adminContact}
                      required
                      maxLength={10}
                      //type="number"
                      name="adminContact"
                      onChange={handleFormData}
                      placeholder="Contact Number"
                    />
                  </Col>
                </Row>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ backgroundColor: "#636e72", border: "1px solid #636e72" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={submitFormAdmin}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>

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

export default AllBranches;
