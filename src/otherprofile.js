import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import FriendshipButton from "./friendship-button";
import Wall from "./wall";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            scribbleIsVisible: false,
            refresh: false
        };
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

    toggleScribbleInput() {
        console.log("I'm a togglebioinput");
        this.setState({ scribbleIsVisible: !this.state.scribbleIsVisible });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        axios
            .post(`/addWallMessage/${this.props.match.params.id}`, {
                wallmsg: this.state.wallmsg
            })
            .then(({ data }) => {
                // this.props.setBio(data);
                this.setState({
                    scribbleIsVisible: !this.state.scribbleIsVisible
                });
                this.setState({
                    refresh: !this.state.refresh
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
                                    {this.state.scribbleIsVisible && (
                                        <div>
                                            <textarea
                                                name="wallmsg"
                                                className="uk-textarea custom"
                                                placeholder="scribble here"
                                                onChange={e =>
                                                    this.handleChange(e)
                                                }
                                            ></textarea>
                                            <button
                                                className="uk-button uk-button-default bio-button"
                                                onClick={() => this.submit()}
                                            >
                                                SUBMIT
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        onClick={() =>
                                            this.toggleScribbleInput()
                                        }
                                    >
                                        DO IT NOW
                                    </button>
                                </div>
                                {}
                                <Wall
                                    wallId={this.props.match.params.id}
                                    refresh={this.state.refresh}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
