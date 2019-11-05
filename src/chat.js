import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted: ");
        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("scroll height: ", elemRef.current.scrollHeight);
        console.log("client height: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight + elemRef.current.clientHeight;
    }, []);
    socket.emit("getLastTenChatMessages");
    console.log("Here are the last 10 chat msgs: ", chatMessages);
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("keycheck: ", e.target.value);
            console.log("keycode: ", e.key);
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div>
            <h1>chatroom</h1>
            <div className="chat-container" ref={elemRef}>
                {!!chatMessages &&
                    chatMessages.length != 0 &&
                    chatMessages.map(chatMessage => (
                        <p key={chatMessage.id}>{chatMessage.message}</p>
                    ))}
            </div>
            <textarea
                placeholder="Add your chat message here."
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
