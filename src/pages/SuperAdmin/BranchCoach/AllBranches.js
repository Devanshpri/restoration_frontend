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
import PageTitle from "../../../components/PageTitle";
import AdminModal from "../../../components/AdminModal"

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
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminOptions, setAdminOptions] = useState([]);
  const [isClickOnDelete, setisClickOnDelete] = useState(false)
  const [coaches, setcoaches] = useState([])
  const [rowId, setrowId] = useState()
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  useEffect(() => {
    setLoading(true);
    (async () => {
      const admins = await Axios.get(
        `${process.env.REACT_APP_API_URL}/sAdmin/getAdmins`
      );

      let adminOptionsAll;
      if (admins)
        adminOptionsAll = admins?.data?.map((a) => {
          return { value: a._id, label: a.userName };
        });
      if (adminOptionsAll.length) {
        adminOptionsAll.unshift({ label: "Choose", value: "" });
        setAdminOptions(adminOptionsAll);
        setLoading(false);
      }
    })();
  }, [fetch]);

  useEffect(() => {

    (async () => {
      const allCoach = await Axios.get(`${process.env.REACT_APP_API_URL}/sAdmin/coaches`)
      setcoaches(allCoach.data)
      console.log(allCoach.data, "this is all coach")
      const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/sAdmin/branches`
      );
      // const result = await Axios.get(
      //   `http://localhost:8000/api/sAdmin/branches`
      // );
      console.log(result.data, "{{{{{{{{{{{}}}}}}}}}}}")

      // setRecords(result.data)
      // console.log(value,"********")
      result.data.map(async data => {
        // const value= await coaches.find(coach=>coach.full_name==data.name)
        // coaches.map(coach=>{if(coach.full_name==data.name){console.log("Matched")}else{console.log("not Matched")}})
        const getcoach = await Axios.get(`${process.env.REACT_APP_API_URL}/coach/findCoach/${data.name}`)
        // const getcoach=await Axios.get(`http://localhost:8000/api/coach/findCoach/${data.name}`)

        console.log(getcoach.data, "**********************")

        setRecords(prev => {
          return [...prev, { ...data, Coaches: getcoach?.data.coach }]
        })

      })
    })()

  }, [])
  console.log(records, "--------------------")
  const [show, setShow] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [formData, setFormData] = useState({});
  const [deleteModal, setdeleteModal] = useState(false);
  const [coachId, setcoachId] = useState()
  const handleClose = () => {
    setShow(false);
    setShowAdmin(false);
    setAllocateAdmin(false);
    setallocateCoach(false)
  };
  // console.log(deleteModal,"this is delete Modal")

  const handleDeleteModal = () => {

    setdeleteModal(false);
  };
  const deleteThis = async () => {
    if (localStorage.getItem("usertype") === "superadmin") {
      let res = await Axios.post(
        `${process.env.REACT_APP_API_URL}/sAdmin/deleteBranch/${rowId}`
      );
      if (res.data.massage === "done") {
        alert("Deleted Branch");
        window.location.reload(false);
        setFetch(!fetch);
      }
    } else {
      alert("You are Not Master Admin");
    }

  }
  const submitForm = async () => {
    const {
      latitude,
      longitude,
      address,
      district,
      state,
      adminName = "Click To Allocate",
      email,
      name,
      description,
      mobileNumber
    } = formData;
    if (
      !latitude ||
      !longitude ||
      !address ||
      !district ||
      !state ||
      !adminName ||
      !email ||
      !name ||
      !description ||
      !mobileNumber
    ) {
      alert("Fill all the Fields");
      return;
    }
    try {
      let data = await Axios.post(
        `${process.env.REACT_APP_API_URL}/sAdmin/newBranch`,
        // `http://localhost:8000/api/sAdmin/newBranch`,
        { ...formData }
      );
      console.log(data.data, "this is data from admin backend")
      if (data.data.massage === "done") {
        if (formData._id) {
          alert("Branch Updated");
        } else {
          alert("Branch Added");
          window.location.reload();
        }
        setFetch(!fetch);
        setShow(false);
      } else {
        alert("Validation Error");
      }
    } catch (err) {
      console.log(err);
      alert("Match Failed duplicate name Found ");
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
      { ...formData }
    );
    if (res.data.massage === "done") {
      alert("Admin Added successfully");
      setShowAdmin(false);
      window.location.reload();
    } else {
      alert("Validation error");
      return;
    }
  };
  // console.log(records,"THIS IS RECORDS.....")

  const handleShow = () => {
    setShow(true);
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteFormatter = function () {
    return <Button className="btn btn-success">Delete</Button>;
  };

  const editFormatter = function () {

    return <Button type="button" className="btn " style={{ backgroundColor: "#636e72", border: "1px solid #636e72" }}>Edit</Button>;
  };
  const [branchId, setBranchId] = useState("");

  let [allocateAdmin, setAllocateAdmin] = useState(false);

  let handleAdminAllocateShow = () => {
    setAllocateAdmin(true);
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
    //   text: "Branch ID",
    //   dataField: "_id",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap" };
    //   },
    //   sort: true,
    // },
    {
      text: "Name",
      dataField: "name",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
    },
    {
      text: "Address",
      dataField: "address",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
    },
    {
      text: "District",
      dataField: "district",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
    },
    {
      text: "State",
      dataField: "state",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
    },
    {
      text: "Admin",
      dataField: "adminName",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row) => {
          if (localStorage.getItem("usertype") === "superadmin") {
            setBranchId(row._id);
            handleAdminAllocateShow();
          }
        },
      },
    },
    // {
    //   text: "Admin id",
    //   dataField: "Admin Id",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap" };
    //   },
    //   sort: true,
    // },
    {
      text: "Contact",
      dataField: "adminContact",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
    },
    // {
    //   text: "Active Clients",
    //   dataField: "active_clients",
    //   sort: true,
    // },
    {
      text: "Coaches",
      dataField: "Coaches",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row) => {
          if (localStorage.getItem("usertype") === "superadmin") {
            setcoachId(row.name);

            setallocateCoach(true)
          }
        },
      },
    },
    {
      text: "Edit",
      dataField: "Edit",
      formatter: editFormatter,
      sort: true,
      events: {
        onClick: async (e, column, columnIndex, row) => {
          if (localStorage.getItem("usertype") === "superadmin") {
            let res = await Axios.get(
              `${process.env.REACT_APP_API_URL}/sAdmin/getBranch/${row._id}`
            );
            if (res.data) {
              setFormData(res.data);
              setShow(true);
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
          // setisClickOnDelete(true)
          // console.log(isClickOnDelete)
          setdeleteModal(true);
          setrowId(row._id)
          // if (localStorage.getItem("usertype") === "superadmin") {
          //   let res = await Axios.post(
          //     `${process.env.REACT_APP_API_URL}/sAdmin/deleteBranch/${row._id}`
          //   );
          //   if (res.data.massage === "done") {
          //     alert("Deleted Branch");
          //     setFetch(!fetch);
          //   }
          // } else {
          //   alert("You are Not Super Admin");
          // }
        },
      },
    },
  ];
  console.log(records)

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];
  const [adminId, setAdminId] = useState();
  const [adminName, setAdminName] = useState();
  const [allocateCoach, setallocateCoach] = useState(false)
  const [newAssignedCoach, setnewAssignedCoach] = useState("")
  // const [,set] = useState()
  const handleChange = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setAdminId(e.target.value);
    setAdminName(label);
  };
  const handleCoachChange = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    console.log(index, label)
    setnewAssignedCoach(label)
    // setAdminId(e.target.value);
    // setAdminName(label);
  };
  let submitAdmin = async () => {
    try {
      let res = await Axios.post(
        `${process.env.REACT_APP_API_URL}/sAdmin/allocateAdmin/${branchId}`,
        { adminName, adminId }
      );
      if (res.data.massage === "done") {
        alert("Admin Added");
        setAllocateAdmin(false);
        setFetch(!fetch);
        window.location.reload();
      } else {
        alert(res.data.massage);
      }
    } catch (err) {
      alert("Failed");
    }
  };


  const submitChangeCoach = async () => {
    try {
      console.log("ok")
      console.log(coachId, ">>>>>>")
      console.log(newAssignedCoach)
      const remote = await Axios.post(`${process.env.REACT_APP_API_URL}/sAdmin/changeCoach/${coachId}/${newAssignedCoach}`)
      // const remote=await Axios.post(`http://localhost:8000/api/sAdmin/changeCoach/${coachId}/${newAssignedCoach}`)

      if (remote.data.success) {
        // window.location.reload(true)
        window.location.reload();

      }
    } catch (e) { console.log(e) }



  }


  // console.log(records,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>-----------------")
  return (
    <React.Fragment>
      <Row className="page-title">
        <Col className="col-12">
          <PageTitle breadCrumbItems={[]} title={"All Branches"} />
        </Col>
        <Col className="text-right" style={{ marginTop: 10 }}>
          <button className="btn btn-success" onClick={handleShow}>
            Add New Branch
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
                      <h3 style={{ textAlign: "center" }}>No Branch Found</h3>
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
            <Modal.Title>Add New Branch</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Row>
                  <Col>
                    <Form.Label>Branch Name</Form.Label>
                    <Form.Control
                      value={formData.name}
                      required
                      onChange={handleFormData}
                      name="name"
                      placeholder="Name"
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>Email Id</Form.Label>
                    <Form.Control
                      required
                      name="email"
                      onChange={handleFormData}
                      value={formData.email}
                      placeholder="Email"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      value={formData.district}
                      required
                      name="district"
                      onChange={handleFormData}
                      placeholder="District"
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      value={formData.state}
                      required
                      name="state"
                      onChange={handleFormData}
                      placeholder="State"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      required
                      value={formData.latitude}
                      name="latitude"
                      type="number"
                      min="0"
                      onChange={handleFormData}
                      placeholder="latitude"
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      required
                      value={formData.longitude}
                      name="longitude"
                      type="number"
                      min="0"
                      onChange={handleFormData}
                      placeholder="Longitude"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Addreess</Form.Label>
                    <Form.Control
                      value={formData.address}
                      required
                      onChange={handleFormData}
                      name="address"
                      placeholder="Addreess"
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      value={formData.description}
                      required
                      onChange={handleFormData}
                      type="textArea"
                      name="description"
                      placeholder="Description"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      value={formData.mobileNumber}
                      required
                      type="number"
                      onChange={handleFormData}
                      name="mobileNumber"
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
            <Button variant="success" onClick={submitForm}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showAdmin} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Row>
                  <Col>
                    <Form.Label>Admin Name</Form.Label>
                    <Form.Control
                      required
                      onChange={handleFormData}
                      name="userName"
                      placeholder="User Name"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Admin Id</Form.Label>
                    <Form.Control
                      required
                      onChange={handleFormData}
                      name="adminName"
                      placeholder="ID"
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
                  <Col>
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
                      required
                      type="number"
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

        <Modal show={allocateAdmin} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Allocate Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Select admin</label>
            {adminOptions.length ? (
              <select onChange={handleChange}>
                {adminOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
              <div>No Admins Availabel</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ backgroundColor: "#636e72", border: "1px solid #636e72" }} onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={submitAdmin}>
              Allocate Admin
            </Button>
          </Modal.Footer>
        </Modal>

      </Row>


      <Modal show={allocateCoach} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Allocate Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Select Coach</label>
          {coaches.length ? (
            <select onChange={handleCoachChange}>
              {coaches.map((option) => (
                <option value={option.value}>{option.userName}</option>
              ))}
            </select>
          ) : (
            <div>No Admins Availabel</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#636e72", border: "1px solid #636e72" }} onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={submitChangeCoach}>
            Allocate Coach
          </Button>
        </Modal.Footer>
      </Modal>


      {(() => {


        return (<Modal show={deleteModal} onHide={handleDeleteModal}>
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
        /> */
            }
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
        </Modal>)
      }
      )()}
    </React.Fragment>


  );
};

export default AllBranches;
