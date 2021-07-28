import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import axios from "axios";

const Home = lazy(() => import("./components/Home"));
const One = lazy(() => import("./components/One"));
const Two = lazy(() => import("./components/Two"));

axios.defaults.withCredentials = true;

// const routes = [
//   {
//     path: "/",
//     component: Home,
//   },
//   {
//     path: "/one",
//     component: One,
//   },
//   {
//     path: "/two",
//     component: Two,
//   },
// ];
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SiteNav />
        <Suspense fallback="loading">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/one" component={One} />
            <Route path="/two" />
          </Switch>
        </Suspense>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
