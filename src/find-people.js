import React, { useState, useEffect } from "react";
import axios from "./axios";

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
                <ul>
                    {users.map(user => (
                        <li key={user.first}>
                            <h1>
                                {user.first} {user.last}
                            </h1>
                            <img src={user.url} />
                        </li>
                    ))}
                </ul>
            </div>

            <h2>Looking for someone?</h2>
            <input
                name="user-input"
                type="text"
                onChange={e => setUserInput(e.target.value)}
            />
        </div>
    );
}
