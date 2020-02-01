import { chatMessages, newMessage } from "./actions";
import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("lastTenMessages", msgs => {
            store.dispatch(chatMessages(msgs));
        });

        socket.on("chatMessage", msg => {
            store.dispatch(newMessage(msg));
        });
    }
};
