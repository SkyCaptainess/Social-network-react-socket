import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonEnterBioIsVisible: false
        };
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("bioeditor mounted!");
        console.log("this.props bioeditor: ", this.props);
    }

    handleChange({ target }) {
        // this[target.name] = target.value;
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        axios
            .post("/editBio", {
                bio: this.state.bio
            })
            .then(({ data }) => {
                console.log("data is back: ", data);
                this.props.setBio(data);
                if (data.success) {
                    console.log("data success: ", data.success);
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
                <h2>Bio Editor</h2>
                <h2>Bio: {this.props.bio}</h2>
                <textarea
                    name="bio"
                    placeholder="enter bio here"
                    onChange={e => this.handleChange(e)}
                ></textarea>
                <button onClick={() => this.submit()}>SUBMIT</button>
                {!this.props.bio && <h1>NO BIO</h1>}
                {this.props.bio && <h1>EDIT BIO</h1>}
            </div>
        );
    }
}
