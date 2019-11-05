import axios from "./axios";
// import { socket } from "./socket";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        users: data
    };
}

export async function acceptFriendRequest(id) {
    await axios.post(`/accept-friend-request/${id}`);
    return {
        type: "ACCEPT",
        id: id
    };
}

export async function unfriend(id) {
    await axios.post(`/end-friendship/${id}`);
    return {
        type: "UNFRIEND",
        id: id
    };
}

export async function chatMessages(msgs) {
    return {
        type: "CHAT_MESSAGES",
        messages: msgs
    };
}
// export async function getLastTenChatMessages() {
//     socket.emit("getLastTenChatMessages").then(data => {
//         console.log("action last 10: ", data);
//     });
// }
