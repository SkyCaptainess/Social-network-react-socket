import React from "react";
import axios from "./axios";

const uploaderOverlay = {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0"
};

const uploaderBox = {
    border: "2px solid black",
    width: "400px",
    height: "200px",
    position: "fixed",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "center",
    // position: "fixed",
    // backgroundColor: "rgba(0, 0, 0, 0.7)",
    top: "300px",
    left: "50%",
    marginLeft: "-200px"
    // right: "0",
    // bottom: "0"
};

const uploaderH1 = {
    border: "2px solid green",
    textAlign: "center"
};

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("uploader mounted!");
        console.log("this.props: ", this.props);
    }

    muffinMaker() {
        this.props.methodInApp(this.state.url);
    }

    fileSelected({ target }) {
        this.setState({
            file: target.files[0]
        });
    }

    uploadImg() {
        console.log("this state file: ", this.state.file);
        var fd = new FormData();
        fd.append("image", this.state.file);
        axios.post("/upload", fd).then(({ data }) => {
            console.log("data[0].url ", data[0].url);
            this.props.methodInApp(data[0].url);
            // console.log("upload data is back: ", data);
        });
    }

    render() {
        return (
            <div style={uploaderOverlay}>
                <div style={uploaderBox}>
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={e => {
                            this.fileSelected(e);
                        }}
                    />
                    <h1 onClick={() => this.uploadImg()}>click to upload </h1>
                </div>
            </div>
        );
    }
}
