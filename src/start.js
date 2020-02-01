import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./components/reducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as io from "socket.io-client";
import { init } from "./components/socket";

const socket = io.connect();
socket.emit("iAmHere", {
    message: "hello"
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

import Welcome from "./components/welcome";
import App from "./components/app";

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
