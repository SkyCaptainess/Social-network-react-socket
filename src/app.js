import React from "react";

import Uploader from "./uploader";
import Profile from "./profile";
import axios from "./axios";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        // this.state = {
        //     first: "Pete",
        //     last: "Anderson",
        //     url: "",
        //     uploaderIsVisible: false
        // };
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
        // axios.get('/user').then(
        //     ({data}) => {
        //         this.setState(data)
        //     }
        // )
        // axios
        //     .get("/user")
        //     .then(({ data }) => {
        //         console.log("data is back: ", data);
        //         if (data) {
        //             console.log("data app: ", data);
        //             this.setState({
        //                 first: data.first,
        //                 last: data.last,
        //                 img: data.
        //             });
        //         } else {
        //             this.setState({
        //                 error: true
        //             });
        //         }
        //     })
        //     .catch(err => {
        //         console.log("error: ", err);
        //         this.setState({
        //             error: true
        //         });
        //     });
        //this is where we awant to make an axios const
        // a Get req to a route called user
        //when we get a res we want to put the info into state
    }

    toggleModal() {
        console.log("I'm a togglemodal");
        // if (this.uploaderIsVisible) {
        //     this.setState({uploaderIsVisible: false});
        // } else {
        //     this.setState({uploaderIsVisible: true});
        // }
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

    // setBio(sth) {
    //     console.log(sth);
    // }

    render() {
        return (
            <div>
                <h1 onClick={this.toggleModal}>Hello from App!</h1>;
                <Profile
                    firstName={this.state.first}
                    lastName={this.state.last}
                    imgUrl={this.state.url}
                    bio={this.state.bio}
                    setBio={this.setBio}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
// in render use div or react.fragment to wrap the content
