import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import BioEditor from "./bio-editor";

const profileInfo = {
    display: "grid"
};

const profilePic = {
    display: "inline"
};

const profileName = {
    display: "flex"
};

const bioEditor = {
    flexBasis: "100%"
};

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
                <div style={profileInfo}>
                    <div style={profilePic}>
                        <ProfilePic imgUrl={this.props.imgUrl} />
                    </div>

                    <div style={profileName}>
                        <h2>
                            Profile: {this.props.firstName}{" "}
                            {this.props.lastName}
                        </h2>
                    </div>

                    <br />
                    <div style={bioEditor}>
                        <BioEditor
                            bio={this.props.bio}
                            setBio={this.props.setBio}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
