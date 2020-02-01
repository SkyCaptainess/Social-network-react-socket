import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "../socket";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <h1>chatroom</h1>
            <div className="chat-container" ref={elemRef}>
                {!!chatMessages &&
                    chatMessages.length != 0 &&
                    chatMessages.map(chatMessage => (
                        <div key={chatMessage.msg_id}>
                            <div className="message">
                                <div className="message-author">
                                    <div className="message-pic">
                                        <img src={chatMessage.url} />
                                    </div>
                                    <div className="message-name">
                                        <h3 className="">
                                            {chatMessage.first}{" "}
                                            {chatMessage.last}
                                        </h3>
                                    </div>
                                </div>
                                <div className="message-txt">
                                    <p>{chatMessage.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="Add your chat message here."
                className="uk-textarea custom chat"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
