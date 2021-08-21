import axios from "axios";
import { Component } from "react";
import toast from "react-hot-toast";
import ApplicationErrors from "../components/ApplicationErrors";

class Register extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    errors: [],
  };
  // componentDidMount() {
  //   if (this.props.user) this.props.history.replace("/dashboard");
  // }
  changeForm = (e, key) =>
    this.setState({ ...this.state, [key]: e.target.value });

  submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/register", {
        ...this.state,
        avatarUrl: `https://ui-avatars.com/api/?name=${this.state.firstName}+${this.state.lastName}`,
        tenantId: "U023C6VN34L",
      });
      toast.success("Successfully registered. Please log in");
      this.props.history.push("/login");
    } catch (error) {
      this.setState({ ...this.state, errors: error.response.data.errors });
    }
  };
  render() {
    return (
      <div className="flex flex-col justify-center flex-grow w-full max-w-sm mx-auto ">
        <ApplicationErrors errors={this.state.errors} />
        <form onSubmit={this.submitForm}>
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              required
              type="text"
              value={this.state.firstName}
              onChange={(e) => this.changeForm(e, "firstName")}
              className="transition border border-gray-400 rounded focus:ring focus:ring-purple-500 focus:ring-opacity-70 focus:outline-none"
              id="firstName"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              required
              value={this.state.lastName}
              onChange={(e) => this.changeForm(e, "lastName")}
              className="transition border border-gray-400 rounded focus:ring focus:ring-purple-500 focus:ring-opacity-70 focus:outline-none"
              id="lastName"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              required
              value={this.state.email}
              onChange={(e) => this.changeForm(e, "email")}
              className="transition border border-gray-400 rounded focus:ring focus:ring-purple-500 focus:ring-opacity-70 focus:outline-none"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="text-sm text-gray-500">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              value={this.state.password}
              onChange={(e) => this.changeForm(e, "password")}
              className="transition border border-gray-400 rounded focus:ring focus:ring-purple-500 focus:ring-opacity-70 focus:outline-none"
              id="password"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              required
              type="password"
              value={this.state.passwordConfirm}
              onChange={(e) => this.changeForm(e, "passwordConfirm")}
              className="transition border border-gray-400 rounded focus:ring focus:ring-purple-500 focus:ring-opacity-70 focus:outline-none"
              id="confirmPassword"
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

export default Register;
