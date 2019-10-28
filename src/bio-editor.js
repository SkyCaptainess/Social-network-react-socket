import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioTxtAreaIsVisible: false
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
                this.setState({
                    bioTxtAreaIsVisible: !this.state.bioTxtAreaIsVisible
                });
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

    toggleBioInput() {
        console.log("I'm a togglebioinput");
        // if (this.uploaderIsVisible) {
        //     this.setState({uploaderIsVisible: false});
        // } else {
        //     this.setState({uploaderIsVisible: true});
        // }
        this.setState({ bioTxtAreaIsVisible: !this.state.bioTxtAreaIsVisible });
    }

    render() {
        return (
            <div>
                <h2>Bio Editor</h2>
                <h2>Bio: {this.props.bio}</h2>
                {this.state.bioTxtAreaIsVisible && (
                    <div className="bioTextArea">
                        <textarea
                            name="bio"
                            placeholder="enter bio here"
                            onChange={e => this.handleChange(e)}
                        ></textarea>
                        <button onClick={() => this.submit()}>SUBMIT</button>
                    </div>
                )}

                {!this.props.bio && (
                    <button id="addBio" onClick={() => this.toggleBioInput()}>
                        Add bio
                    </button>
                )}
                {this.props.bio && (
                    <button id="editBio" onClick={() => this.toggleBioInput()}>
                        Edit bio
                    </button>
                )}
            </div>
        );
    }
}
