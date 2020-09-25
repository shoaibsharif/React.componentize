import React from "react"

class InputVal extends React.Component {

    state = {
        email: "",
        password: ""
    }



    onChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState((prevState) => ({ ...prevState, [name]: value }))
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log("Make ajax call")
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label >Email address</label>
                    <input
                        onChange={this.onChange}
                        value={this.state.email}
                        name="email"
                        className="form-control" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input

                        onChange={this.onChange}
                        value={this.state.password}
                        name="password"

                        type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-check">
                    <input type="checkbox"

                        className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" >Check me out</label>
                </div>
                <button type="submit" onClick={this.onSubmit} className="btn btn-primary">Submit</button>
            </form>

        )
    }
}

export default InputVal