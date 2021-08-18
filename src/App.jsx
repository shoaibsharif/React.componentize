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
import debug from "debug";
import Friends from "./pages/Friends";
debug.log = console.log.bind(console);
const _logger = debug.extend("App");

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://api.remotebootcamp.dev/api";

class App extends Component {
  state = {
    user: null,
  };
  componentDidMount() {
    _logger("Component did mount", this.state);
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
        <div className="flex min-h-screen flex-col">
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
            <Route path="/register" component={Register} />
            <Route
              path="/dashboard"
              render={() =>
                this.state.user ? (
                  <Dashboard user={this.state.user} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/friends"
              render={() =>
                this.state.user ? (
                  <Friends user={this.state.user} />
                ) : (
                  <Redirect to="/login" />
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
