import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted!");
        console.log("this.props: ", this.props);
        // const { data } = await axios.post("/upload");
        // this.setState(data);
    }

    muffinMaker() {
        this.props.methodInApp("Lots of muffins");
    }

    fileSelected(sth) {
        console.log("file selected: ", sth);
    }

    render() {
        return (
            <div>
                // <input type="file"  id="file" className="inputfile" accept="image/*">
                <h1 onClick={() => this.fileSelected()}>uploader </h1>
                // <label for="file">choose a file</label>
            </div>
        );
    }
}
