import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Uploader from "./uploader";
import Profile from "./profile";
import axios from "./axios";
import { OtherProfile } from "./otherprofile";
import { FindPeople } from "./find-people";
import Friends from "./friends";

const appDiv = {
    overflow: "auto"
};

const appTitle = {
    borderBottom: "2px solid black",
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
                    <div className="container" style={appDiv}>
                        <header style={appTitle}>
                            <img
                                style={smallLogo}
                                src="https://www.maketecheasier.com/assets/uploads/2019/02/news-google-chrome-incognito-featured-800x400.jpg"
                            />
                            <img
                                onClick={this.toggleModal}
                                style={smallLogo}
                                src={this.state.url}
                            />
                        </header>
                        <div className="content">
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
                            <Route exact path="/friends/" component={Friends} />
                        </div>
                    </div>
                </BrowserRouter>

                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
