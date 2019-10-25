import React from "react";
import axios from "./axios";

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
            <div>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={e => {
                        this.fileSelected(e);
                    }}
                />
                <h1 onClick={() => this.uploadImg()}>uploader </h1>
            </div>
        );
    }
}
