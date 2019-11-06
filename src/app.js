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
    width: "100px",
    height: "100px",
    objectFit: "cover"
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
        console.log("App mounted!!");
        console.log("this.props: ", this.props);
        const { data } = await axios.get("/user");
        console.log("app data: ", data);
        this.setState(data);
    }

    toggleModal() {
        console.log("I'm a togglemodal");
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    methodInApp(freshUrl) {
        console.log("fresh url: ", freshUrl);
        console.log("I am a method running in APP");
        // console.log("muffin: ", muffin);
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
                            <img
                                style={smallLogo}
                                src="https://www.maketecheasier.com/assets/uploads/2019/02/news-google-chrome-incognito-featured-800x400.jpg"
                            />
                            <Link to={`/users/`} className="app-link">
                                new people
                            </Link>
                            <Link to={`/chat/`} className="app-link">
                                chat
                            </Link>
                            <Link to={`/friends/`} className="app-link">
                                friends
                            </Link>
                            <img
                                onClick={this.toggleModal}
                                style={smallLogo}
                                src={this.state.url}
                            />
                        </header>
                        <aside className="sidebar-left">Left Sidebar</aside>
                        <div id="content">
                            <div className="content-wrapper">
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

                        <aside className="sidebar-right">Right Sidebar</aside>
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
