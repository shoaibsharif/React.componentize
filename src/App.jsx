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
enableMapSet();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://api.remotebootcamp.dev/api";

class App extends Component {
  state = {
    user: null,
  };
  componentDidMount() {
    this.getCurrentUser();
  }
  getCurrentUser = () => {
    axios
      .get("/users/current")
      .then((res) => {
        this.setState(() => ({ ...this.state, user: res.data.item }));
      })
      .catch((e) => {
        this.setState((prevState) => ({ ...prevState, user: null }));
      });
  };
  login = async ({ email, password }) => {
    await axios.post("/users/login", {
      email,
      password,
      tenantId: "U023C6VN34L",
    });
    toast("Successfully logged in 👍");
    this.getCurrentUser();
  };
  logout = async () => {
    try {
      await axios.get("/users/logout");
      toast("Successfully logged out");
    } catch (error) {
      console.log(error);
    }
    this.getCurrentUser();
  };
  render() {
    return (
      <BrowserRouter>
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
            <Route path="/register" component={Register} />
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
