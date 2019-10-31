import React from "react";
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
                <div className="uk-card uk-card-body uk-card-default">
                    <div className="uk-child-width-1-2@m" uk-grid>
                        <div>
                            <div className="uk-card uk-card-default">
                                <div className="uk-card-media-top">
                                    <ProfilePic
                                        imgUrl={this.props.imgUrl}
                                        toggleModal={this.props.toggleModal}
                                    />
                                </div>
                                <div className="uk-card-body">
                                    <h3 className="uk-card-title">
                                        {this.props.firstName}{" "}
                                        {this.props.lastName}
                                    </h3>

                                    <BioEditor
                                        bio={this.props.bio}
                                        setBio={this.props.setBio}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={profilePic}></div>
                </div>
            </div>
        );
    }
}
