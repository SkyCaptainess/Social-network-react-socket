import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveWallMessages, getFriendship, addWallMessage } from "../actions";
import { ProfilePic } from "./profile-pic";
// import axios from "./axios";

export default function Wall({ wallId }) {
    const dispatch = useDispatch();
    const wallMessages = useSelector(state => state.wallMessages);
    const friendship = useSelector(state => state.friendship);
    const [scribbleInput, setScribbleInput] = useState();
    const [toggle, setToggle] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            setScribbleInput(false);
            setToggle(true);
            dispatch(receiveWallMessages(wallId));
            dispatch(getFriendship(wallId));
            setUser(true);
        })();
    }, [toggle]);

    if (!wallMessages) {
        return null;
    }

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("wall target value: ", e.target.value);
            dispatch(addWallMessage(wallId, e.target.value));
            setToggle(!toggle);
            e.target.value = "";
        }
    };

    return (
        <div>
            {user && (
                <div id="wall" className="friends">
                    <div className="wall-title">
                        <h1>Wall Messages</h1>
                    </div>
                    {friendship && (
                        <button
                            className="uk-button uk-button-default wall-button"
                            onClick={() => setScribbleInput(!scribbleInput)}
                        >
                            SCRIBBLE ON THE WALL
                        </button>
                    )}
                    {scribbleInput && (
                        <div className="uk-card-body custom wall-writing">
                            <div>
                                <textarea
                                    name="wallmsg"
                                    className="uk-textarea custom"
                                    placeholder="scribble here"
                                    onKeyDown={keyCheck}
                                ></textarea>
                            </div>
                        </div>
                    )}
                    <div className="wall-container">
                        {!!wallMessages &&
                            wallMessages.length != 0 &&
                            wallMessages.map(wallMessage => (
                                <div
                                    className="friend"
                                    key={wallMessage.wall_msg_id}
                                >
                                    <div className="message">
                                        <div className="message-author">
                                            <div className="message-pic">
                                                <ProfilePic
                                                    imgUrl={wallMessage.url}
                                                />
                                            </div>
                                            <div className="message-name">
                                                <h3 className="">
                                                    {wallMessage.first}{" "}
                                                    {wallMessage.last}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="message-txt">
                                            <p>{wallMessage.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {wallMessages.length == 0 && <p>NO WALLMESSAGES</p>}
                </div>
            )}
        </div>
    );
}
