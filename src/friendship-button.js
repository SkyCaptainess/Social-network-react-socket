import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton(props) {
    console.log("button props: ", props.profileId);
    const [status, setStatus] = useState();
    //
    // const [userInput, setUserInput] = useState();

    useEffect(() => {
        console.log("Control I'm here!");
        console.log("button use effect props: ", props);
        (async () => {
            console.log("async button id: ", props.profileId);
            const { data } = await axios.get(
                `/get-initial-status/${props.profileId}`
            );
            console.log("use effect data: ", data);
            if (data.relationship == "false") {
                setStatus("Make Friend Request");
            } else if (data.accepted == true) {
                setStatus("End Friendship");
            } else if (data.accepted == false) {
                if (data.sender_id == props.profileId) {
                    setStatus("Accept Friend Request");
                } else if (data.receiver_id == props.profileId) {
                    setStatus("Cancel Friend Request");
                }
            }
            // console.log("button data.relationship: ", data.relationship);
            // setResult("result with a string");
            // console.log("result: ", result);
        })();
        // let res = undefined;
    }, []);

    const postRequest = async () => {
        console.log("button status: ", status);
        if (status === "Make Friend Request") {
            const { data } = await axios.post(
                `/send-friend-request/${props.profileId}`
            );
            if (data) {
                setStatus("Cancel Friend Request");
            }
        } else if (status === "Accept Friend Request") {
            const { data } = await axios.post(
                `/accept-friend-request/${props.profileId}`
            );
            if (data) {
                setStatus("End Friendship");
            }
        } else if (status === "End Friendship") {
            const { data } = await axios.post(
                `/end-friendship/${props.profileId}`
            );
            if (data) {
                setStatus("Make Friend Request");
            }
        } else if (status === "Cancel Friend Request") {
            const { data } = await axios.post(
                `/end-friendship/${props.profileId}`
            );
            if (data) {
                setStatus("Make Friend Request");
            }
        }
    };

    return (
        <div>
            <button onClick={postRequest}>{status}</button>
        </div>
    );
}
