import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Row, Col, Card, CardBody, Input } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import FileUploader from "./FileUploader";
import { Button } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

import "./CustomComponent.css";

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

const Prescription = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      console.log(localStorage.getItem("currUserId"));
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/document/${localStorage.getItem(
          "currUserId"
        )}`
      );
      if (result) {
        console.log(result.data.response);
        setRecords(result.data.response);
        setLoading(false);
      }
    })();
  }, []);

  const linkFormatter = function (data) {
    console.log(data);
    return <button className="btn btn-primary">View Prescription</button>;
  };

  const columns = [
    {
      text: "Prescription Name",
      dataField: "fileMeta[0].key",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
    },
    {
      text: "Notes",
      dataField: "notes",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
    },
    {
      text: "Created at",
      dataField: "createdAt",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      sort: true,
    },
    {
      text: "View",
      dataField: "fileMeta[0].location",
      formatter: linkFormatter,
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap" };
      },
      events: {
        onClick: (e, column, columnIndex, row) => {
          console.log(row);
          window.open(row.fileMeta[0].location, "_blank");
        },
      },
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

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [currentUploadedFile, setCurrentUploadedFile] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [notesValue, setNotesValue] = useState("");

  const onFileSelected = (files) => {
    setCurrentUploadedFile([...files.slice()]);
  };

  const onNotesValueChanged = (e) => {
    setNotesValue(e.target.value);
  };

  const onFileSubmit = () => {
    const formData = new FormData();
    formData.append("notes", notesValue);
    formData.append("type", "prescription");
    currentUploadedFile.map((item) => {
      formData.append("image", item);
    });
    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/upload/${localStorage.getItem(
        "currUserId"
      )}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setLoading(false);

        if (response.data.success) {
          setNotesValue("");
          setCurrentUploadedFile([]);
          alert("Prescription Uploaded");
        }
      })
      .catch(function (response) {
        //handle error
        setLoading(false);
        alert(response.data.e.message);
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                bootstrap4
                keyField="_id"
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
                      <h3 style={{ textAlign: "center" }}>
                        No prescription history Found
                      </h3>
                    )}
                  </React.Fragment>
                )}
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <LoadingOverlay active={isLoading} spinner text="Uploading Prescription">
        <div>
          <FileUploader
            selectedFiles={currentUploadedFile}
            onFileChange={onFileSelected}
          />
          <div className="notesContainer">
            <Form>
              <Form.Row>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Please Enter the notes here"
                  onChange={onNotesValueChanged}
                  value={notesValue}
                />
              </Form.Row>
            </Form>
          </div>
          <div className="prescriptionContainer">
            <Button variant="success" onClick={onFileSubmit} className="mr-2">
              Submit
            </Button>
          </div>
        </div>
      </LoadingOverlay>
    </React.Fragment>
  );
};

export default Prescription;
