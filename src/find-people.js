import React, { useState, useEffect } from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import { Link } from "react-router-dom";

const findPeopleDiv = {
    width: "100vw",
    overflow: "auto",
    textAlign: "center",
    display: "grid",
    alignItems: "space-between",
    // justifyContent: "space-between",
    left: "20vw"
};

export function FindPeople() {
    const [users, setUsers] = useState([]);

    const [userInput, setUserInput] = useState();

    useEffect(() => {
        let ignore = false;
        if (!userInput) {
            (async () => {
                const { data } = await axios.get("/api/users/new");
                setUsers(data);
            })();
        } else {
            (async () => {
                const { data } = await axios.get(`/api/users/${userInput}`);
                if (!ignore) {
                    setUsers(data);
                } else {
                    console.log("ignored!");
                }
            })();
        }

        return () => {
            ignore = true;
            console.log("cleaning up!", userInput);
        };
    }, [userInput]);

    return (
        <div className="find-people-main">
            <div style={findPeopleDiv}>
                <h2>Find People</h2>
                <h3>Checkout who just joined</h3>
                <ul className="unordered-list">
                    {users.map(user => (
                        <li className="list-element" key={user.first}>
                            <Link
                                to={`/user/${user.id}`}
                                className="link-block"
                            >
                                <div
                                    id="find-card"
                                    className="uk-card uk-card-body profile-card square-profile"
                                >
                                    <div className="uk-child">
                                        <div>
                                            <div className="uk-card-media-top">
                                                <ProfilePic imgUrl={user.url} />
                                            </div>
                                            <div className="uk-card-body custom">
                                                <h3 className="uk-card-title">
                                                    {user.first} {user.last}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <h2>Looking for someone?</h2>
            <input
                className="uk-input"
                name="user-input"
                type="text"
                onChange={e => setUserInput(e.target.value)}
            />
        </div>
    );
}
