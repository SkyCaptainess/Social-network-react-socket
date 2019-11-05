import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as io from "socket.io-client";
import { init } from "./socket";

const socket = io.connect();
socket.emit("iAmHere", {
    message: "hello"
});
socket.on("goodToSeeYou", data => {
    console.log(data.message);
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

import Welcome from "./welcome";
import App from "./app";

//use the url to determine if the user is logged in
const userIsLoggedIn = location.pathname != "/welcome";

let elem;
if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
