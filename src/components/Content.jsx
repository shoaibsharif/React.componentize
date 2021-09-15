import React from "react";
import { NavLink } from "react-router-dom";

const Content = () => {
  return (
    <div className="max-w-5xl mx-auto mt-5 prose">
      <h1>Hi</h1>
      <p>
        Welcome to My simple project. In this project, I have been learning how
        to fetch and manage data from an API.{" "}
      </p>
      <p>To navigate this project to I have done so far or WIP:</p>
      <ul>
        {/* <li>
          <NavLink to="/login">Login </NavLink> - to see your dashboard 
        </li> */}
        <li>
          <NavLink to="/friends">Friends</NavLink> - This is where you can
          create contacts of your friends (
          <span className="text-red-500"> Needs to be authenticated </span>)
        </li>
        <li>
          <NavLink to="/jobs">Jobs</NavLink> - Create or Manage Jobs
        </li>
      </ul>
    </div>
  );
};

export default Content;
