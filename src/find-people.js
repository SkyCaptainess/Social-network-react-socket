import React, { useState, useEffect } from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import { Link } from "react-router-dom";

const findPeopleDiv = {
    overflow: "auto"
};

export function FindPeople() {
    const [users, setUsers] = useState([]);

    const [userInput, setUserInput] = useState();

    useEffect(() => {
        let ignore = false;
        //if ignore is false that means axios response is good and I want to use it
        // console.log("useEffect is running!");
        if (!userInput) {
            (async () => {
                console.log("userInput: ", userInput);
                const { data } = await axios.get("/api/users/new");
                console.log("find people data: ", data);
                setUsers(data);
                console.log("new people data: ", users);
            })();
        } else {
            (async () => {
                console.log("userInput: ", userInput);
                const { data } = await axios.get(`/api/users/${userInput}`);
                console.log("2nd find people data: ", data);
                if (!ignore) {
                    setUsers(data);
                    console.log("set users data: ", users);
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
        <div>
            <div style={findPeopleDiv}>
                <h2>Find People</h2>
                <h3>Checkout who just joined</h3>
                <ul className="unordered-list">
                    {users.map(user => (
                        <li className="list-element" key={user.first}>
                            <div className="uk-card uk-card-body profile-card square-profile">
                                <div className="uk-child">
                                    <div>
                                        <div className="uk-card-media-top">
                                            <Link
                                                to={`/user/${user.id}`}
                                                className="link-block"
                                            >
                                                <ProfilePic imgUrl={user.url} />
                                            </Link>
                                        </div>
                                        <div className="uk-card-body custom">
                                            <h3 className="uk-card-title">
                                                {user.first} {user.last}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
