import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import FriendshipButton from "./friendship-button";

const profileInfo = {
    display: "grid"
};

const profilePic = {
    display: "inline"
};

const profileName = {
    display: "grid"
};

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        console.log("othrprofile mounted");
        console.log("this.props.match.params.id", this.props.match.params.id);
        try {
            const { data } = await axios.get(
                "/api/user/" + this.props.match.params.id
            );
            console.log("otherprofile data: ", data);
            this.setState({
                imgUrl: data.rows.url,
                firstName: data.rows.first,
                lastName: data.rows.last,
                bio: data.rows.bio,
                id: data.cookieId
            });
        } catch (err) {
            console.log("error in OtherProfile: ", err);
            this.props.history.push("/");
        }
        const { data } = await axios.get(
            "/api/user/" + this.props.match.params.id
        );

        if (!data || this.props.match.params.id == this.state.id) {
            // imagine i'm logged in as user 6
            this.props.history.push("/");
        }

        //make an axios req to server asking for info about this.props.match.params.id
        // if there's no user with that id, redirect back to /
        // if the user is trying to visit their own page redirect them back to /
    }

    render() {
        return (
            <div>
                <h1>OTHER PROFILE</h1>
                <div style={profileInfo}>
                    <div style={profilePic}>
                        <ProfilePic imgUrl={this.state.imgUrl} />
                    </div>

                    <div style={profileName}>
                        <h2>
                            Profile: {this.state.firstName}{" "}
                            {this.state.lastName}
                        </h2>
                        <br />
                        <div>
                            <h2>Bio: {this.state.bio}</h2>
                        </div>
                        <FriendshipButton
                            profileId={this.props.match.params.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
