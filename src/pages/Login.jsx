import React, { Component } from "react";
import ApplicationErrors from "../components/ApplicationErrors";

class Login extends Component {
  state = {
    email: "shoaib19j@gmail.com",
    password: "Sabiopassword1!",
    errors: [],
  };

  componentDidMount() {
    if (this.props.user)
      this.props.history.replace(
        this.props.location?.state?.from || "/dashboard"
      );
  }
  componentDidUpdate() {
    if (this.props.user)
      this.props.history.replace(
        this.props.location?.state?.from || "/dashboard"
      );
  }
  onChangeInput = (e) =>
    this.setState(() => ({ ...this.state, [e.target.name]: e.target.value }));

  submitForm = async (e) => {
    e.preventDefault();
    try {
      await this.props.login({
        email: this.state.email,
        password: this.state.password,
      });
    } catch (error) {
      this.setState({ ...this.state, errors: ["Invalid credentials"] });
    }
  };
  render() {
    return (
      <div className="flex flex-col justify-center flex-grow w-full max-w-sm mx-auto ">
        {this.state.errors && <ApplicationErrors errors={this.state.errors} />}
        <form onSubmit={this.submitForm} method="post">
          <div className="flex flex-col mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChangeInput}
              className="transition border border-gray-400 rounded focus:ring focus:ring-purple-500 focus:ring-opacity-70 focus:outline-none"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="text-sm text-gray-400">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChangeInput}
              className="transition border border-gray-400 rounded focus:ring focus:ring-purple-500 focus:ring-opacity-70 focus:outline-none"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="primary-button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
