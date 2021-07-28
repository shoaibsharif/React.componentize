import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  async login() {
    var payload = {
      email: "shoaib19j@gmail.com",
      password: "Sabiopassword1!",
      tenantId: "U023C6VN34L",
    };
    const result = await axios.post(
      "https://api.remotebootcamp.dev/api/users/login",
      payload,
      {
        crossDomain: true,
      }
    );

    console.log(result.data);
  }
  componentDidMount() {
    this.login();
  }
  render() {
    return (
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img
                src="https://pw.sabio.la/images/Sabio.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Sabio"
              />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link
                  to="/"
                  className="nav-link px-2 text-secondary link-button"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/one"
                  className="nav-link px-2 text-white link-button"
                >
                  page-1
                </Link>
              </li>
              <li>
                <Link
                  to="/two"
                  className="nav-link px-2 text-white link-button"
                >
                  page-2
                </Link>
              </li>
              <li>
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  About
                </button>
              </li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control form-control-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="text-end">
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={this.login}
              >
                Login
              </button>
              <button type="button" className="btn btn-warning">
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
