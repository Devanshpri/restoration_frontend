import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { isMobileOnly } from "react-device-detect";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

import AppMenu from "./AppMenu";
import profilePic from "../assets/images/users/avatar-7.jpg";

/**
 * User Widget
 */
const UserProfile = () => {

  const usernameLoggedIn = localStorage.getItem('usernamelogin')
  const userposLoggedIn = localStorage.getItem('usertype')

  const usernameFunction = () => {
    if(userposLoggedIn == "superadmin") {
      return "masteradmin"
    } else {
      return userposLoggedIn
    }
  }

  const usernameLoggedFunction = () => {
    if(usernameLoggedIn == "") {
      return "."
    } else {
      return usernameLoggedIn
    }
  }

  return (
    <React.Fragment>
      <div className="media user-profile mt-2 mb-2">
        <img
          src={"https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"}
          className="avatar-sm rounded-circle mr-2"
          alt="Shreyu"
        />
        <img
          src={"https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"}
          className="avatar-xs rounded-circle mr-2"
          alt="Shreyu"
        />

        <div className="media-body">
          <h6 className="pro-user-name mt-0 mb-0">{usernameLoggedFunction()}</h6>
          <span className="pro-user-desc">{usernameFunction()}</span>
        </div>

        <UncontrolledDropdown className="align-self-center profile-dropdown-menu">
          <DropdownToggle
            data-toggle="dropdown"
            tag="button"
            className="btn btn-link p-0 dropdown-toggle mr-0"
          >
            <FeatherIcon.ChevronDown />
          </DropdownToggle>
          <DropdownMenu
            right
            className="topbar-dropdown-menu profile-dropdown-items"
          >
            <Link to="/" className="dropdown-item notify-item">
              <FeatherIcon.User className="icon-dual icon-xs mr-2" />
              <span>My Account</span>
            </Link>

            <DropdownItem divider />
            <Link to="/account/logout" className="dropdown-item notify-item">
              <FeatherIcon.LogOut className="icon-dual icon-xs mr-2" />
              <span>Logout</span>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </React.Fragment>
  );
};

/**
 * Sidenav
 */
const SideNav = () => {
  return (
    <div className="sidebar-content">
      <div id="sidebar-menu">
        <AppMenu />
      </div>
    </div>
  );
};

class LeftSidebar extends Component {
  menuNodeRef;

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleOtherClick = this.handleOtherClick.bind(this);
  }

  /**
   * Bind event
   */
  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   * Bind event
   */
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   * Handle the click anywhere in doc
   */
  handleOtherClick = (e) => {
    if (this.menuNodeRef.contains(e.target)) return;
    // else hide the menubar
    if (document.body && isMobileOnly) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  /**
   * Handle click
   * @param {*} e
   * @param {*} item
   */
  handleClick(e) {
    console.log(e);
  }

  render() {
    const isCondensed = this.props.isCondensed || false;

    return (
      <React.Fragment>
        <div
          className="left-side-menu"
          ref={(node) => (this.menuNodeRef = node)}
        >
          <UserProfile />
          {!isCondensed && (
            <PerfectScrollbar>
              <SideNav />
            </PerfectScrollbar>
          )}
          {isCondensed && <SideNav />}
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(LeftSidebar);
