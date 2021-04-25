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
import Chips from "./Chips";

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
  const [fetch, setFetch] = useState(false);
  const { SearchBar } = Search;
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [formData, setFormData] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { ExportCSVButton } = CSVExport;
  const [deleteModal, setdeleteModal] = useState(false);
  const [rowId, setrowId] = useState();
  const [isClickOnDelete, setisClickOnDelete] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/questions`
      );
      const categoryFromDB = await Axios.get(
        `${process.env.REACT_APP_API_URL}/categories`
      );
      if (result) {
        setRecords(result.data);
        records.forEach((record, i) => {
          let optionString = record.options.toString();

          return (records[i]["optionString"] = optionString);
        });
        // records.forEach((record, i) => {
        //   record.option1 = record.options[0];
        //   record.option2 = record.options[1];
        //   record.option3 = record.options[2];
        //   record.option4 = record.options[3];
        // });
      }
      let categoryAll;
      if (categoryFromDB.data) {
        setCategory(categoryFromDB.data.map((a) => a.title));
        categoryAll = categoryFromDB?.data?.map((a) => {
          return { value: a._id, label: a.title };
        });
        if (categoryAll.length) {
          categoryAll.unshift({ label: "Choose", value: "" });
          setCategoryOptions(categoryAll);
          setLoading(false);
        }
      }
    })();
  }, []);
  records.forEach((record, i) => {
    record.option1 = record.options[0];
    record.option2 = record.options[1];
    record.option3 = record.options[2];
    record.option4 = record.options[3];
    record.option5 = record.options[4];
    record.option6 = record.options[5];
    record.option7 = record.options[6];
  });
  // console.log(records);

  const deleteThis = async () => {
    console.log("time to delete this", rowId);
    setisClickOnDelete(true);
    console.log(isClickOnDelete);
    if (localStorage.getItem("usertype") === "superadmin") {
      let res = await Axios.delete(
        `${process.env.REACT_APP_API_URL}/delete/question/${rowId}`
      );
      if (res.status === 200) {
        alert("Deleted Question");
        setFetch(!fetch);
        window.location.reload();
      }
    } else {
      alert("You are Not Master Admin");
    }
  };
  const handleDeleteModal = () => {
    console.log("handle");

    setdeleteModal(false);
  };
  const handleClose = () => {
    setShow(false);
    setShowUpdate(false);
    window.location.reload();
  };

  const submitForm = async () => {
    // console.log(formData);
    if (formData) {
      formData.options = [];

      formData.options.push(formData.option1);
      formData.options.push(formData.option2);
      formData.options.push(formData.option3);
      formData.options.push(formData.option4);
      formData.options.push(formData.option5);
      formData.options.push(formData.option6);
      formData.options.push(formData.option7);
      // console.log(formData.options);
    }
    let {
      question,
      category_id,
      sequence_no,
      is_multiple_answers,
      sub_question,
      sub_question_placeholder,
    } = formData;
    if (
      !category_id ||
      !sequence_no ||
      !question ||
      !sub_question ||
      !sub_question_placeholder
    ) {
      alert("Fill all fields");
      return;
    }
    formData.is_multiple_answers = formData.is_multiple_answers === "true";
    let res = await Axios.post(
      `${process.env.REACT_APP_API_URL}/categories/${category_id}/question`,
      {
        ...formData,
      }
    );

    // console.log(res);

    if (res.status === 200) {
      if (formData._id) {
        alert("Question Updated");
      } else {
        alert("Question Added successfully");
        setShow(false);
        setFetch(!fetch);
        window.location.reload();

        return;
      }
    } else {
      alert("Validation error");
      return;
    }
  };

  const submitUpdateForm = async () => {
    // console.log(formData);
    if (formData) {
      formData.options = [];

      formData.options.push(formData.option1);
      formData.options.push(formData.option2);
      formData.options.push(formData.option3);
      formData.options.push(formData.option4);
      formData.options.push(formData.option5);
      formData.options.push(formData.option6);
      formData.options.push(formData.option7);
    }
    let {
      question,
      category_id,
      sequence_no,
      is_multiple_answers,
      sub_question,
      sub_question_placeholder,
    } = formData;
    if (
      !category_id ||
      !sequence_no ||
      !question ||
      !sub_question ||
      !!sub_question_placeholder
    ) {
      alert("Fill all fields");
      return;
    }
    // console.log(formData);

    formData.is_multiple_answers = formData.is_multiple_answers === "true";
    let res = await Axios.post(
      `${process.env.REACT_APP_API_URL}/categories/${category_id}/question/${formData._id}`,
      {
        ...formData,
      }
    );

    // console.log(res);

    if (res.status === 200) {
      if (formData._id) {
        alert("Question Updated");
        setShowUpdate(false);
        setFetch(!fetch);
        setFormData({});
        window.location.reload();
      } else {
        alert("Question Added successfully");
        setShow(false);
        setFetch(!fetch);
        return;
      }
    } else {
      alert("Validation error");
      return;
    }
  };

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
      text: "S. No.",
      dataField: "sequence_no",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "60px" };
      },
      sort: true,
    },
    {
      text: "Question",
      dataField: "question",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "180px" };
      },
      sort: true,
    },

    {
      text: "Option 1",
      dataField: "options[0]",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "90px" };
      },
    },
    {
      text: "Option 2",
      dataField: "options[1]",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "90px" };
      },
    },
    {
      text: "Option 3",
      dataField: "options[2]",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "90px" };
      },
    },
    {
      text: "Option 4",
      dataField: "options[3]",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "90px" };
      },
    },
    {
      text: "Option 5",
      dataField: "options[4]",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "90px" };
      },
    },
    {
      text: "Option 6",
      dataField: "options[5]",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "90px" };
      },
    },
    {
      text: "Option 7",
      dataField: "options[6]",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "90px" };
      },
    },
    {
      text: "Sub Question",
      dataField: "sub_question",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "250px" };
      },
      sort: true,
    },
    {
      text: "Edit",
      dataField: "Edit",
      formatter: editFormatter,
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "80px" };
      },
      events: {
        onClick: (e, column, columnIndex, row) => {
          setFormData(row);

          setShowUpdate(true);
        },
      },
    },
    {
      text: "Delete",
      dataField: "Delete",
      formatter: deleteFormatter,
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "80px" };
      },
      events: {
        onClick: async (e, column, columnIndex, row) => {
          setdeleteModal(true);
          setrowId(row._id);
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

  return (
    <React.Fragment>
      <Row className="page-title">
        <Col className="col-12">
          <PageTitle breadCrumbItems={[]} title={"All category of questions"} />
        </Col>
      </Row>
      <Row>
        <div style={{ padding: "0px 20px 20px 20px" }}>
          <Chips chips={category} placeholder="Add new category..." />
        </div>
        <Col className="text-right" style={{ marginTop: 10 }}>
          <button className="btn btn-success" onClick={handleShow}>
            Add New Questions
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
                // style={{overflow: "scroll"}}
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
                    <div className="allQuestions">
                      {records.length ? (
                        <BootstrapTable
                          {...props.baseProps}
                          rowClasses="allQuestions"
                          bordered={false}
                          width="150"
                          style={{ overflow: "scroll" }}
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
                        <h3 style={{ textAlign: "center" }}>
                          No Questions Found
                        </h3>
                      )}
                    </div>
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
            <Modal.Title>Add New Questions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form.Row>
                <Row>
                  <Col>
                    <Form.Label>Sequence Number</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      onChange={handleFormData}
                      name="sequence_no"
                      value={formData.sequence_no}
                      placeholder="Sequence no."
                    />
                  </Col>
                  <Col style={{ marginLeft: "60px" }}>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      required
                      onChange={handleFormData}
                      name="question"
                      value={formData.question}
                      placeholder="Name of Question"
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: "10px" }}>
                  <Col>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      value={formData.category_id}
                      required
                      onChange={handleFormData}
                      as="select"
                      name="category_id"
                      // style={{width: "185px"}}
                    >
                      {categoryOptions.map((c) => {
                        return <option value={c.value}>{c.label}</option>;
                      })}
                    </Form.Control>
                  </Col>
                  <Col style={{ marginLeft: "122px" }}>
                    <Form.Label style={{ width: "135px" }}>
                      Is Multiple Answers
                    </Form.Label>
                    <Form.Control
                      value={formData.is_multiple_answers}
                      required
                      onChange={handleFormData}
                      as="select"
                      name="is_multiple_answers"
                      type="boolean"
                      // style={{width: "185px"}}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row style={{ marginTop: "10px" }}>
                  <Col>
                    <Form.Label>Sub Question</Form.Label>
                    <Form.Control
                      value={formData.sub_question}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="sub_question"
                    />
                  </Col>
                  <Col style={{ marginLeft: "65px" }}>
                    <Form.Label>Sub Question Placeholder</Form.Label>
                    <Form.Control
                      value={formData.sub_question_placeholder}
                      required
                      onChange={handleFormData}
                      type="text"
                      // placeholder="Sub Question Placehold"
                      name="sub_question_placeholder"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Option 1</Form.Label>

                    <Form.Control
                      value={formData.option1}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option1"
                    />
                  </Col>

                  <Col style={{ marginLeft: "65px" }}>
                    <Form.Label>Option 2</Form.Label>
                    <Form.Control
                      value={formData.option2}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option2"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Option 3</Form.Label>
                    <Form.Control
                      value={formData.option3}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option3"
                    />
                  </Col>
                  <Col style={{ marginLeft: "65px" }}>
                    <Form.Label>Option 4</Form.Label>
                    <Form.Control
                      value={formData.option4}
                      required
                      type="text"
                      onChange={handleFormData}
                      name="option4"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Option 5</Form.Label>
                    <Form.Control
                      value={formData.option5}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option5"
                    />
                  </Col>
                  <Col style={{ marginLeft: "65px" }}>
                    <Form.Label>Option 6</Form.Label>
                    <Form.Control
                      value={formData.option6}
                      required
                      type="text"
                      onChange={handleFormData}
                      name="option6"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Option 7</Form.Label>
                    <Form.Control
                      value={formData.option7}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option7"
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
        <Modal show={showUpdate} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Row>
                  <Col>
                    <Form.Label>Sequence Number</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      onChange={handleFormData}
                      name="sequence_no"
                      value={formData.sequence_no}
                      placeholder="Sequence no."
                    />
                  </Col>
                  <Col style={{ marginLeft: "50px" }}>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      required
                      onChange={handleFormData}
                      name="question"
                      value={formData.question}
                      placeholder="Name of Question"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      value={formData.category_id}
                      required
                      onChange={handleFormData}
                      as="select"
                      name="category_id"
                    >
                      {categoryOptions.map((c) => {
                        return <option value={c.value}>{c.label}</option>;
                      })}
                    </Form.Control>
                  </Col>
                  <Col style={{ marginLeft: "90px" }}>
                    <Form.Label>Sub Question</Form.Label>
                    <Form.Control
                      value={formData.sub_question}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="sub_question"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Is Multiple Answers</Form.Label>
                    <Form.Control
                      value={formData.is_multiple_answers}
                      required
                      onChange={handleFormData}
                      as="select"
                      name="is_multiple_answers"
                      type="boolean"
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Form.Control>
                  </Col>
                  <Col style={{ marginLeft: "122px" }}>
                    <Form.Label >
                      Sub Question Placeholder
                    </Form.Label>
                    <Form.Control
                      value={formData.sub_question_placeholder}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="sub_question_placeholder"
                      style={{ width: "190px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Option 1</Form.Label>

                    <Form.Control
                      value={formData.option1}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option1"
                    />
                  </Col>

                  <Col style={{marginLeft: "54px"}}>
                    <Form.Label>Option 2</Form.Label>
                    <Form.Control
                      value={formData.option2}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option2"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Option 3</Form.Label>
                    <Form.Control
                      value={formData.option3}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option3"
                    />
                  </Col>
                  <Col  style={{marginLeft: "54px"}}>
                    <Form.Label>Option 4</Form.Label>
                    <Form.Control
                      value={formData.option4}
                      required
                      type="text"
                      onChange={handleFormData}
                      name="option4"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Option 5</Form.Label>
                    <Form.Control
                      value={formData.option5}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option5"
                    />
                  </Col>
                  <Col  style={{marginLeft: "54px"}}>
                    <Form.Label>Option 6</Form.Label>
                    <Form.Control
                      value={formData.option6}
                      required
                      type="text"
                      onChange={handleFormData}
                      name="option6"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Option 7</Form.Label>
                    <Form.Control
                      value={formData.option7}
                      required
                      onChange={handleFormData}
                      type="text"
                      name="option7"
                    />
                  </Col>
                </Row>
                {/*<Row>
											<Col >
											  <Form.Label>Options</Form.Label>
												<button style={{border:'none' ,margin:'10px'}} title='Add Option'>
												<Plus size={30} />
												</button>
																				  
										  </Col>
										</Row> */}
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
            <Button variant="success" onClick={submitUpdateForm}>
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
              <Button
                style={{
                  backgroundColor: "#636e72",
                  border: "1px solid #636e72",
                }}
                onClick={handleDeleteModal}
              >
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
