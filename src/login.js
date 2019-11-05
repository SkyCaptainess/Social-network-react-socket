import React from "react";
import axios from "./axios";
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
                        registered?
                    </Link>
                </div>
                <div className="welcome-title">
                    <h2>Well hello there.</h2>
                </div>

                <div className="uk-card uk-card-default uk-card-body welcomeInput">
                    <input
                        name="email"
                        placeholder="email"
                        className="uk-input"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        className="uk-input"
                        onChange={e => this.handleChange(e)}
                    />
                    <button
                        className="uk-button uk-button-default"
                        onClick={() => this.submit()}
                    >
                        SUBMIT
                    </button>
                    <Link to="/" className="uk-button uk-button-default">
                        {/*<Link to="/login" style={logLink}>*/}
                        ...or click here to register
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
