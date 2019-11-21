import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveWallMessages, getFriendship, addWallMessage } from "./actions";
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
                    {friendship && (
                        <button
                            className="uk-button uk-button-default friendship-button"
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
                    {!!wallMessages &&
                        wallMessages.length != 0 &&
                        wallMessages.map(wallMessage => (
                            <div
                                className="friend"
                                key={wallMessage.wall_msg_id}
                            >
                                <div className="uk-card uk-card-body ">
                                    <div className="uk-child">
                                        <div>
                                            <div>
                                                <ProfilePic
                                                    imgUrl={wallMessage.url}
                                                />
                                            </div>
                                            <div className="">
                                                <h3 className="">
                                                    {wallMessage.first}{" "}
                                                    {wallMessage.last}
                                                </h3>
                                                <p className="uk-card-title">
                                                    {wallMessage.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {wallMessages.length == 0 && <p>NO WALLMESSAGES</p>}
                </div>
            )}
        </div>
    );
}
