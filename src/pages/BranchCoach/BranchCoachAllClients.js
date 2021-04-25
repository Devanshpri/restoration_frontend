import React, { useState, useEffect } from "react";
import axios from "axios";

import { Row, Col, Card, CardBody, Input } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import PageTitle from "../../components/PageTitle";

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

const BranchCoachAllClients = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const linkFormatter = function () {
    return <a href="/branchcoach/clientdetails" >More</a>;
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
    //     return { whiteSpace: "nowrap", width: "225px" };
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
        return { whiteSpace: "nowrap", width: "80px" };
      },
      sort: true,
    },
    {
      text: "Gender",
      dataField: "gender",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "80px" };
      },
      sort: true,
    },
    {
      text: "Status",
      dataField: "status",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "80px" };
      },
      sort: true,
    },
    {
      text: "Disease",
      dataField: "disease",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "150px" };
      },
      sort: true,
    },
    {
      text: "Contact",
      dataField: "phone_number",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "150px" };
      },
      sort: true,
    },
    {
      text: "Email",
      dataField: "email",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "230px" };
      },
      sort: true,
    },
    {
      text: "City",
      dataField: "city",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "150px" };
      },
      sort: true,
    },
    {
      text: "Branch Name",
      dataField: "branchName",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "150px" };
      },
      sort: true,
    },
    // {
    //   text: "Coach Name",
    //   dataField: "branchName",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap", width: "130px" };
    //   },
    //   sort: true,
    // },
    {
      text: "Mode",
      dataField: "mode",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "80px" };
      },
      sort: true,
    },
    {
      text: "View",
      dataField: "viewLink",
      formatter: linkFormatter,
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "80px" };
      },
      events: {
        onClick: (e, column, columnIndex, row) => {
          console.log(row, "this is row>>>>>>>>>>");
          if (
            localStorage.getItem("usertype") === "coach" &&
            Boolean(localStorage.getItem("token"))
          ) {
            // Saving the current day of user in the local storage
            let date1 = new Date(row.joiningDate);
            let date2 = new Date();
            let Difference_In_Time = date2.getTime() - date1.getTime();
            let Difference_In_Days = Math.ceil(
              Difference_In_Time / (1000 * 3600 * 24)
            );
            console.log("difference in days>>>>>>>>>>>", Difference_In_Days)

            localStorage.setItem("currUserDate", Difference_In_Days);
            localStorage.setItem("currUserId", row._id);
          }
        },
      },
      sort: true,
    },
  ];

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  useEffect(() => {
    setLoading(true);
    (async () => {
      console.log(localStorage.getItem("id"), "<<<<<<<<<<<<<<<<<<<  THIS IS GETiTEM ID LOCAL STORAGE")
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL
        }/coach/myClients/${localStorage.getItem("id")}`
      );
      if (result.data) {
        console.log(result.data[1])
        setRecords(result.data);
        console.log(result.data)

        setLoading(false);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <Row className="page-title">
        <Col className="col-12">
          <PageTitle breadCrumbItems={[]} title={"All Clients"} />
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
                      <h3 style={{ textAlign: "center" }}>No clients Found</h3>
                    )}
                  </React.Fragment>
                )}
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BranchCoachAllClients;
