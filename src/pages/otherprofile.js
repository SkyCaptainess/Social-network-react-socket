import React from "react";
import axios from "../axios";
import { ProfilePic } from "../elements/profile-pic";
import FriendshipButton from "../elements/friendship-button";
import Wall from "../elements/wall";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            scribbleIsVisible: false,
            refresh: false,
            friendship: false
        };
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get(
                "/api/user/" + this.props.match.params.id
            );
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
            this.props.history.push("/");
        }
    }

    toggleScribbleInput() {
        this.setState({ scribbleIsVisible: !this.state.scribbleIsVisible });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
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
                            </div>
                        </div>
                    </div>
                </div>
                <Wall wallId={this.props.match.params.id} />
            </div>
        );
    }
}
