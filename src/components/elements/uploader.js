import React from "react";
import axios from "../axios";

const uploaderOverlay = {
    position: "fixed",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0"
};

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted!");
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
                <div className="uploader">
                    <h1>TO UPLOAD A PROFILE PICTURE, FIRST</h1>
                    <input
                        type="file"
                        id="file"
                        className="inputfile"
                        accept="image/*"
                        onChange={e => {
                            this.fileSelected(e);
                        }}
                    />
                    <label htmlFor="file" className="uk-button">
                        CHOOSE A FILE
                    </label>
                    <h1>THEN</h1>
                    <button
                        className="uk-button"
                        onClick={() => this.uploadImg()}
                    >
                        click to upload{" "}
                    </button>
                </div>
            </div>
        );
    }
}
