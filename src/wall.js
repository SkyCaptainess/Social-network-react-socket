import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveWallMessages } from "./actions";
import { ProfilePic } from "./profile-pic";
import { Link } from "react-router-dom";

export default function Wall({ wallId }) {
    console.log("wall_id: ", wallId);
    const dispatch = useDispatch();
    const wallMessages = useSelector(state => state.wallMessages);

    useEffect(() => {
        console.log("Wall sanity check");
        dispatch(receiveWallMessages(wallId));
        console.log("wallmessages: ", wallMessages);
    }, []);

    if (!wallMessages) {
        return null;
    }

    return (
        <div id="friends_wannabes">
            <div className="friends">
                <h1>MESSAGES:</h1>
                {!!wallMessages &&
                    wallMessages.length != 0 &&
                    wallMessages.map(wallMessage => (
                        <div className="friend" key={wallMessage.wall_msg_id}>
                            <div className="uk-card uk-card-body profile-card square-profile">
                                <div className="uk-child">
                                    <div>
                                        <div className="uk-card-media-top">
                                            <ProfilePic
                                                imgUrl={wallMessage.url}
                                            />
                                        </div>
                                        <div className="uk-card-body custom">
                                            <h3 className="uk-card-title">
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
        </div>
    );
}
