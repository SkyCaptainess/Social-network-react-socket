import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

const logLink = {
    display: "grid",
    alignItems: "center",
    textAlign: "center",
    margin: "0 auto",
    marginBottom: "5px",
    border: "2px outset black",
    width: "200px",
    height: "27px",
    backgroundColor: "#1b2e2c",
    fontFamily: "Times New Roman",
    fontSize: "14px",
    color: "#fff9ff",
    textDecoration: "none"
};

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("data is back: ", data);
                if (data.success) {
                    console.log("data success: ", data.success);
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("error: ", err);
                this.setState({
                    error: true
                });
            });
    }

    render() {
        return (
            <div>
                <div className="title">
                    <h1>Welcome.</h1>
                </div>

                <div className="inputDiv">
                    <input
                        name="first"
                        placeholder="first name"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        placeholder="last name"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="email"
                        placeholder="email"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={e => this.handleChange(e)}
                    />
                    <button onClick={() => this.submit()}>SUBMIT</button>
                    <Link to="/login" style={logLink}>
                        ...or click here to log in
                    </Link>
                </div>
                {this.state.error && (
                    <div className="error title">
                        <h1>Oops! Something went wrong.</h1>
                    </div>
                )}
            </div>
        );
    }
}
