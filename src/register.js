import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
                <div className="welcome-link">
                    <Link to="/login" className="welcome-link">
                        {/*<Link to="/login" style={logLink}>*/}
                        log in.
                    </Link>
                </div>
                <div className="welcome-title">
                    <h2>Mutual Privacy Breach.</h2>
                </div>

                <div className="uk-card uk-card-default uk-card-body custom welcomeInput">
                    <input
                        name="first"
                        placeholder="first name"
                        className="uk-input custom"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        placeholder="last name"
                        className="uk-input custom"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="email"
                        placeholder="email"
                        className="uk-input custom"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        className="uk-input custom"
                        onChange={e => this.handleChange(e)}
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
