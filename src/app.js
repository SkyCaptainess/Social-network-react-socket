import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Uploader from "./uploader";
import Profile from "./profile";
import axios from "./axios";
import { OtherProfile } from "./otherprofile";
import { FindPeople } from "./find-people";
import Friends from "./friends";
import { Link } from "react-router-dom";
import { Chat } from "./chat";

const appTitle = {
    display: "flex",
    justifyContent: "space-between"
};

const smallLogo = {
    width: "80px",
    height: "80px",
    margin: "10px",
    objectFit: "cover",
    backgroundColor: "transparent",
    opacity: "0.7"
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.methodInApp = this.methodInApp.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
    }

    toggleModal() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    methodInApp(freshUrl) {
        this.setState({ url: freshUrl });
    }

    setBio(newBio) {
        this.setState({ bio: newBio });
    }

    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <div>
                <BrowserRouter>
                    <div className="container">
                        <header style={appTitle}>
                            <Link to={`/`}>
                                <img style={smallLogo} src="/img/fission.png" />
                            </Link>
                            <Link to={`/users/`} className="app-link">
                                new people
                            </Link>
                            <Link to={`/chat/`} className="app-link">
                                chat
                            </Link>
                            <Link to={`/friends/`} className="app-link">
                                friends
                            </Link>
                            <div className="header-img">
                                <img
                                    onClick={this.toggleModal}
                                    style={smallLogo}
                                    src={this.state.url}
                                />
                            </div>
                        </header>

                        <div id="content">
                            <div>
                                <div className="profile">
                                    <Route
                                        exact
                                        path="/"
                                        render={props => (
                                            <Profile
                                                key={props.match.url}
                                                match={props.match}
                                                history={props.history}
                                                firstName={this.state.first}
                                                lastName={this.state.last}
                                                imgUrl={this.state.url}
                                                bio={this.state.bio}
                                                setBio={this.setBio}
                                                toggleModal={this.toggleModal}
                                                userId={this.state.id}
                                            />
                                        )}
                                    />
                                </div>

                                <Route
                                    exact
                                    path="/user/:id"
                                    component={OtherProfile}
                                />
                                <Route
                                    exact
                                    path="/users/"
                                    component={FindPeople}
                                />
                                <Route
                                    exact
                                    path="/friends/"
                                    component={Friends}
                                />
                                <Route exact path="/chat/" component={Chat} />
                            </div>
                        </div>

                        <footer>
                            <h2>"It's Con-Sensual!"</h2>
                        </footer>
                    </div>
                </BrowserRouter>

                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
