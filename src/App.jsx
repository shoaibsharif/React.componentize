import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import axios from "axios";
import Home from "./pages/Home";
import One from "./pages/One";
import Two from "./pages/Two";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { toast } from "react-hot-toast";
import Friends from "./pages/Friends";
import { enableMapSet } from "immer";
import Jobs from "./pages/jobs/index";
import JobForm from "@/pages/jobs/form";
import TechCompany from "@/pages/techcompany/index";
import TechCompanyForm from "@/pages/techcompany/form";
import OverlayLoading from "./components/LoadingOverlay";
import UserService from "./lib/UserService";
import Events from "./pages/events";
import CreateEvent from "./pages/events/create";
enableMapSet();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://api.remotebootcamp.dev/api";

class App extends Component {
  state = {
    user: null,
    userLoading: true,
  };
  componentDidMount() {
    this.getCurrentUser();
  }
  getCurrentUser = () => {
    this.setState((prev) => ({ ...prev, userLoading: true }));
    UserService.getUser()
      .then((res) => {
        this.setState((prev) => ({
          ...prev,
          userLoading: false,
          user: res.data.item,
        }));
      })
      .catch(() => {
        this.setState((prevState) => ({
          ...prevState,
          user: null,
          userLoading: false,
        }));
      });
  };
  login = ({ email, password }) => {
    UserService.login({ email, password }).then(() => {
      toast("Successfully logged in 👍");
      this.getCurrentUser();
    });
  };
  logout = () => {
    UserService.logout().then(() => {
      toast("Successfully logged out");
    });
    this.getCurrentUser();
  };
  render() {
    return (
      <BrowserRouter>
        <OverlayLoading open={this.state.userLoading} />
        <div className="flex flex-col min-h-screen">
          <SiteNav user={this.state.user} logout={this.logout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/one" component={One} />
            <Route path="/two" component={Two} />
            <Route
              path="/login"
              render={(routeProps) => (
                <Login
                  login={this.login}
                  user={this.state.user}
                  {...routeProps}
                />
              )}
            />
            {/* Need to check whether the user is logged in or not. If logged in, then navigate to dashboard */}
            <Route
              path="/register"
              render={() =>
                !this.state.user ? (
                  <Register />
                ) : (
                  <Redirect to={{ pathname: "/dashboard" }} />
                )
              }
            />
            <Route
              path="/dashboard"
              render={({ location }) =>
                this.state.user ? (
                  <Dashboard user={this.state.user} />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: location } }}
                  />
                )
              }
            />
            <Route
              path="/friends"
              render={({ location }) =>
                this.state.user ? (
                  <Friends user={this.state.user} />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: location } }}
                  />
                )
              }
            />

            <Route
              path="/techcompanies"
              exact
              render={({ location }) =>
                this.state.user ? (
                  <TechCompany user={this.state.user} />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: location } }}
                  />
                )
              }
            />
            <Route
              path="/techcompanies/:id/edit"
              render={({ location }) =>
                this.state.user ? (
                  <TechCompanyForm user={this.state.user} />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: location } }}
                  />
                )
              }
            />

            <Route
              path="/events"
              exact
              render={({ location }) =>
                this.state.user ? (
                  <Events user={this.state.user} />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: location } }}
                  />
                )
              }
            />
            <Route
              path="/events/create"
              exact
              render={({ location }) =>
                this.state.user ? (
                  <CreateEvent user={this.state.user} />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: location } }}
                  />
                )
              }
            />
            <Route
              path="/jobs"
              exact
              render={({ location }) =>
                this.state.user ? (
                  <Jobs user={this.state.user} />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: location } }}
                  />
                )
              }
            />
            <Route
              path="/jobs/form"
              render={({ location }) =>
                this.state.user ? (
                  <JobForm user={this.state.user} />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: location } }}
                  />
                )
              }
            />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
