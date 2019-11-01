import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton(props) {
    console.log("button props: ", props.profileId);
    const [status, setStatus] = useState();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                `/get-initial-status/${props.profileId}`
            );
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
        })();
    }, []);

    const postRequest = async () => {
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
            <button
                className="uk-button uk-button-default friendship-button"
                onClick={postRequest}
            >
                {status}
            </button>
        </div>
    );
}
