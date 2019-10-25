import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import BioEditor from "./bio-editor";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("profile mounted!");
        console.log("this.props profile: ", this.props);
    }

    render() {
        return (
            <div>
                <h2>
                    Profile: {this.props.firstName} {this.props.lastName}
                </h2>
                <img src={this.props.imgUrl} />
                <ProfilePic imgUrl={this.props.imgUrl} />
                <BioEditor bio={this.props.bio} setBio={this.props.setBio} />
            </div>
        );
    }
}
