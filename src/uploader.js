import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("uploader mounted!");
        console.log("this.props: ", this.props);
    }

    muffinMaker() {
        this.props.methodInApp("Lots of muffins");
    }

    fileSelected(sth) {
        console.log("file selected: ", sth);
    }

    uploadImg() {
        console.log("this state file: ", this.state.file);
        var fd = new FormData();
        fd.append("image", this.state.file);
        axios.post("/upload", fd).then(({ data }) => {
            console.log("upload data is back: ", data);
        });
    }

    render() {
        return (
            <div>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={e =>
                        this.setState({
                            file: e.target.files[0]
                        })
                    }
                />
                <h1 onClick={() => this.uploadImg()}>uploader </h1>
            </div>
        );
    }
}
