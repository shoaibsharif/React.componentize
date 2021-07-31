import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import axios from "axios";
import Home from "./pages/Home";
import One from "./pages/One";
import Two from "./pages/Two";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://api.remotebootcamp.dev/api";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <SiteNav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/one" component={One} />
          <Route path="/two" component={Two} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/dashboard">
            <Dashboard />
          </ProtectedRoute>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
