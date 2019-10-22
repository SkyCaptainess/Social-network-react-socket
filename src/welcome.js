import React from "react";
import Register from "./register";

export default function Welcome() {
    return (
        <React.Fragment>
            Hello, World!
            <Register />
            {/*comments inside of JSX*/}
        </React.Fragment>
    );
}
