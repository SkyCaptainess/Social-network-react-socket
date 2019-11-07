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
export async function newMessage(msg) {
    return {
        type: "NEW_MESSAGE",
        message: msg
    };
}
// export async function getLastTenChatMessages() {
//     socket.emit("getLastTenChatMessages").then(data => {
//         console.log("action last 10: ", data);
//     });
// }

export async function receiveWallMessages(id) {
    const { data } = await axios.get(`/wall-messages/${id}`);
    return {
        type: "RECEIVE_WALL_MESSAGES",
        messages: data
    };
}
