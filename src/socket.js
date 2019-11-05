import { chatMessages, chatMessage } from "./actions";
import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", msg => {
            console.log("this is from the server: ", msg);
            // store.dispatch(chatMessages(msg));
        });
        socket.on("lastTenMessages", msgs => {
            console.log("lastTenMessages: ", msgs);
            store.dispatch(chatMessages(msgs));
        });

        // socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};
