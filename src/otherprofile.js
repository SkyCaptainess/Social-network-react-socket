import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import FriendshipButton from "./friendship-button";

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
    }

    render() {
        return (
            <div className="profile">
                <div className="uk-card uk-card-body profile-card">
                    <div className="uk-child">
                        <div>
                            <div className="uk-card-media-top">
                                <ProfilePic imgUrl={this.state.imgUrl} />
                            </div>
                            <div className="card-content">
                                <div className="uk-card-body custom">
                                    <h3 className="uk-card-title">
                                        {this.state.firstName}{" "}
                                        {this.state.lastName}
                                    </h3>
                                    <p>{this.state.bio}</p>
                                    <FriendshipButton
                                        profileId={this.props.match.params.id}
                                    />
                                </div>
                                <div className="uk-card-body custom wall-writing">
                                    <h4>scribble on the wall.</h4>
                                    <FriendshipButton
                                        profileId={this.props.match.params.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
