import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend
} from "./actions";
import { ProfilePic } from "./profile-pic";
import { Link } from "react-router-dom";

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
                            <div className="uk-card uk-card-body profile-card square-profile">
                                <div className="uk-child">
                                    <div>
                                        <div className="uk-card-media-top">
                                            <Link
                                                to={`/user/${friend.id}`}
                                                className="link-block"
                                            >
                                                <ProfilePic
                                                    imgUrl={friend.url}
                                                />
                                            </Link>
                                        </div>
                                        <div className="uk-card-body custom">
                                            <h3 className="uk-card-title">
                                                {friend.first} {friend.last}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={e =>
                                                dispatch(unfriend(friend.id))
                                            }
                                        >
                                            Unfriend
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                {friends.length == 0 && <p>NO FRIENDS</p>}
            </div>
            <div className="wannabes">
                <h1>WANNABES:</h1>
                {wannabes.length != 0 &&
                    wannabes.map(wannabe => (
                        <div className="friend" key={wannabe.id}>
                            <div className="uk-card uk-card-body profile-card square-profile">
                                <div className="uk-child">
                                    <div>
                                        <div className="uk-card-media-top">
                                            <Link
                                                to={`/user/${wannabe.id}`}
                                                className="link-block"
                                            >
                                                <ProfilePic
                                                    imgUrl={wannabe.url}
                                                />
                                            </Link>
                                        </div>
                                        <div className="uk-card-body custom">
                                            <h3 className="uk-card-title">
                                                {wannabe.first} {wannabe.last}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={e =>
                                                dispatch(
                                                    acceptFriendRequest(
                                                        wannabe.id
                                                    )
                                                )
                                            }
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                {wannabes.length == 0 && <p>NO WANNABES</p>}
            </div>
        </div>
    );
}
