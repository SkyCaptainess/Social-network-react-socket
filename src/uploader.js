import React from "react";
import axios from "./axios";

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
                <div className="uk-card uk-card-default uploader">
                    <div className="uk-form-file custom">
                        <button
                            className="uk-button"
                            onClick={() => this.uploadImg()}
                        >
                            click to upload{" "}
                        </button>
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            onChange={e => {
                                this.fileSelected(e);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
