import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img src="https://www.logolynx.com/images/logolynx/0a/0a6d1bda65baddebe16baeba09e18bcb.jpeg" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
