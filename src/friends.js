import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend
} from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        state => state.users && state.users.filter(user => user.accepted)
    );
    const wannabes = useSelector(
        state => state.users && state.users.filter(user => !user.accepted)
    );
    console.log("friends.js friends: ", friends);
    console.log("friends.js wannabes: ", wannabes);

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <div id="friends_wannabes">
            <div className="friends">
                <h1>FRIENDS:</h1>
                {friends.length != 0 &&
                    friends.map(friend => (
                        <div className="friend" key={friend.id}>
                            <img src={friend.url} />
                            <button
                                onClick={e => dispatch(unfriend(friend.id))}
                            >
                                Unfriend
                            </button>
                        </div>
                    ))}
                {friends.length == 0 && <p>NO FRIENDS</p>}
            </div>
            <div className="wannabes">
                <h1>WANNABES:</h1>
                {wannabes.length != 0 &&
                    wannabes.map(wannabe => (
                        <div className="wannabe" key={wannabe.id}>
                            <img src={wannabe.url} />
                            <button
                                onClick={e =>
                                    dispatch(acceptFriendRequest(wannabe.id))
                                }
                            >
                                Accept
                            </button>
                        </div>
                    ))}
                {wannabes.length == 0 && <p>NO WANNABES</p>}
            </div>
        </div>
    );
}
