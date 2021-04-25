import React, { Component } from "react";
import {
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import { ChevronDown, Mail, Printer, File } from "react-feather";

import Loader from "../../components/Loader";

import SuperAdminStats from "./Statistics";
import CoachStats from "./CoachStats";
import BranchStats from "./BranchStats";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

    this.state = {
      filterDate: [oneWeekAgo, new Date()],
    };
  }

  render() {
    let user = localStorage.getItem("usertype");
    return (
      <React.Fragment>
        <div className="">
          {/* preloader */}
          {this.props.loading && <Loader />}

          <Row className="page-title align-items-center">
            <Col sm={4} xl={6}>
              <h4 className="-1 mt-0">Dashboard</h4>
            </Col>
          </Row>

          {/* stats */}
          {user === "superadmin" && <SuperAdminStats></SuperAdminStats>}
          {user === "branchadmin" && <BranchStats></BranchStats>}
          {user === "coach" && <CoachStats></CoachStats>}
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
