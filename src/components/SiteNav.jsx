import React from "react";
import { Link, withRouter } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="p-3 text-white bg-indigo-700">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center lg:justify-start">
          <Link to="/" className="flex items-center mb-2 text-white lg:mb-0 ">
            <img
              src="https://pw.sabio.la/images/Sabio.png"
              width="30"
              height="30"
              className="inline-block align-top"
              alt="Sabio"
            />
          </Link>

          <ul className="flex justify-center flex-grow mb-2 md:justify-start md:mb-0">
            <li>
              <Link
                to="/"
                className="px-2 text-white nav-link hover:text-opacity-90 link-button"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/friends"
                className="px-2 text-white nav-link link-button"
              >
                Friends
              </Link>
            </li>
            <li>
              <Link to="/two" className="px-2 text-white nav-link link-button">
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/techcompanies"
                className="px-2 text-white nav-link link-button"
              >
                Tech Co.
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="px-2 text-white nav-link link-button">
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="px-2 text-white nav-link link-button"
              >
                Events
              </Link>
            </li>
          </ul>

          {props.user ? (
            <div className="text-end">
              <button
                type="button"
                className="px-3 py-2 mr-2 text-yellow-900 bg-yellow-200 rounded"
                onClick={() => props.history.push("/dashboard")}
              >
                Dashboard
              </button>
              <button
                type="button"
                className="px-3 py-2 text-red-900 bg-red-200 rounded"
                onClick={props.logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="text-end">
              <button
                type="button"
                className="mr-2 hover:underline hover:opacity-80"
                onClick={() => props.history.push("login")}
              >
                Login
              </button>
              <button
                type="button"
                className="hover:underline hover:opacity-80"
                onClick={() => props.history.push("register")}
              >
                Sign-up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
