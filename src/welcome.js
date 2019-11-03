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
            <aside className="sidebar-left">Left Sidebar</aside>
            <div id="content">
                <img
                    style={entranceLogo}
                    src="https://www.maketecheasier.com/assets/uploads/2019/02/news-google-chrome-incognito-featured-800x400.jpg"
                />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
            <aside className="sidebar-right">Right Sidebar</aside>
            <footer>
                <h2>"It's Con-Sensual!"</h2>
            </footer>
        </div>
    );
}
