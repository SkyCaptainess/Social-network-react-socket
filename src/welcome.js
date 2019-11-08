import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";

const entranceLogo = {
    width: "400px",
    height: "400px",
    objectFit: "cover",
    margin: "0 auto"
};

export default function Welcome() {
    return (
        <div id="welcome" className="container">
            <header>
                <h1>VOYEUR VOYEUR</h1>
            </header>
            <div id="content">
                <img style={entranceLogo} src="/img/fission.png" />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
            <footer>
                <h2>"It's Con-Sensual!"</h2>
            </footer>
        </div>
    );
}
