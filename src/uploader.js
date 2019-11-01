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
    top: "300px",
    left: "50%",
    marginLeft: "-200px"
};

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        var fd = new FormData();
        fd.append("image", this.state.file);
        axios.post("/upload", fd).then(({ data }) => {
            this.props.methodInApp(data[0].url);
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
