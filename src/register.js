import React from "react";
import axios from "axios";

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
        console.log("is it possible to log anything here?");
        // if (this.state.email.indexOf("@") == -1) {
        //     this.setState({
        //         error: true
        //     });
        // }
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
                    setTimeout(function() {
                        console.log("data success: ", data.success);
                        location.replace("/");
                    }, 5000);
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    render() {
        return (
            <div>
                {this.state.error && <div className="error">Oops!</div>}
                <input name="first" onChange={e => this.handleChange(e)} />
                <input name="last" onChange={e => this.handleChange(e)} />
                <input name="email" onChange={e => this.handleChange(e)} />
                <input name="password" onChange={e => this.handleChange(e)} />
                <button onClick={() => this.submit()}>submit</button>
            </div>
        );
    }
}
