import React, { useState, useEffect } from "react";

import useFetchOrders from "../../../hooks/useFetchOrders";

import { Row, Col, Card, CardBody, Input } from "reactstrap";

import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import PageTitle from "../../../components/PageTitle";
import { values } from "lodash";

const AllOrders = () => {
  const [
    isFetchingOrders,
    orders,
    errorFetchingOrder,
    fetchOrder,
  ] = useFetchOrders();

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  useEffect(() => {
    fetchOrder();
  }, []);
  console.log(fetchOrder, "<<<<<<<<<<")
  const columns = [
    {
      text: "Currency",
      dataField: "currency",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "95px" };
      },
      sort: true,
    },
    {
      text: "Payment Id",
      dataField: "razorpay_payment_id",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "180px" };
      },
      sort: true,
    },
    {
      text: "Razorpay Order Id",
      dataField: "razorpay_order_id",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "220px" };
      },
      sort: true,
    },
    {
      text: "User Id",
      dataField: "userId",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "220px" };
      },
      sort: true,
    },
    {
      text: "Client Name",
      dataField: "name",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "200px" };
      },
      sort: true,
    },
    {
      text: "Phone No",
      dataField: "phoneNumber",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "180px" };
      },
      sort: true,
    },
    // {
    //   text: "Date",
    //   dataField: "date",
    //   headerStyle: (colum, colIndex) => {
    //     return { whiteSpace: "nowrap", width: "80px" };
    //   },
    //   sort: true,
    // },
    {
      text: "Amount",
      dataField: "amount",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "90px" };
      },
      sort: true,
    },
    {
      text: "Order Id",
      dataField: "order_id",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "220px" };
      },
      sort: true,
    },
    {
      text: "Updated At",
      dataField: "updatedAt",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "200px" };
      },
      formatter: (value) => (
        <span>{moment(value).format("DD MMM YYYY HH:mm A")}</span>
      ),
      sort: true,
    },
    {
      text: "Created At",
      dataField: "createdAt",
      headerStyle: (colum, colIndex) => {
        return { whiteSpace: "nowrap", width: "200px" };
      },
      formatter: (value) => (
        <span>{moment(value).format("DD MMM YYYY HH:mm A")}</span>
      ),
      sort: true,
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

  const defaultSorted = [
    {
      dataField: "createdAt",
      order: "desc",
    },
  ];

  return (
    <React.Fragment>
      <Row className="page-title">
        <Col className="col-12">
          <PageTitle breadCrumbItems={[]} title={"All Orders"} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                bootstrap4
                keyField="order_id"
                data={orders}
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

                    {orders.length ? (
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
                          ],
                        })}
                        wrapperClasses="table-responsive"
                      />
                    ) : (
                      <h3 style={{ textAlign: "center" }}>{`${isFetchingOrders ? "Loading Order..." : "No Order Found"
                        }`}</h3>
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

export default AllOrders;
