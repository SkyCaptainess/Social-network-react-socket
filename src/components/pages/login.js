import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

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
                <div className="welcome-link">
                    <Link to="/" className="welcome-link">
                        need to register?
                    </Link>
                </div>
                <div className="welcome-title">
                    <h2>Well hello again.</h2>
                </div>

                <div className="uk-card uk-card-default uk-card-body custom welcomeInput">
                    <input
                        name="email"
                        placeholder="email"
                        className="uk-input custom"
                        onChange={e => this.handleChange(e)}
                        autoComplete="off"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        className="uk-input custom"
                        onChange={e => this.handleChange(e)}
                        autoComplete="off"
                    />
                    <button
                        className="uk-button uk-button-default"
                        onClick={() => this.submit()}
                    >
                        SUBMIT
                    </button>
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
