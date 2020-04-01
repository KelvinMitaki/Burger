import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  controlSideDrawer = () => {
    const changeShow = !this.state.showSideDrawer;
    this.setState({ showSideDrawer: changeShow });
  };
  controlMenuClick = () => {
    const test = !this.state.showSideDrawer;
    this.setState({ showSideDrawer: test });
  };
  render() {
    return (
      <Aux>
        <SideDrawer
          hide={this.controlSideDrawer}
          show={this.state.showSideDrawer}
        />
        <Toolbar controlMenuClick={this.controlMenuClick} />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
