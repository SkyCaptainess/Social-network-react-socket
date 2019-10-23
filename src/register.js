import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange({ target }) {
        // this[target.name] = target.value;
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
                    setTimeout(function() {
                        location.replace("/");
                    }, 5000);
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
                {this.state.error && <div className="error">Oops!</div>}
                <div className="welcome">
                    <div className="inputDiv">
                        <input
                            name="first"
                            placeholder="first"
                            onChange={e => this.handleChange(e)}
                        />
                        <input
                            name="last"
                            placeholder="last"
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
                        <button onClick={() => this.submit()}>submit</button>
                        <Link to="/login">Click here to Log in!</Link>
                    </div>
                </div>
            </div>
        );
    }
}
