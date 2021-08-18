import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  componentDidUpdate() {
    if (!this.props.user) this.props.history.replace("/login");
  }
  render() {
    return <div className="container">Hi {this.props.user.name} </div>;
  }
}

export default withRouter(Dashboard);
