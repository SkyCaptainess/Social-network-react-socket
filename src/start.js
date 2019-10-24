import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome";
import App from "./app";

//use the url to determine if the user is logged in
const userIsLoggedIn = location.pathname != "/welcome";

let elem;
if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
