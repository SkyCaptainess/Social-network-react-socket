import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
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
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
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
                    <h1>Hello there.</h1>
                </div>

                <div className="login">
                    <div className="inputDiv">
                        <input
                            placeholder="email"
                            name="email"
                            onChange={e => this.handleChange(e)}
                        />
                        <input
                            placeholder="password"
                            name="password"
                            type="password"
                            onChange={e => this.handleChange(e)}
                        />
                        <button onClick={() => this.submit()}>submit</button>
                    </div>
                    {this.state.error && (
                        <div className="error title">
                            <h1>Oops! Something went wrong.</h1>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
